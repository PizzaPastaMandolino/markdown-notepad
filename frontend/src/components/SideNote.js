import { useState, useEffect } from "react";
import axios from "axios";
import { BsPlusCircleFill, BsFillTrashFill } from "react-icons/bs";

const SideNote = () => {
  //state per le note
  const [note, setNote] = useState([]);

  //funzione che con GET prende tutte le note dal DB le inserisce dentro lo state per poi visualizzarle con l'HTML
  //la funzione viene eseguita con un useEffect cosi da farla avviare ogni volta che la pagina carica o il DB cambia
  const fetchAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3030/note");
      setNote(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //funzione per aggiungere una nota al DB con una richiesta post al DB
  const addNota = async () => {
    try {
      //cio che viene aggiungo nel DB
      const newNota = {
        titolo_note: "Titolo Nota",
        note_testo: "",
        ultimaModifica: new Date(Date.now()).toLocaleDateString("it-IT", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      await axios.post("http://localhost:3030/note", newNota);
      fetchAllNotes();
    } catch (error) {
      console.log(error);
    }
  };

  //funzione per rimuovere una nota dal DB e quindi dalla sidebar delle note
  const removeNota = async (id_note) => {
    try {
      console.log(id_note);
      await axios.delete("http://localhost:3030/note/delete", {
        data: { id_note: id_note },
      });
      fetchAllNotes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllNotes();
    console.log("run");
  }, []);

  return (
    <div className="side-note">
      <div className="side-note-title">
        <h1>Note</h1>
        <BsPlusCircleFill className="plus" onClick={() => addNota()} />
      </div>
      <div className="note">
        {note.map((nota) => (
          <div className="nota" key={nota.id_note}>
            <h2>{nota.titolo_note}</h2>
            <p>{nota.note_testo && nota.note_testo.substr(0, 40) + "..."}</p>
            <p>{nota.ultimaModifica}</p>
            <BsFillTrashFill
              className="trash"
              onClick={() => removeNota(nota.id_note)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNote;

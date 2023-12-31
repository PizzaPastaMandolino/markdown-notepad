import { useEffect } from "react";
import axios from "axios";
import { BsPlusCircleFill, BsFillTrashFill } from "react-icons/bs";
import ReactMarkdown from "react-markdown";

const SideNote = ({ setState, state, note, setNote }) => {
  const fetchAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3030/note");
      setNote(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNota = async () => {
    try {
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
      console.log("fetching all notes addNota");
    } catch (error) {
      console.log(error);
    }
  };
  const removeNota = async (id_note) => {
    try {
      await axios.delete("http://localhost:3030/note/delete", {
        data: { id_note: id_note },
      });
      fetchAllNotes();
      console.log("fetching all notes removeNota");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveNota = (id_note) => {
    const userConfirm = window.confirm(
      "Sei sicuro di voler elimare questa nota?"
    );
    if (userConfirm) {
      removeNota(id_note);
      state.isSelected = false;
    }
  };

  useEffect(() => {
    fetchAllNotes();
    console.log("fetching all notes from useEffect");
  });

  return (
    <div className={`side-note ${state.isSelected ? "selected" : ""}`}>
      <div className="side-note-title">
        <h1>Note</h1>
        <BsPlusCircleFill className="plus" onClick={() => addNota()} />
      </div>
      <div className="note">
        {note.map((nota) => (
          <div
            className="nota"
            key={nota.id_note}
            onClick={() => {
              const newState = {
                text: nota.note_testo,
                title: nota.titolo_note,
                id: nota.id_note,
                isSelected: true,
              };
              setState({ ...state, ...newState });
            }}
          >
            <h2>{nota.titolo_note}</h2>
            <p>
              <ReactMarkdown>
                {nota.note_testo && nota.note_testo.substr(0, 40) + "..."}
              </ReactMarkdown>
            </p>
            <p>{nota.ultimaModifica}</p>
            <button
              className="trash"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveNota(nota.id_note);
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                handleRemoveNota(nota.id_note);
              }}
            >
              <BsFillTrashFill />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNote;

import SideNote from "../components/SideNote";
import Main from "../components/Main";
import { useState } from "react";

const initialState = {
  text: "",
  title: "",
  id: "",
  isSelected: false,
};

const Note = () => {
  const [state, setState] = useState(initialState);
  const [note, setNote] = useState([]);

  return (
    <div className="NoteMain">
      <SideNote
        setState={setState}
        state={state}
        note={note}
        setNote={setNote}
      />
      <Main state={state} note={note} setNote={setNote} />
    </div>
  );
};

export default Note;

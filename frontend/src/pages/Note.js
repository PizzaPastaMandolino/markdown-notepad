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
  return (
    <div className="NoteMain">
      <SideNote setState={setState} state={state} />
      <Main state={state} />
    </div>
  );
};

export default Note;

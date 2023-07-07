import SideNote from "../components/SideNote";
import Main from "../components/Main";
import { useState } from "react";

const Note = () => {
  const [text, setText] = useState();
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div className="NoteMain">
      <SideNote setText={setText} setIsSelected={setIsSelected}/>
      <Main text={text} isSelected={isSelected} />
    </div>
  );
};

export default Note;

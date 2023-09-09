import MDEditor, { commands } from "@uiw/react-md-editor";
import { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useMediaQuery } from "@uidotdev/usehooks";
import axios from "axios";

const Main = ({ state }) => {
  const [value, setValue] = useState(state.text);
  const [title, setTitle] = useState(state.title);

  useEffect(() => {
    setValue(state.text);
    setTitle(state.title);
  }, [state.text, state.title]);

  const updateNote = async () => {
    try {
      const updateNota = {
        titolo_nota: document.querySelector(".title-content").value,
        note_testo: value,
        ultimaModifica: new Date(Date.now()).toLocaleDateString("it-IT", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        id_note: state.id,
      };
      await axios.post("http://localhost:3030/note/update", updateNota);
    } catch (error) {
      console.log(error);
    }
  };

  const returnBack = () => {
    state.isSelected = false;
  };

  const mediaQuery = useMediaQuery("(max-width : 768px)");
  const help = {
    name: "help",
    keyCommand: "help",
    buttonProps: { "aria-label": "Insert help" },
    icon: (
      <svg viewBox="0 0 16 16" width="12px" height="12px">
        <path
          d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm.9 13H7v-1.8h1.9V13Zm-.1-3.6v.5H7.1v-.6c.2-2.1 2-1.9 1.9-3.2.1-.7-.3-1.1-1-1.1-.8 0-1.2.7-1.2 1.6H5c0-1.7 1.2-3 2.9-3 2.3 0 3 1.4 3 2.3.1 2.3-1.9 2-2.1 3.5Z"
          fill="currentColor"
        />
      </svg>
    ),
    execute: (state, api) => {
      window.open("https://www.markdownguide.org/basic-syntax/", "_blank");
    },
  };

  return (
    <div
      className="container"
      style={{ display: state.isSelected ? "block" : "none" }}
    >
      <>
        <div className="title">
          <input
            type="text"
            className="title-content"
            maxLength={120}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div data-color-mode="light">
          <MDEditor
            value={value}
            onChange={setValue}
            commands={[...commands.getCommands(), help]}
            height={568}
            maxHeight={568}
          />
        </div>
        <FaSave className="save" onClick={() => updateNote()} />
        {mediaQuery ? (
          <IoIosArrowBack className="back" onClick={() => returnBack()} />
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default Main;

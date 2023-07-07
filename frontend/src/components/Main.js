import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const Main = ({text, isSelected}) => {
    console.log(text);
    const [value, setValue] = useState(text);
    return (
        <div className="container">
            {isSelected ? (
                <div data-color-mode="light">
                    <MDEditor
                        value={value}
                        onChange={setValue}
                    />
                </div>
            ) : (<div className="selectNote">Seleziona una nota</div>)}

        </div>
    );
};

export default Main;

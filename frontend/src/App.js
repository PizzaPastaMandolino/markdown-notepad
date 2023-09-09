import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Note from "./pages/Note";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Note />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Note from './pages/Note';
import Login from './pages/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Note />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert= (message, type) =>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1800);
  }
  return (
    <>
    <NoteState>

    <HashRouter>
    <Navbar/>
    <Alert alert= {alert}></Alert>
    <div className="container">
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
      </Routes>
    </div>
    </HashRouter>

    </NoteState>
    </>
  );
}

export default App;

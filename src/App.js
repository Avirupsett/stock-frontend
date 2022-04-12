import './App.css';
import Datatable from './Components/Datatable';
import Datatable2 from './Components/Datatable2';
import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
     <Navbar />
     <Routes>
        <Route path="/" element={<Datatable/>} />
        <Route path="/details" element={<Datatable2/>} />
      </Routes>
    </>
    
  );
}

export default App;

import "./App.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx'
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home/>}></Route>
          <Route path="/chat" element={<Chat/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

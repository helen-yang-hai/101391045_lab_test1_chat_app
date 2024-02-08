//import './App.css';
import Signup from './components/signup'
import Login from './components/login'
import Chat from './components/chat'
import JoinGroupChat from './components/joinGroupChat'
import { BrowserRouter, Routes, Route, } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <h2>Online Chat App</h2>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/chat/:room" element={<JoinGroupChat/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

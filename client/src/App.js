import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ListNgos from "./Pages/Ngo/ListNgos";
import RegisterNgo from "./Pages/Ngo/RegisterNgo";
import Navbar from "./Components/Navbar";
import Ngodetails from "./Pages/Ngo/SingleNgo/Ngodetails";
import SignInUp from "./Pages/SingnInUp/SignInUp";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Profile from "./Pages/Profile/Profile";
import Chat from "./Pages/Chat/Chat";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ngos" element={<ListNgos />} />
          <Route path="/registerngo" element={<RegisterNgo />} />
          <Route path="/ngo/:id" element={<Ngodetails />} />
          <Route path="/auth" element={<SignInUp />} />
          <Route path="/phil/signup" element={<SignUp />} />
          <Route path="/phil/signin" element={<SignIn />} />
          <Route path="/ngo/signin" element={<SignIn />} />
          <Route path="/edit/:id" element={<Profile />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

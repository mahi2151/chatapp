import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import {useAuthStore} from "./store/useAuthStore";

function App() {

  const { authUser,  login, isLoggedIn } = useAuthStore();

  console.log("authUser:", authUser);
  console.log("isLoggedIn:", isLoggedIn);
  return (
    <div className="min-h-screen  bg-black relative flex items-center justify-center p-4 overflow-hidden">
      <button onClick={login} className="a-10">login</button>
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

    </Routes>
    </div>
  )
}

export default App;


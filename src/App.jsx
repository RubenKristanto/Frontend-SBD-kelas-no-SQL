import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import HomePage from "./components/pages/HomePage";
import LibraryPage from "./components/pages/LibraryPage";
import StorePage from "./components/pages/StorePage";
import ProfilePage from "./components/pages/ProfilePage";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* redirect ke login */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/library" element={<LibraryPage />} />

        <Route path="/store" element={<StorePage />} />

        <Route path="/home" element={<HomePage/>}/>

        <Route path="/profile" element={<ProfilePage />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App;
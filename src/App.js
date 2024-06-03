import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Setting from "./pages/settings/Setting";
import Write from "./pages/Write/Write";
import Home from "./pages/home/home";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import { Context } from "./context/Context";
import Pagenotfound from "./pages/Notfound/Pagenotfound.js";
import Footer from "./components/footer/Footer";
import About from "./pages/About/About";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Contact from "./pages/ContactUs/Contactus";
import SearchOutput from "./components/search/SearchOutput";
import SinglePost from "./components/singlePost/SinglePost.js";
import Register from "./pages/login/Register.js";

function App() {
  const { user } = useContext(Context);
  const isUserAdmin = user && user.role === 1;

  const ProtectedRoute = ({ element: Element, ...rest }) => {
    return (
      <React.Fragment>
        {isUserAdmin ? <Element {...rest} /> : <Navigate to="/" replace />}
      </React.Fragment>
    );
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/Contact-Us" element={<Contact />} />
          <Route path="/search" element={<SearchOutput />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/write" element={<ProtectedRoute element={Write} />} />
          <Route path="/settings" element={user ? <Setting /> : <Register />} />
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route path="/not-found" element={<Pagenotfound />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

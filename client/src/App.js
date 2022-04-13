import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import ThankYouPage from "./pages/thank-you";
import CryptoListPage from "./pages/crypto-list";
import CryptoProfilePage from "./pages/crypto-profile";
import "./App.css";

const App = () => 
  <Router>
  <div>
    <Routes>
      <Route exact path="/landing-page" element={<LandingPage/>} />
      <Route exact path="/thank-you" element={<ThankYouPage/>} />
      <Route exact path="/crypto-list" element={<CryptoListPage/>} />
      <Route path="/" element={<Navigate replace to="/crypto-list" />} />
      {/* <Route path="/profile" element={<CryptoProfilePage/>} /> */}
      <Route path="/profile/:id" element={<CryptoProfilePage />} />
      <Route element={<LandingPage/>} />
    </Routes>
  </div>
  </Router>;

export default App;

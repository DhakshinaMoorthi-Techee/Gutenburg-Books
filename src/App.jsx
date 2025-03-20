import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from "./components/Home";
import "./App.css";
import BooksComponent from "./components/Books";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/books/:category" element={<BooksComponent />} />
      </Routes>
    </Router>
  );
}

export default App;

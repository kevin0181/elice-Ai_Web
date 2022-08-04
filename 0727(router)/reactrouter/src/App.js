import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Homepage from "./Homepage";
import Contact from "./Contact";
import About from "./About";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/page/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

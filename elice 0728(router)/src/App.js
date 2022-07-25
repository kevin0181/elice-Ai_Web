import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import AboutPage from "./AboutPage";
import Header from "./Header";
import Page from "./Page";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/page/:id" element={<Page />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

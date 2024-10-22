import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Accueil from "./pages/Accueil";
import Footer from "./components/Footer";
import AddArticle from "./components/AddArticle";

function  App() {
      return (
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/AddArticle" element={<AddArticle />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      );
}

export default App;

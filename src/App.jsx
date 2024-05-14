import { Route, Routes } from "react-router-dom";
import "./App.css";
import NewsLetter from "./Componenets/NewsLetter";
import PDFPage from "./Componenets/PDFPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NewsLetter />} />
        <Route path="/pdf/:month" element={<PDFPage />} />
      </Routes>
    </>
  );
}

export default App;

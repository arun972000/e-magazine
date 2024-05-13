// import YearSelectorComponent from "./Tabs"
import "./NewsLetter.css";


import LetterCard from "./LetterCard.jsx";


// import MyNavbar from "../Header/Navbar.jsx";
// import Footer from "../Footer/Footer.jsx";

const NewsLetter = () => {



  return (
    <>
      <div className="main-content__position">
        <div className="container">
          {/* <YearSelectorComponent /> */}
          <div className="row justify-content-center"><LetterCard /></div>
        </div>
      </div>

    </>
  );
};

export default NewsLetter;

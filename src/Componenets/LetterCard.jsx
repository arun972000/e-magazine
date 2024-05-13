/* eslint-disable react/prop-types */

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LetterCard.css";
import may from "/src/assets/mayv2.jpg"


const LetterCard = () => {

  return (
    <>
    
    <div className="col-lg-3 d-flex 
                        align-items-center 
                        justify-content-center mt-3">
      <Card
        className="custom-card border-0 shadow p-3 mb-5 bg-white rounded"
        style={{ width: "18rem", border: "1px solid #dee2e6" }}
      >
        <Link to={`/pdf/april`}>
          <div className="letterCard_container">
          <Card.Img
            className="LetterCard__image"
            variant="top"
            src={may}
          />
          </div>

          <Card.Body>
            <Card.Title className="LetterCard__title">April Edition</Card.Title>
          </Card.Body>
        </Link>
      </Card>
    </div>
    <div className="col-lg-3 mt-3 d-flex 
                        align-items-center 
                        justify-content-center">
    <Card
      className="custom-card border-0 shadow p-3 mb-5 bg-white rounded"
      style={{ width: "18rem", border: "1px solid #dee2e6" }}
    >
      <Link to={`/pdf/may`}>
        <div className="letterCard_container">
        <Card.Img
          className="LetterCard__image"
          variant="top"
          src={may}
        />
        </div>

        <Card.Body>
          <Card.Title className="LetterCard__title">May Edition</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  </div>
  </>
  );
};

export default LetterCard;

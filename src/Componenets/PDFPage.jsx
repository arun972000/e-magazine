/* eslint-disable react/display-name */
import PDFFinal from "./NewsletterV2/Pdfcontent";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import ParticlesBg from "./Particles";

const PDFPage = () => {
  return (
    <>
      <ParticlesBg />
      <div className="container-fluid">
        <PDFFinal />
      </div>
    </>
  );
};

export default PDFPage;

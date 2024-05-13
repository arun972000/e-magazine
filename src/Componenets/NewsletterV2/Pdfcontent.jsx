/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoVolumeHighSharp, IoVolumeMuteSharp } from "react-icons/io5";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page as ReactPdfPage } from "react-pdf";
import "./demo.css";
import { forwardRef, useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowRight, FaFilePdf } from "react-icons/fa";
import pageFlipSound from "/src/assets/turnpage-99756.mp3";
import april from "/src/assets/Race E-Magazine April'24.pdf"
import may from "/src/assets/May.pdf"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Page = forwardRef(({ pageNumber }, ref) => {
  return (
    <div ref={ref}>
      <ReactPdfPage pageNumber={pageNumber} width={400} />
    </div>
  );
});

function Test() {
  const book = useRef();
  const { month } = useParams();

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const width = 400;
  const height = 600;
  // eslint-disable-next-line no-unused-vars
  const [pdfloading, setPdfloading] = useState(true);
  const [volume, setVolume] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const enterFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  

  const handleLoadSuccess = (pdfObject) => {
    const totalPages = pdfObject.numPages;
    setTotalPage(totalPages);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
  };

  const onFlip = useCallback(() => {
    if (!volume) {
      const audio = new Audio(pageFlipSound);
      audio.play();
    } else {
      const audio = new Audio(pageFlipSound);
      audio.pause();
    }
  }, [volume]);

  const toggleFullscreen = () => {
    if (!isFullScreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const pagesMap = new Array(totalPage).fill(0);


  return (
    <>
      <Document
        file={month=="april" ? april : may}
        style={{ width, height }}
        onLoadSuccess={handleLoadSuccess}
        onRender={() => {
          setPdfloading(false);
        }}
      >
        <HTMLFlipBook
          width={width}
          height={height}
          ref={book}
          showCover={true}
          onFlip={onFlip}
          flippingTime={500}
        >
          {pagesMap.map((item, i) => (
            <Page key={i} pageNumber={i + 1} scale={2.0}></Page>
          ))}
        </HTMLFlipBook>
      </Document>

      <div className="row mt-3 justify-content-center ">
        <div
          className="d-flex justify-content-center pt-2"
          style={{ zIndex: 99999, backgroundColor: "white" }}
        >
          <GrFormPrevious
            onClick={() => {
              book.current.pageFlip().flipPrev();

              if (currentPage !== 1) {
                setCurrentPage((pre) => pre - 1);
              }
            }}
            style={{ cursor: currentPage < 2 ? "not-allowed" : "pointer" }}
            className="mx-2"
            size={25}
          />
          {book.current && (
            <p style={{ backgroundColor: "black", padding: 2, color: "white" }}>
              <b>{totalPage}</b>
            </p>
          )}
          {isFullScreen ? (
            <MdFullscreenExit
              onClick={toggleFullscreen}
              style={{ cursor: "pointer" }}
              className="mx-2"
              size={25}
            />
          ) : (
            <MdFullscreen
              onClick={toggleFullscreen}
              style={{ cursor: "pointer" }}
              className="mx-2"
              size={25}
            />
          )}
          <a
            href={month=="april" ? april : may}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
            className="mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFilePdf size={25} />
          </a>

          <div>
            <input
              type="number"
              min="0"
              value={pageNumber}
              onChange={(e) => setPageNumber(parseInt(e.target.value))}
              style={{ width: "50px" }}
            />

            <button
              className="btn btn-dark p-0 px-1 m-0 mb-1"
              style={{ borderRadius: 0 }}
              onClick={() => {
                const pageNumberInt = parseInt(pageNumber);
                if (pageNumberInt > totalPage) {
                  console.log(totalPage);
                  book.current.pageFlip().flip(totalPage - 1);
                } else {
                  book.current.pageFlip().flip(pageNumberInt - 1);
                }
              }}
            >
              <FaArrowRight />
            </button>
            {volume ? (
              <IoVolumeMuteSharp
                onClick={() => {
                  setVolume(false);
                }}
                style={{ cursor: "pointer" }}
                className="mx-3"
                size={25}
              />
            ) : (
              <IoVolumeHighSharp
                onClick={() => {
                  setVolume(true);
                }}
                style={{ cursor: "pointer" }}
                className="mx-3"
                size={25}
              />
            )}
            <GrFormNext
              onClick={() => {
                book.current.pageFlip().flipNext("top");
                if (currentPage !== totalPage / 2) {
                  setCurrentPage((pre) => pre + 1);
                }
              }}
              style={{
                cursor:
                  currentPage == totalPage / 2 ? "not-allowed" : "pointer",
              }}
              className="mx-2"
              size={25}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const PDFFinal = () => {
  return (
    <>
      <Test />
    </>
  );
};

export default PDFFinal;

import { SetStateAction, useState } from 'react';

import Modal from 'new-components/modal';
import { Document, Page, pdfjs } from 'react-pdf';

import Button from 'new-components/button';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  openPolicyPdfView: any;
  setOpenViewPdfPolicy: any;
  pdf: any;
}

const PdfViewModal = ({ openPolicyPdfView, setOpenViewPdfPolicy, pdf }: Props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: any) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return (
    <>
      <Modal
        open={openPolicyPdfView}
        text="Done"
        iconEnd={undefined}
        title={'Policy View'}
        handleClose={() => setOpenViewPdfPolicy(false)}
      >
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          {/* <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
            Previous
          </button>
          <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
            Next
          </button> */}
          <div style={{ display: 'flex', width: '30%', justifyContent: 'space-around' }}>
            {pageNumber >= 1 && <Button handleClick={previousPage} text="Previous" />}
            {pageNumber <= numPages && <Button handleClick={nextPage} text="Next" />}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PdfViewModal;

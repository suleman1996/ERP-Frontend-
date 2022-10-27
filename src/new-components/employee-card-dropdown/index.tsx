import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom';
import Modal from 'new-components/modal';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import arrow from 'new-assets/arrow-left.svg';
import style from './employee-dropdown.module.scss';
import EmployeeService from 'services/employee-service';
import Button from 'new-components/button';
import { samplePdf2 } from 'new-pages/policy/pdfSample';
import { useSelector } from 'react-redux';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
  setOpenModalProfile?: Dispatch<SetStateAction<boolean>>;
  handleClick?: () => any;
  id?: string;
}

const EmployeeDropdown = ({ setOpenModal, setOpenModalProfile, id, handleClick }: Props) => {
  const navigate = useNavigate();
  const authToken = useSelector((state) => state?.app?.token);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdf, setPdf] = useState<any>();
  const [open, setOpen] = useState(false);
  const [openCvModal, setOpenCvModal] = useState(false);

  const profile = [
    {
      text: 'Profile View ',
      click: async () => {
        setOpen(true);
      },
    },
    {
      text: 'CV View',
      click: () => {
        setOpenCvModal(true);
      },
    },
    { text: 'More Details', icon: arrow, click: () => navigate(`/employee/${id}`) },
  ];

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

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
    <div>
      <div className={style.mainDiv} onClick={() => handleClick && handleClick()}>
        {profile.map((ele, index) => (
          <div className={style.innerDiv} key={index} onClick={ele.click}>
            <p>{ele.text}</p>
            {ele.icon && <img src={ele.icon} alt="" />}
          </div>
        ))}
      </div>

      <Modal
        open={open}
        text="Close"
        iconEnd={undefined}
        title={'Profile View'}
        handleClose={() => setOpen(false)}
        handleClick={() => setOpen(false)}
      >
        <Document
          loading={'Loading please wait ...'}
          file={{
            url: `http://localhost:8080/api/employees/profile-view/${id}`,
            httpHeaders: {
              authorization: authToken,
            },
          }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          <div style={{ display: 'flex', width: '30%', justifyContent: 'space-around' }}>
            {pageNumber >= 1 && <Button handleClick={previousPage} text="Previous" />}
            {pageNumber <= numPages && <Button handleClick={nextPage} text="Next" />}
          </div>
        </div>
      </Modal>
      {/* )} */}

      <Modal
        open={openCvModal}
        text="Close"
        iconEnd={undefined}
        title={'CV View'}
        handleClose={() => setOpenCvModal(false)}
        handleClick={() => setOpenCvModal(false)}
      >
        <Document
          file={{
            url: `${
              process.env.REACT_APP_API_IS_DEV === 'true'
                ? process.env.REACT_APP_API_BASE_URL_DEV
                : process.env.REACT_APP_API_BASE_URL_PRODUCTION
            }/api/employees/cv-view/${id}`,
            httpHeaders: {
              authorization: authToken,
            },
          }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
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
    </div>
  );
};

export default EmployeeDropdown;

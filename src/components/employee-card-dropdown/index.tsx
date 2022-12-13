/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useNavigate } from 'react-router-dom'
import Modal from 'components/modal'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import arrow from 'assets/arrow-left.svg'
import style from './employee-dropdown.module.scss'
import Button from 'components/button'
import { useSelector } from 'react-redux'
import EmployeeService from 'services/employee-service'
import { Deletepopup } from 'stories/delete-modal/delete-modal.stories'
import { createNotification } from 'common/create-notification'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
interface Props {
  setOpenModal?: Dispatch<SetStateAction<boolean>>
  setOpenModalProfile?: Dispatch<SetStateAction<boolean>>
  handleClick?: () => any
  getEmployeesData?: any
  id?: string
}
const EmployeeDropdown = ({ id, handleClick, getEmployeesData }: Props) => {
  const navigate = useNavigate()
  const authToken = useSelector((state) => state?.app?.token)
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [open, setOpen] = useState(false)
  const [openCvModal, setOpenCvModal] = useState(false)
  const [openDelModal, setOpenDelModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await EmployeeService.deleteEmployee(id)
      setIsLoading(false)
      setOpenDelModal(false)
      getEmployeesData()
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  const profile = [
    {
      text: 'Profile View ',
      click: async () => {
        setOpen(true)
      },
    },
    {
      text: 'CV View',
      click: () => {
        setOpenCvModal(true)
      },
    },

    {
      text: 'More Details',
      icon: arrow,
      click: () => navigate(`/employee/${id}`),
    },
    {
      text: 'Delete',
      click: async () => {
        setOpenDelModal(true)
      },
    },
  ]
  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages)
  }
  const changePage = (offset: any) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }
  const previousPage = () => {
    changePage(-1)
  }
  const nextPage = () => {
    changePage(1)
  }
  return (
    <div>
      <div
        className={style.mainDiv}
        onClick={() => handleClick && handleClick()}
      >
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
            url: `${
              process.env.REACT_APP_API_IS_DEV === 'true'
                ? process.env.REACT_APP_API_BASE_URL_DEV
                : process.env.REACT_APP_API_BASE_URL_PRODUCTION
            }employees/profile-view/${id}`,
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
          <div
            style={{
              display: 'flex',
              width: '30%',
              justifyContent: 'space-around',
            }}
          >
            {pageNumber >= 1 && (
              <Button handleClick={previousPage} text="Previous" />
            )}
            {pageNumber <= numPages && (
              <Button handleClick={nextPage} text="Next" />
            )}
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
            }employees/cv-view/${id}`,
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
          <div
            style={{
              display: 'flex',
              width: '30%',
              justifyContent: 'space-around',
            }}
          >
            {pageNumber >= 1 && (
              <Button handleClick={previousPage} text="Previous" />
            )}
            {pageNumber <= numPages && (
              <Button handleClick={nextPage} text="Next" />
            )}
          </div>
        </div>
      </Modal>
      <Deletepopup
        heading="Are you sure you want to delete this employee?"
        handleDelete={() => handleDelete()}
        setOpen={setOpenDelModal}
        open={openDelModal}
        isLoading={isLoading}
      />
    </div>
  )
}
export default EmployeeDropdown

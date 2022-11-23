import Modal from 'components/modal'
import { pdfjs } from 'react-pdf'

import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface Props {
  openPolicyPdfView: any
  setOpenViewPdfPolicy: any
  pdf?: any
}

const PdfViewModal = ({ openPolicyPdfView, setOpenViewPdfPolicy }: Props) => {
  return (
    <>
      <Modal
        open={openPolicyPdfView}
        text="Done"
        iconEnd={undefined}
        title={'Profile View'}
        handleClose={() => setOpenViewPdfPolicy(false)}
      >
        {/* <Document file={samplePdf2} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document> */}
        <a
          target={'_blank'}
          rel="noreferrer"
          href="https://erp-bucket-sprintx.s3.amazonaws.com/Leave%20Policy-SPX1-v1"
        >
          <p>hello</p>
        </a>
        {/* <div>
          <p>
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>

          <div style={{ display: 'flex', width: '30%', justifyContent: 'space-around' }}>
            {pageNumber >= 1 && <Button handleClick={previousPage} text="Previous" />}
            {pageNumber <= numPages && <Button handleClick={nextPage} text="Next" />}
          </div>
        </div> */}
      </Modal>
    </>
  )
}

export default PdfViewModal

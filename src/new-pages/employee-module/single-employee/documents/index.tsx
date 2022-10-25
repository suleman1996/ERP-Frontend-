import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardContainer from 'new-components/card-container';
import Table from 'new-components/table';

import { rows, columns } from './helper';
import EmployeeService from 'services/employee-service';

import style from './document.module.scss';
import editIcon from 'new-assets/table-edit.svg';
import deleteIcon from 'new-assets/table-delete.svg';
import viewIcon from 'new-assets/viewIcon.svg';
import downloadIcon from 'new-assets/download.svg';
import pdf from 'assets/employee-page/print.svg';
import { selectFilter } from 'new-components/table-filter/mockData';

interface Props {
  setOpen: () => void;
  setDocId: () => void;
  setDocument: () => void;
  document: any;
  getAllDocuments: () => void;
}

const Documents = ({ setOpen, setDocId, setDocument, document, getAllDocuments }: any) => {
  useEffect(() => {
    getAllDocuments();
  }, []);

  const [file, setFile] = useState();

  console.log('document', document);

  return (
    <>
      <CardContainer className={style.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p className={style.p}>All Documents</p>
          <span>Total {document.length} Documents</span>
        </div>
        <Table
          rows={document?.map((e: any) => ({
            ...e,
            fileType: e?.fileType ? (e?.fileType.includes('image') ? e?.fileType : 'pdf') : '---',
            documentActions: (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  onClick={() => {
                    setOpen(true);
                    setDocId(e._id);
                  }}
                  style={{ marginRight: '10px' }}
                >
                  <img src={editIcon} width={30} />
                </div>
                <div
                  onClick={async () => {
                    const res = await EmployeeService.deleteDocument(e._id);
                    if (res.status === 200) {
                      getAllDocuments();
                    }
                  }}
                  style={{ marginRight: '10px' }}
                >
                  <img src={deleteIcon} width={30} />
                </div>
                <div
                  onClick={() => {
                    viewURI(e.file, e.name);
                  }}
                  style={{ marginRight: '10px' }}
                >
                  <img src={pdf} width={25} />
                </div>
                <div
                  // onClick={() => {
                  //   // downloadUR(e.file, e.name);
                  //   setFile(e.file);
                  //   // document.getElementById('download').click();
                  //   downloadURL(e.file, e.name);
                  // }}
                  style={{ marginRight: '10px' }}
                >
                  <a
                    href={e.file}
                    download
                    id="download"
                    // hidden
                  >
                    <img src={downloadIcon} width={25} />
                  </a>
                </div>
              </div>
            ),
          }))}
          columns={columns}
          minWidth="750px"
          handleEdit={(e) => {
            setOpen(true);
            setDocId(e);
          }}
          handleDelete={async (e: any) => {
            const res = await EmployeeService.deleteDocument(e);
            if (res.status === 200) {
              getAllDocuments();
            }
          }}
        />
      </CardContainer>

      <a
        href={file ? file : 'https://docs.google.com/uc?id=0B0jH18Lft7ypSmRjdWg1c082Y2M'}
        download
        id="download"
        hidden
      ></a>
    </>
  );
};

export default Documents;

function viewURI(uri: string, name: string) {
  const link = document.createElement('a');
  link.download = name;
  link.setAttribute('download', name);
  link.href = uri;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadURL(uri: string, name: string) {
  // const fileURL = window.URL.createObjectURL(new Blob([uri]));
  const fileURL = window.URL.createObjectURL(new Blob([uri]));

  const fileLink = document.createElement('a');
  fileLink.href = fileURL;
  fileLink.setAttribute('download', `${name}`);
  fileLink.setAttribute('target', '_blank');
  document.body.appendChild(fileLink);
  fileLink.click();
  fileLink.remove();
}

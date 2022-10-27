import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import fileDownload from 'js-file-download';
import { useParams } from 'react-router-dom';
import CardContainer from 'new-components/card-container';
import Table from 'new-components/table';

import { rows, columns } from './helper';
import EmployeeService from 'services/employee-service';

import style from './document.module.scss';
import editIcon from 'new-assets/table-edit.svg';
import view from 'new-assets/viewIconnew.svg';
import deleteIcon from 'new-assets/table-delete.svg';
import downloadIcon from 'new-assets/downlaod.svg';
import pdf from 'assets/employee-page/print.svg';
import axios from 'axios';

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
                  <img src={view} width={25} />
                </div>
                <div
                  onClick={() => {
                    console.log('e', e);

                    downloadURL(e.file, e.name, e.fileType);
                  }}
                  style={{ marginRight: '10px' }}
                >
                  {/* <a
                    href={e.file}
                    download
                    target={'_blank'}
                    // hidden
                  > */}
                  <img src={downloadIcon} width={25} />
                  {/* </a> */}
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

function downloadURL(uri: any, name: string, type: string) {
  console.log('type', type.split('/'));

  axios({
    url: uri,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);
    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute(
      'download',
      `${name}.${type.includes('image') ? type.split('/')[1] : type.toLowerCase()}`,
    ); //or any other extension
    document.body.appendChild(link);
    link.click();

    // document.body.removeChild(link);
    // URL.revokeObjectURL(href);
  });
}

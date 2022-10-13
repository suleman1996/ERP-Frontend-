import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardContainer from 'new-components/card-container';
import Table from 'new-components/table';

import { rows, columns } from './helper';
import EmployeeService from 'services/employee-service';

import style from './document.module.scss';
import editIcon from 'new-assets/table-edit.svg';
import deleteIcon from 'new-assets/table-delete.svg';
import pdf from 'assets/employee-page/print.svg';

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
        <p className={style.p}>All Documents</p>
        <Table
          rows={document?.map((e: any) => ({
            ...e,
            documentActions: (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  onClick={() => {
                    setOpen(true);
                    setDocId(e._id);
                  }}
                  style={{ marginRight: '10px' }}
                >
                  <img src={editIcon} />
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
                  <img src={deleteIcon} />
                </div>
                <div
                  onClick={() => {
                    downloadURI(e.file, e.name);
                  }}
                  style={{ marginRight: '10px' }}
                >
                  <img src={pdf} width={40} />
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

function downloadURI(uri: string, name: string) {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

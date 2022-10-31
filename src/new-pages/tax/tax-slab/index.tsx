/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import AddTaxSlab from './add-tax';
import DeletePopup from 'components/delete-modal';
import { useAppSelector } from 'store/hooks';
import NewTable from 'components/table/new-table';
import { columns, taxRow } from './tax-helper';
import TaxService from 'services/tax-service';
import style from '../tax.module.scss';

import editIcon from 'new-assets/table-edit.svg';
import view from 'new-assets/viewIconnew.svg';
import deleteIcon from 'new-assets/table-delete.svg';
import Table from 'new-components/table';

const TaxSlab = ({ setIsLoading, open, setOpen }: any) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taxSlabsData, setTaxSlabsData] = useState<any[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [singleId, setSingleId] = useState('');
  const [columnArr, setColumnArr] = useState<any>([]);

  const { currentUser } = useAppSelector((state) => state.app);

  const getTaxSlabsData = async () => {
    setIsLoading(true);
    const res = await TaxService.getAllTaxSlabsData();
    // if (res.status === 200) {
    //   const temp: any[] = [];
    //   res.data.tax.forEach((x: any, index: number) => {
    //     x.id = x._id;
    //     x._id = index + 1;
    //     temp.push(x);
    //   });
    //   setTaxSlabsData(temp);
    // }
    setIsLoading(false);
  };

  const deleteTaxSlab = async () => {
    setDeleteLoading(true);
    const res = await TaxService.deleteTaxSlab(singleId);
    if (res.status === 200) {
      getTaxSlabsData();
      setDeleteLoading(false);
      setDeleteModalOpen(false);
    }
  };

  // useEffect(() => {
  //   if (currentUser?.role && currentUser?.role === 'Employee') {
  //     const tempArr = [...columns];
  //     tempArr.splice(tempArr.length - 1);
  //     setColumnArr([...tempArr]);
  //   }
  // }, [currentUser?.role]);

  useEffect(() => {
    getTaxSlabsData();
  }, []);

  return (
    <>
      <div style={{ padding: '0 10px' }}>
        <Table
          columns={columnArr?.length ? columnArr : columns}
          rows={
            taxRow &&
            taxRow.map((item): any => {
              return {
                ...item,
                taxActions: (
                  <div style={{ display: 'flex' }}>
                    <div style={{ marginRight: '10px' }}>
                      <img src={editIcon} width={30} />
                    </div>
                    <div style={{ marginRight: '10px' }}>
                      <img src={deleteIcon} width={30} />
                    </div>
                    <div style={{ marginRight: '10px' }}>
                      <img src={view} width={25} />
                    </div>
                  </div>
                ),
              };
            })
          }
          handleDelete={(id: string) => setSingleId(id)}
          minWidth="1280px"
          tableHeight={style.taxSlabTableHeight}
          handleEdit={(id: string) => {
            setOpen(true);
            setSingleId(id);
          }}
          handleModalOpen={() => setDeleteModalOpen(true)}
        />
      </div>

      {open && (
        <AddTaxSlab
          open={open}
          setOpen={setOpen}
          getTaxSlabsData={getTaxSlabsData}
          updateId={singleId}
        />
      )}
      {deleteModalOpen && (
        <DeletePopup
          handleDelete={deleteTaxSlab}
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          btnLoader={deleteLoading}
        />
      )}
    </>
  );
};

export default TaxSlab;

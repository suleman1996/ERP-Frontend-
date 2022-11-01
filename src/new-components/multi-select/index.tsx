import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

// import { Multiselect } from 'multiselect-react-dropdown';
import { MultiSelect } from 'react-multi-select-component';

import './styles.css';

export default function MultiPicker({
  label,
  star,
  errorMessage,
  options,
  selectedValues,
  handleSelect,
  handleRemove,
  name,
  control,
  groupBy,
  customValidation,
  handleChange,
}: any) {
  return (
    <div>
      {label && (
        <label
          style={{
            color: errorMessage ? '#ff5050' : '#2d2d32',
          }}
        >
          {label}
          <b style={{ color: 'red' }}>{star}</b>
        </label>
      )}
      <div style={{ marginTop: 'calc(5px + (12 - 5) * (100vw - 280px) / (2560 - 280))' }}>
        <Controller
          name={name}
          control={control}
          render={({ onChange, value }) => {
            return (
              <MultiSelect
                options={options}
                value={selectedValues}
                onChange={handleChange}
                labelledBy="Select"
                className="wrapper"
              />
              // <Multiselect
              //   options={options}
              //   selectedValues={value}
              //   onSelect={handleSelect}
              //   onRemove={handleRemove}
              //   displayValue="id"
              //   groupBy={groupBy}
              //   showCheckbox={true}
              //   className="wrapper"
              // />
            );
          }}
        />
        {(errorMessage || customValidation) && <span>{errorMessage || customValidation}</span>}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import './styles.css';
import { Controller } from 'react-hook-form';

export default function App({
  label,
  star,
  errorMessage,
  options,
  selectedValues,
  handleSelect,
  handleRemove,
  name,
  control,
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
              <Multiselect
                options={options}
                selectedValues={value}
                onSelect={onChange}
                onRemove={handleRemove}
                displayValue="id"
                groupBy="name"
                showCheckbox={true}
                className="wrapper"
              />
            );
          }}
        />
      </div>
    </div>
  );
}

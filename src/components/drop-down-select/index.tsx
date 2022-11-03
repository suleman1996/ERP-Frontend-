import React from 'react';
import Select from 'components/select';

export const DropDownSelect = () => {
  return (
    <div>
      <Select
        label="Roaster"
        name={'roaster'}
        // errorMessage={errors?.roaster?.message}
        // register={register}
      >
        <option value="">Select</option>
        <>
          {roster &&
            roster.map((ele: any) => (
              <option key={ele.value} value={ele.value}>
                {ele.description}
              </option>
            ))}
        </>
      </Select>
    </div>
  );
};

export const roster = [
  {
    value: 'Fixed',
    description: 'Fixed',
  },
  {
    value: 'Variable',
    description: 'Variable',
  },
];

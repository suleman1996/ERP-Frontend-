export const SelectionStyle = {
  control: (styles: any, state: any) => ({
    ...styles,
    backgroundColor: 'bg-dark-gray',
    borderRadius: 5,
    boxShadow: 'none',
    border: '1px solid transparent',
    minHeight: 'calc(30px + 25 * (100vw - 280px) / 2280) !important',
    padding: '0 2px',

    '&:hover': {
      outline: state.isFocused ? 0 : 0,
    },
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? 'black'
        : isSelected
        ? '#57B894'
        : isFocused
        ? 'white'
        : null,
      color: isDisabled ? '#ccc' : isSelected ? 'white' : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    }
  },
  placeholder: (styles: any) => ({
    ...styles,
    fontSize: 'calc(9px + (13 - 9) * (100vw - 280px) / (2560 - 280))',
    color: '#CACACA',
  }),

  valueContainer: (provided) => ({
    ...provided,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flexWrap: 'wrap',
  }),
  input: (provided) => ({
    ...provided,
    minWidth: '20%',
  }),
}

export const SelectionStyle = {
  control: (styles: any, state: any) => ({
    ...styles,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    boxShadow: 'none',
    border: 'transparent !important',
    fontSize: 'calc(12px + (18 - 12) * (100vw - 280px) / (2560 - 280))',
    minHeight:
      'calc(30px + (55 - 30) * (100vw - 280px) / (2560 - 280)) !important',
    paddingLeft:
      'calc(2px + (7 - 2) * (100vw - 280px) / (2560 - 280)) !important',
    paddingRight:
      'calc(2px + (7 - 2) * (100vw - 280px) / (2560 - 280)) !important',
    borderColor: 'none !important',
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
        : 'white',
      color: isDisabled ? '#ccc' : isSelected ? 'red  !important' : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
      '&:active': {
        backgroundColor: 'white',
      },
    }
  },
  placeholder: (styles: any) => ({
    ...styles,
    fontSize: 'calc(12px + (18 - 12) * (100vw - 280px) / (2560 - 280))',
    color: '#cacaca',
    fontWeight: '500 !important',
    textTransform: 'capitalize',
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

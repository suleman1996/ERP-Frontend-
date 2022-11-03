export const SelectionStyle = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: 'bg-dark-gray',
    borderRadius: 5,
    boxShadow: 'none',
    border: '1px solid #E2E2EA',
    fontSize: '12px',
    fontFamily: 'SF-regular',
    height: 'calc(30px + 25 * (100vw - 280px) / 2280) !important',
    minHeight: 'calc(30px + 25 * (100vw - 280px) / 2280) !important',
    padding: '2px',
  }),
  option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? 'black' : isSelected ? '#57B894' : isFocused ? 'white' : null,
      color: isDisabled ? '#ccc' : isSelected ? 'white' : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  placeholder: (styles: any) => ({
    ...styles,
    fontSize: '13px',
    color: '#CACACA',
  }),
};

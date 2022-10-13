export const SelectionStyle = {
  control: (styles: any) => ({
    ...styles,
    backgroundColor: 'bg-dark-gray',
    borderRadius: 5,
    boxShadow: 'none',
    border: '1px solid grey',
    fontSize: '12px',
    fontFamily: 'SF-regular',
    height: 45,
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
    fontSize: 19,
    fontFamily: 'SF-regular',
    color: '#fffff',
  }),
};

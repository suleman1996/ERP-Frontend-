export const SelectionStyle = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'bg-dark-gray',
    borderRadius: 5,
    boxShadow: 'none',
    border: '1px solid grey',
    fontSize: '12px',
    fontFamily: 'SF-regular',
    height: 45,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? 'black' : isSelected ? '#57B894' : isFocused ? 'white' : null,
      color: isDisabled ? '#ccc' : isSelected ? 'white' : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  placeholder: (styles) => ({
    ...styles,
    fontSize: 19,
    fontFamily: 'SF-regular',
    color: '#fffff',
  }),
};

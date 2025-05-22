import React from 'react';
import Select from 'react-select';

const CustomOption = ({ innerProps, label }) => (
  <div {...innerProps}>
    {label} <span className="welcome">Login</span>
  </div>
);

const options = [
  { value: 'weekly', label: 'Week' },
  { value: 'fortnightly', label: 'Fortnight' },
  { value: 'monthly', label: 'Month' },
];

const MyCustomDropdown = () => {
  return (
    <Select
      options={options}
      components={{ Option: CustomOption }}
      // You can customize styles and appearance using the styles prop
      styles={{
        control: (provided) => ({
          ...provided,
          backgroundColor: 'lightgray',
        }),
        option: (provided) => ({
          ...provided,
          borderBottom: '1px solid gray',
          backgroundColor: 'white',
          color: 'black',
        }),
      }}
    />
  );
};

export default MyCustomDropdown;

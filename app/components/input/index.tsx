import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const {
    type,
    placeholder,
    value,
    onChange,
    className = "",
    required = false
  } = props;

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-primary-50 ${className}`}
      required={required}
    />
  );
};

export default InputField;
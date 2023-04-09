import React, { useState, ChangeEvent } from 'react';

interface TextInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  return (
    <input type="text" value={value} onChange={onChange} />
  );
}

const ParentComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h1>Text Input Example</h1>
      <TextInput value={inputValue} onChange={handleInputChange} />
      <p>Current value: {inputValue}</p>
    </div>
  );
}

export default ParentComponent;
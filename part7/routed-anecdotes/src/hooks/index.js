import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  // Reset
  const onSubmit = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    onSubmit,
  };
};

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
};

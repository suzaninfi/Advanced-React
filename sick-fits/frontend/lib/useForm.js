// own custom hook to tuck away the complexity of dealing with
// a state with multiple fields
import { useState } from 'react';

export const useForm = (initial = {}) => {
  // create a state object
  const [inputs, setInputs] = useState(initial);

  const handleChange = (event) => {
    let { value, name, type } = event.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = event.target.files;
    }
    setInputs({
      // copy existing state
      ...inputs,
      // dynamic property (a variable as the property name)
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  };

  // return things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
};

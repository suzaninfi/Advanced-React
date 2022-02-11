import { useForm } from '../lib/useForm';

export const CreateProduct = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice shoes',
    price: 34234,
    description: 'The best shoes out there',
  });

  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          value={inputs.name}
          type="text"
          id="name"
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          value={inputs.price}
          type="number"
          id="price"
          name="price"
          placeholder="price"
          onChange={handleChange}
        />
      </label>

      <button type="button" onClick={clearForm}>
        Clear form
      </button>

      <button type="button" onClick={resetForm}>
        Reset form
      </button>
    </form>
  );
};

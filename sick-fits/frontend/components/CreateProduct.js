import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { useForm } from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in? and what types?
    # ! means required in gql
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export const CreateProduct = () => {
  const { inputs, handleChange, clearForm } = useForm({
    image: '',
    name: 'Nice shoes',
    price: 34234,
    description: 'The best shoes out there',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    // the variables could also be specified in createProduct() below if you don't know them here yet
    {
      variables: inputs,
      // make sure products page data gets refreshed and does not use the cache after creating a new product
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // submit the input fields to the backend:
        const res = await createProduct();
        clearForm();
        // go to that product's page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}
    >
      <DisplayError error={error} />

      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
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
        <label htmlFor="description">
          Price
          <textarea
            value={inputs.description}
            id="description"
            name="description"
            placeholder="description"
            onChange={handleChange}
          />
        </label>

        <button type="submit">+ Add product</button>
      </fieldset>
    </Form>
  );
};

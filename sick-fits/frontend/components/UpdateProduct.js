import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import Router from 'next/router';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { useForm } from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleChange, clearForm } = useForm(data?.Product);

  if (loading) return <p>loading...</p>;

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        });
        console.log(res);
        // // submit the input fields to the backend:
        // const res = await createProduct();
        // clearForm();
        // // go to that product's page
        // Router.push({
        //   pathname: `/product/${res.data.createProduct.id}`,
        //  });
      }}
    >
      <DisplayError error={error || updateError} />

      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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

        <button type="submit">+ Update product</button>
      </fieldset>
    </Form>
  );
}

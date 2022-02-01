import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Products from '../components/Products';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function ProductPage() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);

  return (
    <div>
      <Products />
    </div>
  );
}

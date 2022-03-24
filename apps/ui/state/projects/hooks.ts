import { gql, useQuery } from '@apollo/client'
import client from '../../apolloclient'


// const fetchDaos = async () => {
//   const {
//     data: { daos }
//   } = await client.query({
//     query: queryDaos,
//   });

//   if (!daos.length) {
//     return [];
//   }
//   console.log({ daos });
//   return daos;
// };

// TODO use useQuery instead!
export const GET_ALL_DAOS = gql`
  query allDaos {
    daos {
      id
      author
      address
      createdAt
      title
    }
  }
`;

export const useFetchTopProject = () => {
  const { loading, error, data } = useQuery(GET_ALL_DAOS);
  console.log({ loading, error, data });
  return { loading, error, data };
};
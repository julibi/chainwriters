export const GET_SEARCHED_DAO = gql`
  query searchDaoQuery($searchTerm: String!) {
    project(where: { title: $searchTerm }) {
      id
      author
      address
      createdAt
      title
      fundedAmount
      firstEditionMax
    }
  }
`;

import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedWines {
        wineId
        name
        type
        region
        rating
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_WINE = gql`
  mutation saveWine($wineData: WineInput!) {
    saveWine(wineData: $wineData) {
      _id
      username
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

export const REMOVE_WINE = gql`
  mutation removeWine($wineId: ID!) {
    removeWine(wineId: $wineId) {
      _id
      username
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

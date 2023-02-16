import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($term: String!) {
    searchUsers(term: $term) {
      _id
      username
      email
    }
  }
`;

export const QUERY_TODOS = gql`
  query todos {
    _id
    text
    status
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      todos {
        _id
        status
        text
      }
    }
  }
`;

export const QUERY_TODO = gql`
  query todo($id: ID!) {
    todo(id: $id) {
      _id
      text
      status
    }
  }
`;

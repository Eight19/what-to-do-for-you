import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation addTodo($text: String!, $status: String!) {
    addTodo(text: $text, status: $status) {
     _id
     text
     status
    }
  }
`;

export const ADD_TODO_STATUS = gql`
  mutation addTodo($id: ID!, $status: String!) {
    addTodo($id: $id, status: $status) {
     _id
     text
     status
    }
  }
`;

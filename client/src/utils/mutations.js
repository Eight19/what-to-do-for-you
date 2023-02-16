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
  mutation login($email: String!, $username: String!, $password: String!) {
    login(email: $email, username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) {
      _id
      username
      email
      todos {
        _id
        text
        status
      }
    }
  }
`;

export const UPDATE_TODO_STATUS = gql`
  mutation updateTodoStatus($id: ID!, $status: String!) {
    updateTodoStatus(id: $id, status: $status) {
        _id
        text
        status
    }
  }
`;
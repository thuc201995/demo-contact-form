import { gql } from "apollo-boost";

export const getContactsQuery = gql`
  query Contacts($limit: Int, $page: Int) {
    contacts(limit: $limit, page: $page) {
      docs {
        name
        message
        email
        createdAt
        updatedAt
      }
      total
      limit
      page
      pages
    }
  }
`;

export const addContactMutaion = gql`
  mutation($name: String!, $email: String!, $message: String!) {
    addContact(name: $name, email: $email, message: $message) {
      name
      email
      message
    }
  }
`;

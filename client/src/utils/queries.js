// import GraphQL for use with queries
import { gql } from '@apollo/client';

// query a single user
export const QUERY_USER = gql`
    query user($username: String) {
        user(username: $username) {
            _id
            username
            email
            mains {
                _id
                mainName
            }
        }
    }
`;

// query user data for personal profile
export const QUERY_ME = gql`
    query me{
        me {
            _id
            username
            email
            mains {
                _id
                mainName
            }
        }
    }
`;

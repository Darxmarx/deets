// import GraphQL for use with mutations
import { gql } from '@apollo/client';

// mutation for logging in
export const LOGIN_USER = gql`
    mutation login($email: String, $password, String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

// mutation to add user to database
export const ADD_USER = gql`
    mutation addUser($username: String, $email: String, $password: String){
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`

// mutation to add main to a user
export const ADD_MAIN = gql`
    mutation addMain($mainName: String) {
        addMain(mainName: $mainName) {
            _id
            mainName
            mainUser
        }
    }
`

// mutation to remove main from a user
export const REMOVE_MAIN = gql`
    mutation removeMain($mainId: ID) {
        removeMain(mainId: $mainId) {
            _id
            mainName
            mainUser
        }
    }
`

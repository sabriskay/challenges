import { gql } from '@apollo/client';

export const GET_SREENSHOTS = gql`
query {
    users {
        id
        username
            screenshots {
                id
                imageUrl
                captureDate
            }
        }
    }
`;
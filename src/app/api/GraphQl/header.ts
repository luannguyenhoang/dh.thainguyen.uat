import { gql } from "@apollo/client";

export const GET_HEADER = gql`
  query MyQuery {
    pageBy(uri: "trang-chu") {
      trangChu {
        header {
          email
          name
          phoneNumber
          tag
        }
      }
    }
  }
`;

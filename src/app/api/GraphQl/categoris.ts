import { gql } from "@apollo/client";

export const GET_CATEGORIS = gql`
  query MyQuery {
    pageBy(uri: "trang-chu") {
      trangChu {
        cacNganhDaoTao {
          item {
            list {
              anhNganh {
                node {
                  mediaItemUrl
                }
              }
              tenNganh
              gioiThieu
            }
          }
        }
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_LICH_KHAI_GIANG = gql`
  query MyQuery {
    pageBy(uri: "lich-khai-giang") {
      lichKhaiGiang {
        section1 {
          title
          label
        }
        thongBao {
          cot {
            anh {
              node {
                mediaItemUrl
              }
            }
            cot1 {
              title
              noiDung
            }
          }
          tieuDe
          noiDung
        }
      }
      seo {
        fullHead
      }
    }
  }
`;

export const GET_TIME_LINE = gql`
  query MyQuery {
    pageBy(uri: "lich-khai-giang") {
      lichKhaiGiang {
        section1 {
          title
          label
        }
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_CONG_NGHE_THONG_TIN = gql`
  query MyQuery {
    pageBy(uri: "nganh-cong-nghe-thong-tin") {
      congNgheThongTin {
        tieuDe
        tuyenSinh {
          header {
            text
            title
          }
          label1 {
            child {
              text
              title
            }
          }
          label2 {
            image {
              node {
                mediaItemUrl
              }
            }
          }
        }
        nganhHocCntt {
          title
          tongQuan {
            title
            label {
              text
            }
          }
          ngheNghiep {
            title
            label {
              text
            }
          }
          label {
            text
          }
          chuongTrinhVaThoiGianDaoTao {
            title
            label1 {
              cot {
                text1
                text2
              }
            }
            label2 {
              cot {
                text1
                text2
              }
            }
          }
        }
      }
      seo {
        fullHead
      }
    }
  }
`;

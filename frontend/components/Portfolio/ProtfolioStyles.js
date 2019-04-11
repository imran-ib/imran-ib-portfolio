import styled from "styled-components";

export const ProtfolioStyled = styled.section`
  .portfolio-page {
    min-height: 100vh;
    padding: 150px 0 0;
    background-color: ${props => props.theme.basepagewhite};

    .portfolio-card {
      background-image: linear-gradient(45deg, #4e54c8 0%, #8f94fb 100%);
      border: none;
      color: white;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
      margin-bottom: 20px;

      &:hover {
        cursor: pointer;
        transform: translateY(-5px);
      }

      &:hover .readMore:before {
        background: linear-gradient(to right, #ffffff 0%, #ffffff 100%);
      }

      &-header {
        padding: 3px;
        padding-right: 7px;
        text-align: right;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 17px;
      }

      &-city {
      }

      &-title {
        font-size: 30px;
        font-weight: 700;
        line-height: 1.1;
        text-transform: uppercase;
        margin-bottom: 10px;
      }

      &-text {
        font-size: 16px;
        font-weight: 500;
        line-height: 1.3;
        margin-bottom: 50px;
      }
    }
  }
  h1 {
    margin-bottom: 50px;
    text-align: center;
  }
`;

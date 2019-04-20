import styled from "styled-components";

export const BlogStyles = styled.div`
  .blog-listing-page {
    min-height: 100vh;
    background-color: #ecedee;

    .blog-body {
      padding: 50px 0 0 0;
    }

    .post-preview {
      & > a {
        color: #212529;
        &:focus,
        &:hover {
          text-decoration: none;
          color: #096fb9;
        }
        .post-title {
          font-size: 30px;
          margin-top: 30px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .post-subtitle {
          font-weight: 300;
          margin: 0 0 10px;
          color: #565656;
        }
      }

      .post-meta {
        font-size: 18px;
        font-style: italic;
        margin-top: 0;
        color: #868e96;
        a {
          text-decoration: none;
          color: #212529;
          &:focus,
          &:hover {
            text-decoration: underline;
            color: #096fb9;
          }
        }
      }

      @media only screen and (min-width: 768px) {
        a {
          .post-title {
            font-size: 36px;
          }
        }
      }
    }
    .custom-image-styles {
      background: no-repeat center center;
      background-color: #868e96;
      background-attachment: scroll;
      position: relative;
      background-size: cover;
    }
    .overlay {
      content: "";
      display: block;
      position: relative;
      padding: 100px 0;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.2);
    }
    .masthead {
      background: no-repeat center center;
      background-attachment: scroll;
      position: relative;
      background-size: cover;

      .page-heading,
      .post-heading,
      .site-heading {
        padding: 200px 0 150px;
        color: white;
        @media only screen and (min-width: 768px) {
          padding: 200px 0;
        }
      }
      .page-heading,
      .site-heading {
        text-align: center;
        h1 {
          font-size: 50px;
          margin-top: 0;
          font-weight: 700;
        }
        .subheading {
          font-size: 24px;
          font-weight: 300;
          line-height: 1.1;
          display: block;
          margin: 10px 0 0;
        }
        @media only screen and (min-width: 768px) {
          h1 {
            font-size: 80px;
          }
        }
      }
      .post-heading {
        h1 {
          font-size: 35px;
        }
        .meta,
        .subheading {
          line-height: 1.1;
          display: block;
        }
        .subheading {
          font-size: 24px;
          font-weight: 600;
          margin: 10px 0 30px;
        }
        .meta {
          font-size: 20px;
          font-weight: 300;
          font-style: italic;

          a {
            color: #ffffff;
          }
        }
        @media only screen and (min-width: 768px) {
          h1 {
            font-size: 55px;
          }
          .subheading {
            font-size: 30px;
          }
        }
      }
    }

    footer {
      padding: 50px 0 65px;
      .list-inline {
        margin: 0;
        padding: 0;
      }
      .copyright {
        font-size: 14px;
        margin-bottom: 0;
        text-align: center;
      }
    }
  }
  @media only screen and (min-width: 991px) {
    .editor-container {
      padding: 0 180px;
    }
  }
  .custom-blog-styles {
    p {
      font-size: 20px;
    }
    blockquote {
      border-left: 2px solid #ddd;
      margin-left: 0;
      margin-right: 0;
      padding-left: 10px;
      font-style: italic;
      display: block;
      color: #aaa;
    }
  }
`;

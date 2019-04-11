import styled from "styled-components";

export const HomeStyles = styled.div`
  display: flex;
  margin-top: 0;
  overflow: hidden;
  position: relative;
  .bck__cover {
    background-image: url("/static/4.2 background-index.png"),
      linear-gradient(45deg, #00aeef 0%, #096fb9 100%);
    height: 100vh;
    width: 100vw;
    background-size: cover;
  }

  .wrapper {
    min-height: 100vh;
    min-width: 100vw;
    margin-top: 0;
    position: relative;
  }

  .main-section {
    top: 150px;
    width: 100%;
    padding: 150px 0 0;
  }

  .hero-section {
    h2 {
      color: white;
      font-weight: bold;
      margin-bottom: 10px;
    }

    perspective: 1000px;
    color: white;
    width: 400px;
    position: relative;

    &-content {
      position: absolute;
      bottom: 20px;
      width: 360px;
      left: 6%;
      z-index: 1;

      &-intro {
        font-size: 17px;
      }
    }
  }

  .image {
    width: auto;
    max-width: 100%;
  }

  .hero-welcome-text > h1 {
    color: white;
    text-transform: uppercase;
    font-size: 27px;
    margin-top: 80px;
  }

  .hero-welcome-bio {
    margin-top: 20px;
    color: white;

    .fa-stack {
      font-size: 28px;
    }

    .list-inline-item {
      > a {
        color: #373737;
      }
    }
  }

  .hero-welcome-wrapper {
    justify-content: flex-end;
  }
  .self-typed-text {
    font-size: 32px;
    color: #ffffff;
    font-weight: bold;
  }

  @media (max-width: 991px) {
    .hero-section {
      width: 341px;

      &-content {
        width: 341px;
      }
    }

    .hero-welcome-text > h1 {
      margin-top: 0px;
    }
  }

  .background-image {
    position: absolute;
    width: 1762px;
    height: 493px;
  }

  .shadow-custom {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    box-shadow: -17px 13px 41px rgba(13, 78, 158, 0.6);
    border: 2px solid #3bace5;

    .shadow-inner {
      width: 100%;
      height: 100%;
      box-shadow: -17px 13px 13px rgba(0, 0, 0, 0.09);
    }
  }

  .shadow-custom-2 {
    border: 2px solid #f37d49;
    box-shadow: -17px 13px 41px rgba(13, 78, 158, 0.3);
  }
`;

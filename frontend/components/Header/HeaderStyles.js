import styled from "styled-components";

export const HeaderStyles = styled.div`
  .absolute {
    position: absolute;
  }
  .port-navbar,
  .port-nav-base {
    width: 100%;
    z-index: 15;
    padding: 40px;

    .port-navbar {
      &-brand {
        color: white;
        font-size: 24px;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
      }

      &-item {
        margin-left: 10px;
        margin-right: 10px;
      }

      &-link {
        color: white;
        font-weight: bold;
        letter-spacing: 0.8px;
        font-size: 18px;
        text-transform: uppercase;
        text-decoration: none;

        &.active {
          color: #dba919;
        }

        &:hover,
        &:focus {
          color: #dba919;
        }
      }
    }
  }
  .port-navbar,
  .port-nav-base,
  .port-nav-default {
    padding: 30px;
    background-color: ${props => props.theme.secondary} !important;
  }
`;

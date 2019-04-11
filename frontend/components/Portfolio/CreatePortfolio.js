import React, { Component } from "react";
import { ProtfolioStyled } from "./ProtfolioStyles";
import { Container } from "reactstrap";
import PortfolioForm from "./PortfolioForm";

class CreatePortfolio extends Component {
  render() {
    return (
      <ProtfolioStyled>
        <Container>
          <div className="portfolio-page">
            <h1>Create New Portfolio</h1>
            <PortfolioForm />
          </div>
        </Container>
      </ProtfolioStyled>
    );
  }
}

export default CreatePortfolio;

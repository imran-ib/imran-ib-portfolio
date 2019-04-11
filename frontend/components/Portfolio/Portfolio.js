import React, { Component } from "react";
import { ProtfolioStyled } from "./ProtfolioStyles";
import PortfolioCard from "./PortfolioCard";
import { Row, Container } from "reactstrap";
import Link from "next/link";

class Portfolio extends Component {
  render() {
    return (
      <ProtfolioStyled>
        <Container className="portfolio-page">
          <h1>Have a Look at my Portfolio</h1>

          <PortfolioCard />
        </Container>
      </ProtfolioStyled>
    );
  }
}

export default Portfolio;

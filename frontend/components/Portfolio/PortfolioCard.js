import React from "react";
import {
  Card,
  Col,
  CardHeader,
  CardTitle,
  CardText,
  CardBody,
  Row
} from "reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import DeleteButton from "./../utills/Buttons/DeleteButton";
import CurrentUser from "./../Authentication/CurrentUser/CurrentUser";
import SinglePortfolioModel from "./SiglePortfolioModel";

const GET_ALL_PORTFOLIOS = gql`
  query GET_ALL_PORTFOLIOS {
    portfolios {
      id
      title
      company
      location
      position
      description
      startDate
      endDate
      createdAt
    }
  }
`;
class RenderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  render() {
    const { card, me, isAdmin } = this.props;
    return (
      <Col md="4">
        <span onClick={this.toggle}>
          <SinglePortfolioModel
            toggle={this.toggle}
            modal={this.state.modal}
            card={card}
          />
          <Card className="portfolio-card">
            <CardHeader className="portfolio-card-header">
              {card.title}
            </CardHeader>
            <CardBody>
              <p className="portfolio-card-city"> {card.location} </p>
              <CardTitle className="portfolio-card-title">
                {card.company}
              </CardTitle>
              <CardText className="portfolio-card-text">
                {card.description}
              </CardText>
              {me && isAdmin ? (
                <div className="readMore">
                  <>
                    <Link
                      href={{
                        pathname: "/updatePortfolio",
                        query: { id: card.id }
                      }}
                    >
                      <a
                        onClick={e => {
                          e.stopPropagation();
                        }}
                        style={{ marginRight: "5px" }}
                        className="btn btn-success"
                      >
                        Edit
                      </a>
                    </Link>
                    <DeleteButton id={card.id} />
                  </>
                </div>
              ) : (
                ""
              )}
            </CardBody>
          </Card>
        </span>
      </Col>
    );
  }
}

const PortfolioCard = () => (
  <Query query={GET_ALL_PORTFOLIOS}>
    {({ data, loading, error }) => {
      const { portfolios } = data;
      return (
        <CurrentUser>
          {({ data: { me } }) => {
            let isAdmin = null;
            if (me) {
              const { permissions } = me;
              isAdmin = permissions.some(permission =>
                ["ADMIN"].includes(permission)
              );
            }
            return (
              <>
                {isAdmin && me && (
                  <Link href="/portfolioNew">
                    <a
                      className="btn btn-success"
                      style={{ marginBottom: "20px" }}
                    >
                      Create New Portfolio
                    </a>
                  </Link>
                )}
                <Row>
                  {portfolios &&
                    portfolios.map((card, index) => (
                      <RenderCard
                        card={card}
                        key={index}
                        me={me}
                        isAdmin={isAdmin}
                      />
                    ))}
                </Row>
              </>
            );
          }}
        </CurrentUser>
      );
    }}
  </Query>
);

export default PortfolioCard;
export { GET_ALL_PORTFOLIOS };

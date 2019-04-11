/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";
import styled from "styled-components";

const ListStyles = styled.div`
  background: #00f260; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #0575e6,
    #00f260
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #0575e6,
    #00f260
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  .heading {
    color: #3d3d3f;
  }
  .list {
    list-style: none;
    color: #fff;
  }
  .listItems {
    color: #fff;
    padding: 20px 0;
    letter-spacing: 1.5px;
    font-weight: 300;
    :not(:last-child) {
      border-bottom: 2px solid #7dce94;
    }

    b {
      color: red;
      font-weight: 700;
    }
  }
`;

class SinglePortfolioModel extends React.Component {
  render() {
    const { card } = this.props;
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ListStyles>
          <ModalHeader toggle={this.props.toggle}>
            <h1 className="heading">{card.title}</h1>
          </ModalHeader>
          <ModalBody>
            <ul className="list">
              <li className="listItems ">
                <b>Company </b>➡ {card.company}
              </li>
              <li className="listItems ">
                <b>Location </b>➡ {card.location}
              </li>
              <li className="listItems ">
                <b>Position </b>➡ {card.position}
              </li>
              <li className="listItems ">
                <b>Description </b>➡ {card.description}
              </li>
              <li className="listItems ">
                <b>StartDate </b>➡ {moment(card.startDate).format("MMMM YYYY")}
              </li>
              <li className="listItems ">
                <b>EndDate </b>➡{" "}
                {card.endDate
                  ? moment(card.endDate).format("MMMM YYYY")
                  : "Still Working There"}
              </li>
            </ul>
          </ModalBody>
        </ListStyles>
        <ModalFooter>
          <Button color="danger" onClick={this.props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default SinglePortfolioModel;

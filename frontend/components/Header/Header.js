import React from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import NProgress from "nprogress";
import Router from "next/router";
import BsNavLink from "../utills/BsNavLink";
import { HeaderStyles } from "./HeaderStyles";
import Logout from "./../Authentication/Logout/Logout";
import Login from "./../Authentication/Login/LoginButton";
import CurrentUser from "./../Authentication/CurrentUser/CurrentUser";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { className } = this.props;
    const MyColor = className === "port-nav-default" ? "#2C3E50" : "";
    return (
      <HeaderStyles>
        <CurrentUser>
          {({ data: { me } }) => (
            <Navbar
              style={{
                backgroundColor: MyColor
              }}
              className={`port-navbar port-nav-base absolute port-nav-default`}
              color=""
              dark
              expand="md"
            >
              <NavbarBrand className="port-navbar-brand" href="/">
                Imran Irshad
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <BsNavLink
                    className="port-navbar-item"
                    route={"/"}
                    title={"Home"}
                  />
                  <BsNavLink
                    className="port-navbar-item"
                    route={"/about"}
                    title={"About"}
                  />
                  <BsNavLink
                    className="port-navbar-item"
                    route={"/portfolio"}
                    title={"Portfolio"}
                  />
                  <BsNavLink
                    className="port-navbar-item"
                    route={"/blogs"}
                    title={"Blogs"}
                  />
                  <BsNavLink
                    className="port-navbar-item"
                    route={"/cv"}
                    title={"CV"}
                  />
                  {!me ? <Login /> : <Logout />}
                </Nav>
              </Collapse>
            </Navbar>
          )}
        </CurrentUser>
      </HeaderStyles>
    );
  }
}

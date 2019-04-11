import React from "react";
import { NavItem, NavLink } from "reactstrap";
import Link from "next/link";

export default function Login(props) {
  const { route, title } = props;
  return (
    <>
      <NavItem>
        <Link href="/auth">
          <a className="port-navbar-link clickable nav-link">login</a>
        </Link>
      </NavItem>
      <NavItem />
    </>
  );
}

import React from "react";
import { NavItem, NavLink } from "reactstrap";
import Link from "next/link";

export default function BsNavLink(props) {
  const { route, title } = props;
  return (
    <>
      <NavItem>
        <Link href={route}>
          <a className="port-navbar-link nav-link">{title}</a>
        </Link>
      </NavItem>
      <NavItem />
    </>
  );
}

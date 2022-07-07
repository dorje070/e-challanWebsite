import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import E_logo from '../images/E_logo.png';
export default function HeaderScreen() {
  const data = JSON.parse(localStorage.getItem('userInfo'));
  const loginstring = 'http://localhost:3000/login';

  console.log(data);
  var isempty = false;
  if (data === null) {
    isempty = true;
  }
  const signOutHandler = () => {
    localStorage.removeItem('userInfo');
    console.log(data);
    window.location.href = '/';
  };
  return (
    <div>
      <Navbar expand="lg" className="mb-5 headerbar">
        <Container>
          <Navbar.Brand href={isempty ? '/' : '/traffic'} className="row">
            <img src={E_logo} alt="" className="mr-2 col" />
            <h3 className="col mt-3">E-challan</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {isempty ? (
              window.location.href === loginstring ? (
                ''
              ) : (
                <Nav className="ms-auto">
                  <Nav.Link href="/login">Sign in</Nav.Link>
                </Nav>
              )
            ) : (
              <Nav className="ms-auto">
                {' '}
                <Nav.Link href="/traffic">Home</Nav.Link>
                <Nav.Link href="/">Payment</Nav.Link>
                <NavDropdown title={`${data.name}`} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/traffic/profile">
                    Profile
                  </NavDropdown.Item>
                  {data.isAdmin ? (
                    <NavDropdown.Item href="/traffic/account">
                      Account
                    </NavDropdown.Item>
                  ) : (
                    ''
                  )}
                  <NavDropdown.Item href="/" onClick={signOutHandler}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

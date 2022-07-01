import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function HeaderScreen() {
  const data = JSON.parse(localStorage.getItem('userInfo'));
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
      <Navbar bg="light" expand="lg" className="mb-5">
        <Container>
          <Navbar.Brand href={isempty ? '/' : '/traffic'}>
            E-challan
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {isempty ? (
              <Nav className="ms-auto">
                <Nav.Link href="/login">Sign in</Nav.Link>
              </Nav>
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

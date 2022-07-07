import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function Errorscreen() {
  const data = JSON.parse(localStorage.getItem('userInfo'));

  var isempty = false;
  if (data === null) {
    isempty = true;
  }

  return (
    <div>
      <Container className="d-flex justify-content-center  my-5">
        <div>
          <h1>404</h1>
          <h1>Page not found</h1>
          <div className="d-flex justify-content-center">
            <Button className="ml-6">
              {isempty ? <a href="/">Back</a> : <a href="/traffic"> Back</a>}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

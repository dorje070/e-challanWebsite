import React, { useState } from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function LoginScreen() {
  const [email, SetEmail] = useState('');
  const [password, Setpassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/signin', {
        email,
        password,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      console.log(data);
      window.location.href = '/traffic';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => SetEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => Setpassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </Form>
      </Container>
    </div>
  );
}

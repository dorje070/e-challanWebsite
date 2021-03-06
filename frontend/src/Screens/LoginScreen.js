import React, { useState } from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import loginpic from '../images/policeman.jpg';

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
      toast('succussful Login');
      window.location.href = '/traffic';
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <Container className="loignfrom">
        <Form onSubmit={submitHandler} className="col">
          <Form.Group className="my-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => SetEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => Setpassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </Form>

        <div className="col d-flex justify-content-center mb-5">
          <img src={loginpic} alt="" className="loginImg" />
        </div>
      </Container>
    </div>
  );
}

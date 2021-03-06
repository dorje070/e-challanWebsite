import React, { useState } from 'react';
import Axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { getError } from '../utils';
import { toast } from 'react-toastify';

export default function AccountScreen() {
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, Setpassword] = useState('');
  const [cpassword, SetCpassword] = useState('');
  const [isAdmin, setisAdmin] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast('password is incorrect');
    } else {
      try {
        const { data } = await Axios.post('/api/signup', {
          name,
          email,
          password,
          isAdmin,
        });
        toast('Account is successful create');
        SetName('');
        SetEmail('');
        Setpassword('');
        SetCpassword('');
        setisAdmin(false);
        localStorage.setItem('userProfile', JSON.stringify(data));
        console.log(data);
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };

  return (
    <div>
      <Container className="mb-5">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={(e) => SetName(e.target.value)}
              value={name}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => SetEmail(e.target.value)}
              value={email}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasiisAdmin">
            <Form.Check
              type="checkbox"
              label="is Admin"
              name="isAdmin"
              checked={isAdmin}
              onChange={(e) => setisAdmin(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => Setpassword(e.target.value)}
              value={password}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCPassword">
            <Form.Label>Comfrim Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Comfirm Password"
              name="cpassword"
              onChange={(e) => SetCpassword(e.target.value)}
              value={cpassword}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Account
          </Button>
        </Form>
      </Container>
    </div>
  );
}

import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const reducer = (state, action) => {
  switch (action.type) {
    case 'USERS_REQUEST':
      return { ...state, laoding: true };
    case 'USERS_SUCCESS':
      return { ...state, users: action.payload, loading: false };
    case 'USERS_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default function ProfileScreen() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const id = userInfo._id;
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    user: [],
    error: '',
  });
  const { loading, error, users } = state;
  const loadUsers = async () => {
    dispatch({ type: 'USERS_REQUEST' });
    try {
      const fetchData = async () => {
        const { data } = await axios.get(`/api/${id}`);
        dispatch({ type: 'USERS_SUCCESS', payload: data });
      };
      fetchData();
    } catch (err) {
      dispatch({ type: 'USERS_FAIL', payload: err.message });
    }
  };
  const [isEdit, SetisEdit] = useState(false);
  const [name, Setname] = useState('');
  const [email, Setemail] = useState('');
  const [isAdmin, setisAdmin] = useState(false);
  const [address, Setaddress] = useState('');
  const [gender, Setgender] = useState('');
  const [phone, Setphone] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/api/${id}`);
      Setname(result.data.name);
      Setemail(result.data.email);
      setisAdmin(result.data.isAdmin);
      Setaddress(result.data.address);
      Setgender(result.data.gender);
      Setphone(result.data.phone);
    };
    fetchData();
  }, []);

  const Editdata = () => {
    SetisEdit(true);
  };

  const submitHandler = async (e) => {
    if (gender === '') {
      console.log('please select gender');
    } else {
      e.preventDefault();
      try {
        const data = await axios.put(`/api/profile/${id}`, {
          email,
          name,
          address,
          gender,
          phone,
          isAdmin,
        });
        localStorage.setItem('userProfile', JSON.stringify(data));
        SetisEdit(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      ProfileScreen
      {isEdit ? (
        <Container>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="please enter Name"
                value={name}
                onChange={(e) => Setname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter Email"
                name="email"
                onChange={(e) => Setemail(e.target.value)}
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
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                name="address"
                onChange={(e) => Setaddress(e.target.value)}
                required
              />
            </Form.Group>
            <div className="mb-3">
              <Form.Check
                inline
                label="Male"
                name="gender"
                type="radio"
                value="Male"
                onChange={(e) => Setgender(e.target.value)}
              />
              <Form.Check
                inline
                label="Female"
                name="gender"
                type="radio"
                value="Female"
                onChange={(e) => Setgender(e.target.value)}
              />
            </div>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Phone Number"
                name="Phone"
                value={phone}
                onChange={(e) => Setphone(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Account
            </Button>
          </Form>
        </Container>
      ) : (
        <div>
          <Container>
            <ListGroup className="mb-3">
              <ListGroup.Item>Name: {name}</ListGroup.Item>
              <ListGroup.Item>Email: {email}</ListGroup.Item>
              {isAdmin ? (
                <ListGroup.Item>Type: Admin</ListGroup.Item>
              ) : (
                <ListGroup.Item>Type: Traffic</ListGroup.Item>
              )}
              <ListGroup.Item>Address: {address}</ListGroup.Item>
              <ListGroup.Item>Gender: {gender}</ListGroup.Item>
              <ListGroup.Item>Phone: {phone}</ListGroup.Item>
            </ListGroup>
            <div>
              <Button variant="primary" type="submit" onClick={Editdata}>
                Edit Profile
              </Button>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

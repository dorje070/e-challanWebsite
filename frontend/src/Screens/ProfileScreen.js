import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function ProfileScreen() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const id = userInfo._id;

  const [isEdit, SetisEdit] = useState(false);
  const [name, Setname] = useState('');
  const [email, Setemail] = useState('');
  const [isAdmin, setisAdmin] = useState(false);
  const [address, Setaddress] = useState('');
  const [gender, Setgender] = useState('');
  const [phone, Setphone] = useState();

  const [password, Setpassword] = useState('');
  const [cpassword, SetCpassword] = useState('');

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
  }, [id]);

  const Editdata = () => {
    SetisEdit(true);
  };

  const OffEdit = () => {
    SetisEdit(false);
  };

  const ChangePassword = async (e) => {
    e.preventDefault();

    if (password === cpassword) {
      try {
        const data = await axios.put(`/api/password/${id}`, {
          password,
        });
        toast('Changing Password is successful');
        Setpassword('');
        SetCpassword('');
        console.log(data);
      } catch (err) {
        toast.error(getError(err));
      }
    } else {
      toast('password and comfirm password are not matching');
    }
  };
  const submitHandler = async (e) => {
    if (gender === '') {
      toast('please select gender');
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
        toast('sucessfully edit the profile');

        SetisEdit(false);
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };

  return (
    <div>
      {isEdit ? (
        <Container className="iContainer">
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

            <Button variant="primary mx-3" type="submit">
              Submit
            </Button>

            <Button variant="primary mx-3" onClick={OffEdit}>
              Back
            </Button>
          </Form>
        </Container>
      ) : (
        <div>
          <Container className="iContainer">
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
      <Container className="iContainer mb-5">
        <div>
          <h3 className="d-flex justify-content-center my-4">
            Change Password
          </h3>
        </div>

        <Form onSubmit={ChangePassword}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => Setpassword(e.target.value)}
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
          <div>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

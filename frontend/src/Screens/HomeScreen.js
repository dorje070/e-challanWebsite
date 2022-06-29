import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Axios from 'axios';
import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

function HomeScreen() {
  const [inputLicense, SetinputLicense] = useState('');
  const [License, SetLicense] = useState('');
  const [isvisable, Setisvisable] = useState(false);
  const [ispayment, Setpayment] = useState(false);
  const [date, setdate] = useState(new Date());
  const [submitDate, setSubmitDate] = useState(new Date());
  const [name, SetName] = useState('');
  const [address, Setaddress] = useState('');
  const [createdBy, SetcreatedBy] = useState();
  const [offence, SetOffence] = useState(500);
  const [vehicle, setvehicle] = useState('');
  const [wheeler, Setwheeler] = useState('Two Wheeler');
  const [challan, SetChallan] = useState(0);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.get(`/challan/${inputLicense}`);
      setdate(data.date);
      SetLicense(data.License);
      SetName(data.name);
      Setaddress(data.address);
      SetcreatedBy(data.createdBy);
      SetOffence(data.offence);
      setvehicle(data.vehicle);
      Setwheeler(data.wheeler);
      SetcreatedBy(data.createdBy);
      setSubmitDate(data.submitDate);
      SetChallan(data.challan);
      SetOffence(data.offence);
      Setisvisable(true);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const ComfirmCard = () => {
    Setpayment(true);
    Setisvisable(false);
  };

  const VisiableData = () => {
    Setisvisable(false);
  };
  return (
    <div>
      Home Screen
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formLicense">
            <Form.Label>Enter License no </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter License no"
              onChange={(e) => SetinputLicense(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
      {ispayment ? (
        <div>
          {' '}
          <h1>Comfirm your payment</h1>
        </div>
      ) : (
        <div></div>
      )}
      {isvisable ? (
        <Container>
          <h1 className="d-flex justify-content-center my-4">
            Are you {name} ?
          </h1>
          <div className="d-flex justify-content-center my-4">
            <div>
              <Button variant="primary mx-2" onClick={ComfirmCard}>
                Yes
              </Button>{' '}
            </div>
            <div>
              <Button variant="primary mx-2" onClick={VisiableData}>
                No
              </Button>{' '}
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col px-0">
              <ListGroup>
                <ListGroup.Item>Name: {name}</ListGroup.Item>
                <ListGroup.Item>Date: {date}</ListGroup.Item>
                <ListGroup.Item>Address: {address}</ListGroup.Item>
                <ListGroup.Item>License: {License}</ListGroup.Item>
                <ListGroup.Item>Vehicle: {vehicle}</ListGroup.Item>
              </ListGroup>
            </div>
            <div className="col px-0">
              <ListGroup>
                <ListGroup.Item>Type of Vehicle: {wheeler}</ListGroup.Item>
                <ListGroup.Item>Created by: {createdBy}</ListGroup.Item>
                <ListGroup.Item>Offence: {offence}</ListGroup.Item>
                <ListGroup.Item>Submit Date: {submitDate}</ListGroup.Item>
                <ListGroup.Item>challan: {challan}</ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </Container>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default HomeScreen;

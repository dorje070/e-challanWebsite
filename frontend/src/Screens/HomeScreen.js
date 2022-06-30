import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Axios from 'axios';
import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import mc from '../images/mc.png';
import pp from '../images/pp.png';
import vi from '../images/vi.png';

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

  const ComfirmHandler = async (e) => {
    e.preventDefault();
    try {
      const deletedata = await Axios.get(`/challan/delete/${inputLicense}`);
      console.log(deletedata.data);
      Setpayment(false);
      Setisvisable(false);
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

  const backData = () => {
    Setpayment(false);
    Setisvisable(true);
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
        <Container className="ComCard mt-5">
          {' '}
          <h1 className="d-flex justify-content-center my-4">
            Offence : {offence}
          </h1>
          <h2 className="d-flex justify-content-center my-4">
            {' '}
            Payment Rs:{challan}
          </h2>
          <h1>Confirm Your Payment</h1>
          <Form onSubmit={ComfirmHandler}>
            <div className="first-row ">
              <Form.Group className="mb-3 owner col" controlId="formOwner">
                <Form.Label>Owner</Form.Label>
                <Form.Control type="text" placeholder="Owner Name" required />
              </Form.Group>
              <Form.Group className="mb-3 cvv col" controlId="formLicense">
                <Form.Label>Cvv</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Cvv"
                  required
                />
              </Form.Group>
            </div>
            <div className="second-row">
              <Form.Group
                className="mb-3 card-number"
                controlId="formCardNumber"
              >
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Card number"
                  required
                />
              </Form.Group>
            </div>
            <div className="third-row">
              <div className="selection"></div>
              <Form.Label>Expiration Date</Form.Label>
              <Form.Group className="mb-3 date" controlId="formOffence">
                <Form.Select
                  aria-label="Default select example"
                  className="months"
                  id="months"
                  required
                >
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                  <option value="Apr">Apr</option>
                  <option value="May">May</option>
                  <option value="Jun">Jun</option>
                  <option value="Jul">Jul</option>
                  <option value="Aug">Aug</option>
                  <option value="Sep">Sep</option>
                  <option value="Oct">Oct</option>
                  <option value="Nov">Nov</option>
                  <option value="Dec">Dec</option>
                </Form.Select>
                <Form.Select
                  aria-label="Default select example"
                  className="years"
                  id="years"
                  required
                >
                  <option value="2027">2027</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </Form.Select>
                <div class="cards d-flex justify-content-center my-4">
                  <img src={mc} alt="" />
                  <img src={vi} alt="" />
                  <img src={pp} alt="" />
                </div>
              </Form.Group>
            </div>
            <div className="d-flex justify-content-center my-4">
              <Button
                variant="primary mx-2"
                className="Comfrim"
                size="lg"
                type="submit"
              >
                Comfrim
              </Button>
              <Button
                variant="primary mx-2 "
                onClick={backData}
                className="Comfrim"
                size="lg"
              >
                Back
              </Button>
            </div>
          </Form>
        </Container>
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

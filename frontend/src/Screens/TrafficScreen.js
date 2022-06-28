import Container from 'react-bootstrap/esm/Container';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Axios from 'axios';

function TrafficScreen() {
  const [date, setdate] = useState(new Date());
  const [submitDate, setSubmitDate] = useState(new Date());
  const data = JSON.parse(localStorage.getItem('userInfo'));
  const [name, SetName] = useState('');
  const [address, Setaddress] = useState('');
  const [createdBy, SetcreatedBy] = useState(data.name);
  const [offence, SetOffence] = useState(500);
  const [linencse, Setlinencse] = useState('');
  const [vehicle, setvehicle] = useState('');
  const [wheeler, Setwheeler] = useState('Two Wheeler');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await Axios.post('/challan/add', {
        name,
        date,
        address,
        linencse,
        vehicle,
        wheeler,
        createdBy,
        offence,
        submitDate,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      Traffic Page
      <Container>
        <Form onSubmit={submitHandler}>
          <h2 className="d-flex justify-content-center mb-4">Echallan</h2>
          <div className="row d-flex justify-content-center">
            <div className="col-md-auto">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={(e) => SetName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Date</Form.Label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setdate(date)}
                  minDate={new Date()}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  onChange={(e) => Setaddress(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLinencse">
                <Form.Label>Linencse Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Linencse No"
                  onChange={(e) => Setlinencse(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formVehicleNo">
                <Form.Label>Vehicle Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Vehicle No"
                  onChange={(e) => setvehicle(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-auto">
              <Form.Group className="mb-3" controlId="formVehicleType">
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => Setwheeler(e.target.value)}
                  required
                >
                  <option value="Two Wheeler">Two wheeler</option>
                  <option value="Three Wheeler">Three Wheeler</option>
                  <option value="Four Wheeler">Four Wheeler</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Created by</Form.Label>
                <Form.Control
                  placeholder={createdBy}
                  disabled
                  onChange={(e) => SetcreatedBy(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formOffence">
                <Form.Label>Offence</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => SetOffence(e.target.value)}
                  required
                >
                  <option value="500">No Helmet/Seat-belts</option>
                  <option value="500">Overload</option>
                  <option value="500">Reckless driving</option>
                  <option value="1000">Drink and Drive</option>
                  <option value="1000">Random Parking</option>
                  <option value="1000">No License</option>
                  <option value="1000">Accidents</option>
                  <option value="1500">Wrong Lane</option>
                  <option value="1500">Over Speeding</option>
                  <option value="1500">
                    Lights off during night time
                  </option>{' '}
                  <option value="1500">Not Obeying traffic signs</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-5" controlId="formSubmitDate">
                <Form.Label>Due to submit</Form.Label>
                <DatePicker
                  selected={submitDate}
                  onChange={(date) => setSubmitDate(date)}
                  minDate={new Date()}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default TrafficScreen;

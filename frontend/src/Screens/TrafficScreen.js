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
  const [challan, SetChallan] = useState(500);
  const [offence, SetOffence] = useState('No Helmet/Seat-belts');
  const [License, SetLicense] = useState('');
  const [vehicle, setvehicle] = useState('');
  const [wheeler, Setwheeler] = useState('Two Wheeler');

  var challandata = async () => {
    if (
      offence === 'No Helmet/Seat-belts' ||
      offence === 'Overload' ||
      offence === 'Reckless driving'
    ) {
      return 500;
    } else if (
      offence === 'Drink and Drive' ||
      offence === 'Random Parking' ||
      offence === 'No License' ||
      offence === 'Accidents'
    ) {
      return 1000;
    } else if (
      offence === 'Wrong Lane' ||
      offence === 'Over Speeding' ||
      offence === 'Lights off during night time' ||
      offence === 'Not Obeying traffic signs'
    ) {
      return 1500;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const payment = await challandata();
    SetChallan(payment);

    try {
      const { data } = await Axios.post('/challan/add', {
        name,
        date,
        address,
        License,
        wheeler,
        vehicle,
        createdBy,
        offence,
        submitDate,
        challan,
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

              <Form.Group className="mb-3" controlId="formLicense">
                <Form.Label>License Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter License No"
                  onChange={(e) => SetLicense(e.target.value)}
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
                  <option value="No Helmet/Seat-belts">
                    No Helmet/Seat-belts
                  </option>
                  <option value="Overload">Overload</option>
                  <option value="Reckless driving">Reckless driving</option>
                  <option value="Drink and Drive">Drink and Drive</option>
                  <option value="Random Parking">Random Parking</option>
                  <option value="No License">No License</option>
                  <option value="Accidents">Accidents</option>
                  <option value="Wrong Lane">Wrong Lane</option>
                  <option value="Over Speeding">Over Speeding</option>
                  <option value="Lights off during night time">
                    Lights off during night time
                  </option>{' '}
                  <option value="Not Obeying traffic signs">
                    Not Obeying traffic signs
                  </option>
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

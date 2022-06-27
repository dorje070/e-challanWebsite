import Container from 'react-bootstrap/esm/Container';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

function TrafficScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [submitDate, setSubmitDate] = useState(new Date());
  return (
    <div>
      Traffic Page
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDate">
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSubmitDate">
            <Form.Label>Due to submit</Form.Label>
            <DatePicker
              selected={submitDate}
              onChange={(date) => setSubmitDate(date)}
              minDate={new Date()}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default TrafficScreen;

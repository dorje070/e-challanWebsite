import Container from 'react-bootstrap/esm/Container';
import React, { useEffect, useReducer, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Scrollbars } from 'react-custom-scrollbars-2';
import jsPDF from 'jspdf';
import { getError } from '../utils';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'USERS_REQUEST':
      return { ...state, loading: true };
    case 'USERS_SUCCESS':
      return { ...state, users: action.payload, loading: false, error: '' };
    case 'USERS_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

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
  const [editing, SetEditing] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    users: [],
    error: '',
  });
  const { loading, error, users } = state;
  const loadUsers = async () => {
    dispatch({ type: 'USERS_REQUEST' });
    try {
      const result = await Axios.get('/challan/table');

      dispatch({ type: 'USERS_SUCCESS', payload: result.data });
    } catch (err) {
      dispatch({ type: 'USERS_FAIL', payload: err.message });
    }
  };

  const textvalue = ` 
  \n             Name = ${name}                                                         
  \n             Vechicle Type = ${wheeler}
  \n             Date = ${date}
  \n             Address = ${address}                        
  \n             Created By = ${createdBy}
  \n             License Number = ${License}                     
  \n             Vechicle Number = ${vehicle}
  \n             Offence = ${offence}
  \n             challan = ${challan}
  \n             Submit Date = ${submitDate}
  \n             Signature = `;

  const printdata = () => {
    var doc = new jsPDF('p', 'pt');
    doc.text(20, 15, textvalue);
    doc.save(`${name}challan.pdf`);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deletechallan = async (deleteLicense) => {
    try {
      const deletedata = await Axios.get(`/challan/delete/${deleteLicense}`);
      console.log(deletedata.data);

      window.location.href = '/traffic';
      toast('delete the challan is successful');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const editInput = async (editLicense) => {
    console.log(editLicense);
    try {
      const { data } = await Axios.get(`/challan/${editLicense}`);
      if (data.License === editLicense) {
        SetEditing(true);
        SetName(data.name);
        Setaddress(data.address);
        SetLicense(data.License);
        setvehicle(data.vehicle);
      }
      toast('please edit challan from input');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const editchallan = async () => {
    try {
      const { data } = await Axios.put(`/challan/update/${License}`, {
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
      window.location.href = '/traffic';
      console.log(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const challandata = async () => {
    if (
      offence === 'No Helmet/Seat-belts' ||
      offence === 'Overload' ||
      offence === 'Reckless driving'
    ) {
      SetChallan(500);
    } else if (
      offence === 'Drink and Drive' ||
      offence === 'Random Parking' ||
      offence === 'No License' ||
      offence === 'Accidents'
    ) {
      SetChallan(1000);
    } else if (
      offence === 'Wrong Lane' ||
      offence === 'Over Speeding' ||
      offence === 'Lights off during night time' ||
      offence === 'Not Obeying traffic signs'
    ) {
      SetChallan(1500);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
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
      const answer = window.confirm('Do you want to print the challan or not');
      if (answer) {
        printdata();
        window.location.href = '/traffic';
      } else {
        window.location.href = '/traffic';
      }

      console.log(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div>
      <div className="row">
        <Container className="col-sm">
          <Form onSubmit={submitHandler}>
            <h2 className="d-flex justify-content-center mb-4">Echallan</h2>
            <div className="row d-flex justify-content-center">
              <div className="col-md-auto">
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={editing ? '' : 'Enter Name'}
                    onChange={(e) => SetName(e.target.value)}
                    value={name}
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
                    placeholder={editing ? '' : 'Enter Address'}
                    onChange={(e) => Setaddress(e.target.value)}
                    value={address}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLicense">
                  <Form.Label>License Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={editing ? '' : 'Enter License No'}
                    onChange={(e) => SetLicense(e.target.value)}
                    value={License}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formVehicleNo">
                  <Form.Label>Vehicle Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={editing ? '' : 'Enter Vehicle No'}
                    onChange={(e) => setvehicle(e.target.value)}
                    value={vehicle}
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
                    onClick={challandata}
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
                    <option
                      value="Lights off during night time"
                      className="1500"
                    >
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
                  {editing ? (
                    <div>
                      {' '}
                      <Button variant="primary" onClick={editchallan}>
                        Update
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      {' '}
                      <Button variant="primary mx-3" type="submit">
                        Submit
                      </Button>
                    </div>
                  )}
                  <Button variant="primary mx-3" onClick={printdata}>
                    Print
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Container>
        <Container className="col-sm ">
          <textarea
            className="textpdf"
            name="w3review"
            rows="25"
            cols="80"
            value={textvalue}
            disabled
          ></textarea>
        </Container>
      </div>
      <Container className="my-5">
        {loading ? (
          <div>Loading challans....</div>
        ) : error ? (
          <div> Error: {error}</div>
        ) : (
          <Container>
            <h3 className="d-flex justify-content-center my-3">
              Challan table
            </h3>
            <Scrollbars className="scroll" style={{ width: 1300, height: 200 }}>
              <Table
                striped
                bordered
                hover
                className="table-fixed"
                size="sm"
                responsive
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>License</th>
                    <th>Vehicle</th>
                    <th>Type of Vehicle</th>
                    <th>Created by</th>
                    <th>Offence</th>
                    <th>Submit Date</th>
                    <th>challan</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.License}>
                      <td>{user.name}</td>
                      <td>{user.date}</td>
                      <td>{user.address}</td>
                      <td>{user.License}</td>
                      <td>{user.vehicle}</td>
                      <td>{user.wheeler}</td>
                      <td>{user.createdBy}</td>
                      <td>{user.offence}</td>
                      <td>{user.submitDate}</td>
                      <td>{user.challan}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="primary mx-2 tablebutton"
                            onClick={() => editInput(user.License)}
                          >
                            edit
                          </Button>
                          <Button
                            variant="primary mx-2 tablebutton"
                            onClick={() => deletechallan(user.License)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Scrollbars>
          </Container>
        )}
      </Container>
    </div>
  );
}

export default TrafficScreen;

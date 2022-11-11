import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { GLOBALS } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import ModalView from '../components/UI/ModalView';

export default function Signup() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [record, setRecord] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: '',
    address: '',
  });

  const checkInputs = () => {
    if (record.name.length < 3) {
      setModalTitle('Invalid Name');
      setModalBody('Name must be at least 3 characters long');
      setShowModal(true);
      return false;
    }
    if (record.email.length < 5) {
      setModalTitle('Invalid Email');
      setModalBody('Email must be at least 5 characters long');
      setShowModal(true);
      return false;
    }
    if (!record.email.includes('@') || !record.email.endsWith('.com')) {
      setModalTitle('Invalid Email');
      setModalBody('Email must contain @ and end with .com');
      setShowModal(true);
      return false;
    }
    if (record.password.length < 6) {
      setModalTitle('Invalid Password');
      setModalBody('Password must be at least 6 characters long');
      setShowModal(true);
      return false;
    }
    if (record.password !== record.confirmPassword) {
      setModalTitle('Invalid Password');
      setModalBody('Password and Confirm Password must be same');
      setShowModal(true);
      return false;
    }
    if (record.contact.length < 11) {
      setModalTitle('Invalid Contact');
      setModalBody('Contact Number must be at least 11 characters long');
      setShowModal(true);
      return false;
    }
    if (record.address.length < 10) {
      setModalTitle('Invalid Address');
      setModalBody('Address must be at least 10 characters long');
      setShowModal(true);
      return false;
    }
    return true;
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkInputs()) {
      try {
        const response = await axios.post(
          `${GLOBALS.BASE_URL}/hospitals/signup`,
          record
        );
        if (response.data.status !== '201') {
          setModalTitle('Signup Failed');
          setModalBody(response.data.message);
          setShowModal(true);
        } else {
          navigate('/');
        }
      } catch (err) {
        setModalTitle('Signup Failed');
        setModalBody(err.message);
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Container className='d-flex align-items-center justify-content-center my-3'>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <h2 className='text-center mb-4'>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={record.name}
                onChange={(e) => handleChange(e)}
                placeholder=''
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={record.email}
                onChange={(e) => handleChange(e)}
                placeholder=''
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={record.password}
                onChange={(e) => handleChange(e)}
                placeholder=''
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name='confirmPassword'
                value={record.confirmPassword}
                onChange={(e) => handleChange(e)}
                placeholder=''
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicCheckbox'>
              <Form.Check
                type='checkbox'
                onChange={() => setShowPassword(!showPassword)}
                label='Show Password'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='contact'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='tel'
                placeholder=''
                name='contact'
                value={record.contact}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as='textarea'
                style={{ height: '100px' }}
                name='address'
                value={record.address}
                onChange={(e) => handleChange(e)}
                placeholder=''
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </Container>
      <ModalView
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle={modalTitle}
        modalBody={modalBody}
      />
    </>
  );
}

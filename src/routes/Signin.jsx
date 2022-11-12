import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { GLOBALS } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setHospital } from '../redux/hospital';
import ModalView from '../components/UI/ModalView';
import LabeledInput from '../components/UI/LabeledInput';
import { toast } from 'react-toastify';

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [record, setRecord] = useState({
    email: '',
    password: '',
  });

  const checkInputs = () => {
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
          `${GLOBALS.BASE_URL}/hospitals/signin`,
          record
        );
        if (response.data.status === '200') {
          dispatch(setHospital(response.data?.hospital));
          navigate('/home');
          toast.success(`Signed in as ${record.email}`);
        } else {
          toast.warning(response.data.message);
        }
      } catch (err) {
        toast.warning(err.message);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Container className='d-flex align-items-center justify-content-center my-3'>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <h2 className='text-center mb-4'>Sign In</h2>
          <Form onSubmit={handleSubmit}>
            <LabeledInput
              className='mb-3'
              controlId='email'
              label='Email address'
              type='email'
              name='email'
              value={record.email}
              onChange={(e) => handleChange(e)}
              placeholder=''
            />
            <LabeledInput
              className='mb-3'
              controlId='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={record.password}
              onChange={(e) => handleChange(e)}
              placeholder=''
            />
            <Form.Group className='mb-3' controlId='formBasicCheckbox'>
              <Form.Check
                type='checkbox'
                onChange={() => setShowPassword(!showPassword)}
                label='Show Password'
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

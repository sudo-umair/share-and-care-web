import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { GLOBALS } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import ModalView from '../components/UI/ModalView';
import LabeledInput from '../components/UI/LabeledInput';
import { toast } from 'react-toastify';
import ButtonView from '../components/UI/ButtonView';

export default function Signup() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [record, setRecord] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    website: '',
    address: '',
  });

  const checkInputs = () => {
    if (record.name.trim().length < 4) {
      setModalTitle('Invalid Name');
      setModalBody('Name must be at least 4 characters long');
      return false;
    }
    if (record.email.trim().length < 9) {
      setModalTitle('Invalid Email');
      setModalBody('Email must be at least 9 characters long');
      return false;
    }
    if (!record.email.includes('@') || !record.email.endsWith('.com')) {
      setModalTitle('Invalid Email');
      setModalBody('Email must contain @ and end with .com');
      return false;
    }
    if (record.password.trim().length < 6) {
      setModalTitle('Invalid Password');
      setModalBody('Password must be at least 6 characters long');
      return false;
    }
    if (record.password !== record.confirmPassword) {
      setModalTitle('Invalid Password');
      setModalBody('Password and Confirm Password must be same');
      return false;
    }
    if (record.phone.trim().length < 10) {
      setModalTitle('Invalid Phone Number');
      setModalBody('Phone Number must be at least 10 characters long');
      return false;
    }
    if (record.address.trim().length < 10) {
      setModalTitle('Invalid Address');
      setModalBody('Address must be at least 10 characters long');
      return false;
    }
    if (record.website !== '') {
      if (record.website.trim().length < 7) {
        setModalTitle('Invalid Website');
        setModalBody('Website must be at least 7 characters long');
        return false;
      }

      if (!record.website.startsWith('www.')) {
        setModalTitle('Invalid Website');
        setModalBody('Website must start with www');
        return false;
      }

      if (
        !(record.website.endsWith('.com') || record.website.endsWith('.org'))
      ) {
        setModalTitle('Invalid Website');
        setModalBody('Website must end with .com or .org');
        return false;
      }
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
        setIsLoading(true);
        const response = await axios.post(
          `${GLOBALS.BASE_URL}/hospitals/signup`,
          record
        );
        setIsLoading(false);
        if (response.data.status === '201') {
          toast.success('Signup Successful');
          navigate('/sign-in');
        } else {
          toast.error(response.data.message);
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
          <h2 className='text-center mb-4'>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <LabeledInput
              label='Hospital Name *'
              controlId={'name'}
              type='text'
              name='name'
              value={record.name}
              onChange={handleChange}
              required
              minLength={4}
              className={'mb-3'}
            />
            <LabeledInput
              label='Email Address *'
              controlId={'email'}
              className='mb-3'
              type='email'
              name='email'
              value={record.email}
              onChange={handleChange}
              required
              minLength={9}
              placeholder='abc@xyz.com'
              bottomText={'We will never share your email with anyone else.'}
            />
            <LabeledInput
              className='mb-3'
              controlId='password'
              label='Password *'
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={record.password}
              onChange={(e) => handleChange(e)}
              required
              minLength={6}
            />
            <LabeledInput
              className='mb-3'
              controlId='confirmPassword'
              label='Confirm Password *'
              type={showPassword ? 'text' : 'password'}
              name='confirmPassword'
              value={record.confirmPassword}
              onChange={(e) => handleChange(e)}
              required
              minLength={6}
            />
            <Form.Group className='mb-3' controlId='showPassword'>
              <Form.Check
                type='checkbox'
                onChange={() => setShowPassword(!showPassword)}
                label='Show Password'
                style={{
                  fontSize: '0.9rem',
                }}
              />
            </Form.Group>
            <LabeledInput
              className='mb-3'
              controlId='phone'
              label='Phone Number *'
              type='tel'
              name='phone'
              value={record.phone}
              onChange={(e) => handleChange(e)}
              required
              minLength={10}
              maxLength={11}
            />
            <LabeledInput
              className='mb-3'
              controlId='website'
              label='Website'
              type='text'
              placeholder='www.example.com (optional)'
              name='website'
              value={record.website}
              onChange={(e) => handleChange(e)}
              minLength={7}
            />
            <LabeledInput
              className='mb-3'
              controlId='address'
              label='Address *'
              as='textarea'
              style={{ height: '100px' }}
              name='address'
              value={record.address}
              onChange={(e) => handleChange(e)}
              placeholder=''
              required
              minLength={10}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ButtonView variant='primary' isLoading={isLoading} type='submit'>
                Submit
              </ButtonView>
            </div>
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

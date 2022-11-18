import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GLOBALS } from '../utils/constants';
import ModalView from '../components/UI/ModalView';
import { useSelector, useDispatch } from 'react-redux';
import { setHospital } from '../redux/hospital';
import LabeledInput from '../components/UI/LabeledInput';
import { toast } from 'react-toastify';
import ButtonView from '../components/UI/ButtonView';

export default function UpdateAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hospital = useSelector((state) => state.hospital);
  const { name, email, phone, address, token } = hospital;

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [record, setRecord] = useState({
    name,
    email,
    phone,
    address,
    token,
  });

  const [originalRecord, setOriginalRecord] = useState(record);

  const checkInputs = () => {
    if (record.name.trim().length < 4) {
      setModalTitle('Invalid Name');
      setModalBody('Name must be at least 4 characters long');
      setShowModal(true);
      return false;
    }
    if (record.email.trim().length < 9) {
      setModalTitle('Invalid Email');
      setModalBody('Email must be at least 9 characters long');
      setShowModal(true);
      return false;
    }
    if (!record.email.includes('@') || !record.email.endsWith('.com')) {
      setModalTitle('Invalid Email');
      setModalBody('Email must contain @ and end with .com');
      setShowModal(true);
      return false;
    }
    if (record.phone.trim().length < 10) {
      setModalTitle('Invalid Phone Number');
      setModalBody('Phone Number must be at least 10 characters long');
      setShowModal(true);
      return false;
    }
    if (record.address.trim().length < 10) {
      setModalTitle('Invalid Address');
      setModalBody('Address must be at least 10 characters long');
      setShowModal(true);
      return false;
    }
    return true;
  };

  const checkIfChanged = () => {
    if (
      record.name.trim() === originalRecord.name.trim() &&
      record.email.trim() === originalRecord.email.trim() &&
      record.phone.trim() === originalRecord.phone.trim() &&
      record.address.trim() === originalRecord.address.trim()
    ) {
      setModalTitle('No Changes Made');
      setModalBody('No changes were made to the account');
      setShowModal(true);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkInputs() && checkIfChanged()) {
      try {
        setIsLoading(true);
        const response = await axios.put(
          `${GLOBALS.BASE_URL}/hospitals/update-account`,
          record
        );
        setIsLoading(false);
        if (response.data.status !== '200') {
          setModalTitle('Account Update Failed');
          setModalBody(response.data.message);
          setShowModal(true);
        } else {
          toast.success('Account Updated');
          dispatch(setHospital(response.data?.hospital));
          navigate('/home');
        }
      } catch (err) {
        setModalTitle('Account Update Failed');
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
          <h2 className='text-center mb-4'>Update Account</h2>
          <Form onSubmit={handleSubmit}>
            <LabeledInput
              label='Hospital Name *'
              controlId='name'
              className='mb-3'
              name='name'
              value={record.name}
              onChange={handleChange}
              placeholder=''
              type='text'
              required
              minLength={4}
            />
            <LabeledInput
              label='Email'
              controlId='email'
              className='mb-3'
              name='email'
              value={record.email}
              onChange={handleChange}
              placeholder=''
              type='email'
              disabled={true}
              bottomText='Email address cannot be changed'
              required
              minLength={9}
            />

            <LabeledInput
              label='Phone Number *'
              controlId='phone'
              className='mb-3'
              name='phone'
              value={record.phone}
              onChange={handleChange}
              placeholder=''
              type='text'
              required
              minLength={10}
            />

            <LabeledInput
              label='Address *'
              controlId='address'
              className='mb-3'
              name='address'
              value={record.address}
              onChange={handleChange}
              placeholder=''
              type='text'
              as='textarea'
              style={{ height: '100px' }}
              required
              minLength={10}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ButtonView isLoading={isLoading} variant='primary' type='submit'>
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

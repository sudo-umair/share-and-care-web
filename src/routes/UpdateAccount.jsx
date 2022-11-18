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
  const { name, email, contact, address, token } = hospital;

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [record, setRecord] = useState({
    name,
    email,
    contact,
    address,
    token,
  });

  const [originalRecord, setOriginalRecord] = useState(record);

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
    if (record.contact.length < 11) {
      setModalTitle('Invalid Contact Number');
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

  const checkIfChanged = () => {
    if (
      record.name === originalRecord.name &&
      record.email === originalRecord.email &&
      record.contact === originalRecord.contact &&
      record.address === originalRecord.address
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
              label='Hospital Name'
              controlId='name'
              className='mb-3'
              name='name'
              value={record.name}
              onChange={handleChange}
              placeholder=''
              type='text'
              required
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
              bottomText='Once set Email cannot be changed'
              required
            />

            <LabeledInput
              label='Contact Number'
              controlId='contact'
              className='mb-3'
              name='contact'
              value={record.contact}
              onChange={handleChange}
              placeholder=''
              type='text'
              required
            />

            <LabeledInput
              label='Address'
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

import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { GLOBALS } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import ModalView from '../components/UI/ModalView';
import LabeledInput from '../components/UI/LabeledInput';
import { toast } from 'react-toastify';
import ButtonView from '../components/UI/ButtonView';
import { useSelector } from 'react-redux';

export default function VolunteerRequest() {
  const navigate = useNavigate();
  const { email, name, phone, address } = useSelector(
    (state) => state.hospital
  );

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [record, setRecord] = useState({
    userType: 'hospital',
    resourceName: '',
    resourceQuantity: '',
    resourceDuration: '',
    resourceNotes: '',
    requestedByName: name,
    requestedByEmail: email,
    requestedByPhone: phone,
    requestedByAddress: address,
  });

  const checkInputs = () => {
    if (record.resourceName.trim().length < 3) {
      setModalTitle('Invalid Resource Name');
      setModalBody('Resource Name must be at least 3 characters long');
      setShowModal(true);
      return false;
    }
    if (record.resourceQuantity.trim().length < 1) {
      setModalTitle('Invalid Resource Quantity');
      setModalBody('Resource Quantity must be at least 1 characters long');
      setShowModal(true);
      return false;
    }
    if (record.resourceDuration.trim().length < 1) {
      setModalTitle('Invalid Resource Duration');
      setModalBody('Resource Duration must be at least 1 characters long');
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
    if (checkInputs()) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `${GLOBALS.BASE_URL}/resources/postRequest`,
          record
        );
        setIsLoading(false);
        if (response.data.status === '201') {
          toast.success('Request Posted Successfully');
          navigate('/resources');
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
          <h2 className='text-center mb-4'>New Resource Request</h2>
          <Form onSubmit={handleSubmit}>
            <LabeledInput
              label='Name *'
              controlId={'resourceName'}
              type='text'
              name='resourceName'
              value={record.resourceName}
              onChange={handleChange}
              required
              className={'mb-3'}
              minLength={3}
              placeholder='Blood Bags'
              bottomText={'Use one form for each resource'}
            />
            <LabeledInput
              label='Quantity *'
              controlId={'resourceQuantity'}
              className='mb-3'
              type='text'
              name='resourceQuantity'
              value={record.resourceQuantity}
              onChange={handleChange}
              required
              placeholder='10'
              minLength={1}
            />
            <LabeledInput
              label='Duration *'
              className='mb-3'
              controlId='resourceDuration'
              type='text'
              name='resourceDuration'
              value={record.resourceDuration}
              onChange={(e) => handleChange(e)}
              placeholder='3 days'
              required
              minLength={3}
            />
            <LabeledInput
              className={'mb-3'}
              controlId='resourceNotes'
              label='Additional Notes'
              type='text-area'
              as='textarea'
              style={{ height: '100px' }}
              name='resourceNotes'
              value={record.resourceNotes}
              onChange={(e) => handleChange(e)}
              placeholder=''
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

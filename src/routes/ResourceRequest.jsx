import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { GLOBALS } from '../utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
import ModalView from '../components/UI/ModalView';
import LabeledInput from '../components/UI/LabeledInput';
import { toast } from 'react-toastify';
import ButtonView from '../components/UI/ButtonView';
import { useSelector } from 'react-redux';

export default function ResourceRequest() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { email, name, phone, address } = useSelector(
    (state) => state.hospital
  );

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [originalRecord, setOriginalRecord] = useState({});

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

  useEffect(() => {
    if (id) {
      const fetchResource = async () => {
        try {
          const response = await axios.post(
            `${GLOBALS.BASE_URL}/resources/fetchOneRequest/${id}`
          );
          if (response.data.status === '200') {
            setRecord(response.data.result);
            setOriginalRecord(response.data.result);
            console.log(response.data.result);
          } else {
            toast.error(response.data.message);
          }
        } catch (err) {
          toast.error(err.message);
        }
      };
      fetchResource();
    }
  }, [id]);

  const checkInputs = () => {
    if (record.resourceName.trim().length < 3) {
      setModalTitle('Invalid Resource Name');
      setModalBody('Resource Name must be at least 3 characters long');
      return false;
    }
    if (record.resourceQuantity.trim().length < 1) {
      setModalTitle('Invalid Resource Quantity');
      setModalBody('Resource Quantity must be at least 1 characters long');
      return false;
    }
    if (record.resourceDuration.trim().length < 1) {
      setModalTitle('Invalid Resource Duration');
      setModalBody('Resource Duration must be at least 1 characters long');
      return false;
    }
    return true;
  };

  const checkIfChanged = () => {
    if (
      record.resourceName === originalRecord.resourceName &&
      record.resourceQuantity === originalRecord.resourceQuantity &&
      record.resourceDuration === originalRecord.resourceDuration &&
      record.resourceNotes === originalRecord.resourceNotes
    ) {
      setModalTitle('No Changes');
      setModalBody('No changes were made to the resource request');
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
          toast.success(response.data.message);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (checkInputs() && checkIfChanged()) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `${GLOBALS.BASE_URL}/resources/updateRequest`,
          { id, ...record }
        );
        setIsLoading(false);
        if (response.data.status === '200') {
          toast.success(response.data.message);
          navigate('/resources');
        } else {
          if (response.data.status === '409') {
            navigate('/resources');
          }
          toast.warning(response.data.message);
        }
      } catch (err) {
        console.log(err);
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
          <h2 className='text-center mb-4'>
            {id ? 'Update' : 'New'} Resource Request
          </h2>
          <Form onSubmit={id ? handleUpdate : handleSubmit}>
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
            <Row>
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
                containerAs={Col}
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
                containerAs={Col}
              />
            </Row>

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
              maxLength={200}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ButtonView variant='primary' isLoading={isLoading} type='submit'>
                {id ? 'Update Request' : 'Submit'}
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

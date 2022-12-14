import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { GLOBALS } from '../utils/constants';
import { useNavigate, useParams } from 'react-router-dom';
import ModalView from '../components/UI/ModalView';
import LabeledInput from '../components/UI/LabeledInput';
import { toast } from 'react-toastify';
import ButtonView from '../components/UI/ButtonView';
import { useSelector } from 'react-redux';

export default function VolunteerRequest() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { email, name, phone, address } = useSelector(
    (state) => state.hospital
  );

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [record, setRecord] = useState({
    hospitalName: name,
    hospitalEmail: email,
    hospitalPhone: phone,
    hospitalLocation: address,
    volunteerRequestTitle: '',
    timeDuration: '',
    volunteersRequired: '',
    volunteerRequestDescription: '',
  });

  const [originalRecord, setOriginalRecord] = useState({});

  useEffect(() => {
    if (id) {
      const fetchResource = async () => {
        try {
          const response = await axios.post(
            `${GLOBALS.BASE_URL}/volunteers/fetchOneRequest/${id}`
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
    if (record.volunteerRequestTitle.trim().length < 5) {
      setModalTitle('Invalid Title');
      setModalBody('Please enter a valid title');
      return false;
    }

    if (record.timeDuration.trim().length < 5) {
      setModalTitle('Invalid Time Duration');
      setModalBody('Please enter a valid time duration');
      return false;
    }

    if (record.volunteersRequired.trim().length < 1) {
      setModalTitle('Invalid Volunteers Required');
      setModalBody('Please enter the number of volunteers required');
      return false;
    }

    if (record.volunteerRequestDescription.trim().length < 10) {
      setModalTitle('Invalid Description');
      setModalBody('Please enter a valid description');
      return false;
    }
    return true;
  };

  const checkIfChanged = () => {
    if (
      record.volunteerRequestTitle === originalRecord.volunteerRequestTitle &&
      record.timeDuration === originalRecord.timeDuration &&
      record.volunteersRequired === originalRecord.volunteersRequired &&
      record.volunteerRequestDescription ===
        originalRecord.volunteerRequestDescription
    ) {
      setModalTitle('No Changes');
      setModalBody('No changes were made to the volunteer request');
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
          `${GLOBALS.BASE_URL}/volunteers/createVolunteerRequest`,
          record
        );
        setIsLoading(false);
        if (response.data.status === '200') {
          toast.success('Request Posted Successfully');
          navigate('/volunteers');
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
          `${GLOBALS.BASE_URL}/volunteers/updateRequest`,
          { id, ...record }
        );
        setIsLoading(false);
        if (response.data.status === '200') {
          toast.success(response.data.message);
          navigate('/volunteers');
        } else {
          if (response.data.status === '409') {
            navigate('/volunteers');
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
            {id ? 'Update' : 'New'} Volunteers Request
          </h2>
          <Form onSubmit={id ? handleUpdate : handleSubmit}>
            <LabeledInput
              label='Title *'
              controlId={'volunteerRequestTitle'}
              type='text'
              name='volunteerRequestTitle'
              value={record.volunteerRequestTitle}
              onChange={handleChange}
              required
              className={'mb-3'}
              minLength={5}
              placeholder='Need Volunteers Immediately'
            />
            <LabeledInput
              label='Volunteers Required *'
              controlId={'volunteersRequired'}
              className='mb-3'
              type='text'
              name='volunteersRequired'
              value={record.volunteersRequired}
              onChange={handleChange}
              required
              placeholder='10'
              minLength={1}
            />
            <LabeledInput
              label='Duration *'
              className='mb-3'
              controlId='timeDuration'
              type='text'
              name='timeDuration'
              value={record.timeDuration}
              onChange={(e) => handleChange(e)}
              placeholder='15 days'
              required
              minLength={5}
            />
            <LabeledInput
              className={'mb-3'}
              controlId='volunteerRequestDescription'
              label='Description *'
              type='text-area'
              as='textarea'
              style={{ height: '100px' }}
              name='volunteerRequestDescription'
              value={record.volunteerRequestDescription}
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

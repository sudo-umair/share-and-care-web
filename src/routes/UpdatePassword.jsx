import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { GLOBALS } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import ModalView from '../components/UI/ModalView';
import LabeledInput from '../components/UI/LabeledInput';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import ButtonView from '../components/UI/ButtonView';

export default function UpdatePassword() {
  const navigate = useNavigate();

  const { email, token } = useSelector((state) => state.hospital);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [record, setRecord] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const checkInputs = () => {
    if (record.password.trim().length < 6) {
      setModalTitle('Invalid Password');
      setModalBody('Password must be at least 6 characters long');
      setShowModal(true);
      return false;
    }

    if (record.newPassword.trim().length < 6) {
      setModalTitle('Invalid New Password');
      setModalBody('New Password must be at least 6 characters long');
      setShowModal(true);
      return false;
    }

    if (record.password === record.newPassword) {
      setModalTitle('Invalid New Password');
      setModalBody('New Password must be different from the old one');
      setShowModal(true);
      return false;
    }

    if (record.newPassword !== record.confirmNewPassword) {
      setModalTitle('Invalid Password');
      setModalBody('New Password and Confirm New Password must be same');
      setShowModal(true);
      return false;
    }

    return true;
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkInputs()) {
      try {
        setIsLoading(true);
        const response = await axios.put(
          `${GLOBALS.BASE_URL}/hospitals/update-password`,
          { ...record, email, token }
        );
        setIsLoading(false);
        if (response.data.status === '200') {
          toast.success('Password Updated');
          navigate('/');
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
          <h2 className='text-center'>Update Password</h2>
          <p className='text-center mb-4'>{email}</p>
          <Form onSubmit={handleSubmit}>
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
              controlId='newPassword'
              label='New Password *'
              type={showPassword ? 'text' : 'password'}
              name='newPassword'
              value={record.newPassword}
              onChange={(e) => handleChange(e)}
              required
              minLength={6}
            />
            <LabeledInput
              className='mb-3'
              controlId='confirmNewPassword'
              label='Confirm New Password *'
              type={showPassword ? 'text' : 'password'}
              name='confirmNewPassword'
              value={record.confirmNewPassword}
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

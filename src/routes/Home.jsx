import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AccountInfo from '../components/Home/AccountInfo';
import RequestsCount from '../components/Home/RequestsCount';
import axios from 'axios';
import { GLOBALS } from '../utils/constants';

export default function Home() {
  const [hospitalRecord, setHospitalRecord] = useState({});
  const [loading, setLoading] = useState(true);

  const { name, email, contact, address } = useSelector(
    (state) => state.hospital
  );

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${GLOBALS.BASE_URL}/hospitals/requests-count`, { email })
      .then((res) => {
        setHospitalRecord(res.data.hospitalRecord);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email]);

  return (
    <Container className='p-3 my-3'>
      <h3 className='header'>Welcome, {name}</h3>
      <div
        className='my-3'
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <RequestsCount hospitalRecord={hospitalRecord} isLoading={loading} />
        <AccountInfo
          name={name}
          email={email}
          contact={contact}
          address={address}
        />
      </div>
    </Container>
  );
}

import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AccountInfo({ name, email, contact, address }) {
  return (
    <Card style={{ width: '35%', height: 'fit-content' }}>
      <Card.Header
        style={{
          textAlign: 'center',
        }}
      >
        {name}
      </Card.Header>
      <Table
        style={{
          marginBottom: 0,
        }}
      >
        <tbody>
          <tr>
            <td>Email</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>{contact}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>{address}</td>
          </tr>
        </tbody>
      </Table>
      <Card.Footer
        style={{
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <Link to='/update-account'> Update Account </Link>
      </Card.Footer>
    </Card>
  );
}

import React, { useState } from 'react';
import ButtonView from '../UI/ButtonView';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GLOBALS } from '../../utils/constants';

export default function RightPane({ activeResource, hospital, setRefresh }) {
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);

  const handleApproveRequest = async () => {
    if (activeResource.requestedByEmail === hospital.email) {
      toast.error('You cannot approve your own request');
    } else {
      const record = {
        id: activeResource._id,
        requestStatus: 'Approved',
        approvedByName: hospital.name,
        approvedByEmail: hospital.email,
        approvedByPhone: hospital.phone,
      };
      setIsLoading1(true);
      await axios
        .put(`${GLOBALS.BASE_URL}/resources/approveRequest`, record)
        .then((response) => {
          if (response.data.status === '200') {
            toast.success(response.data.message);
          } else {
            toast.warning(response.data.message);
          }
        })
        .catch((error) => {
          toast.warning('Error approving request');
        })
        .finally(() => {
          setIsLoading1(false);
          setRefresh((prev) => !prev);
        });
    }
  };

  const handleHideRequest = async () => {
    if (activeResource.requestedByEmail === hospital.email) {
      toast.error('You cannot hide your own request');
    } else {
      const record = {
        id: activeResource._id,
        email: hospital.email,
      };
      setIsLoading2(true);
      await axios
        .put(`${GLOBALS.BASE_URL}/resources/hideRequest`, record)
        .then((response) => {
          if (response.data.status === '200') {
            toast.success(response.data.message);
          } else {
            toast.warning(response.data.message);
          }
        })
        .catch((error) => {
          toast.warning('Error hiding request');
        })
        .finally(() => {
          setIsLoading2(false);
          setRefresh((prev) => !prev);
        });
    }
  };

  const handleDeleteRequest = async () => {
    if (activeResource.requestedByEmail !== hospital.email) {
      toast.error("You cannot delete someone else's request");
    } else {
      const record = {
        id: activeResource._id,
        email: hospital.email,
      };
      setIsLoading3(true);
      await axios
        .post(`${GLOBALS.BASE_URL}/resources/deleteRequest`, record)
        .then((response) => {
          if (response.data.status === '200') {
            toast.success(response.data.message);
          } else {
            toast.warning(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.warning('Error deleting request');
        })
        .finally(() => {
          setIsLoading3(false);
          setRefresh((prev) => !prev);
        });
    }
  };

  if (JSON.stringify(activeResource) === '{}') {
    return null;
  }

  return (
    <div
      style={{
        width: '70%',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '0.8rem',
      }}
      id='right-pane'
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h4>{activeResource.resourceName}</h4>
        <p style={{ ...STYLES.text, marginBottom: '0.5rem' }}>
          Request Status:
          <span
            style={{
              color:
                activeResource.requestStatus === 'Pending' ? 'black' : 'white',
              backgroundColor:
                activeResource.requestStatus === 'Pending' ? 'yellow' : 'green',
              marginLeft: '0.5rem',
              padding: '0.2rem 0.5rem',
              borderRadius: '0.4rem',
            }}
          >
            {activeResource.requestStatus}
          </span>
        </p>

        <p
          style={{
            ...STYLES.text,
            marginRight: '5rem',
          }}
        >
          Quantity: {activeResource.resourceQuantity}
        </p>
        <p style={STYLES.text}>Duration: {activeResource.resourceDuration}</p>

        <p style={STYLES.text}>
          Additional Notes:{' '}
          {activeResource.resourceNotes.trim() === ''
            ? 'None'
            : activeResource.resourceNotes}
        </p>
        <hr />
      </div>

      {activeResource.requestedByEmail !== hospital.email && (
        <div style={{}}>
          <h4>Requested By</h4>
          <p style={STYLES.text}></p>
          <p style={STYLES.text}>Name: {activeResource.requestedByName}</p>
          <p style={STYLES.text}>Email: {activeResource.requestedByEmail}</p>
          <p style={STYLES.text}>Phone: {activeResource.requestedByPhone}</p>
          <p style={STYLES.text}>
            Address: {activeResource.requestedByAddress}
          </p>
          <hr />
        </div>
      )}

      {activeResource.requestStatus === 'Approved' &&
        activeResource.approvedByEmail !== hospital.email && (
          <div style={{}}>
            <h4>Approved By</h4>
            <p style={STYLES.text}>Name: {activeResource.approvedByName}</p>
            <p style={STYLES.text}>Email: {activeResource.approvedByEmail}</p>
            <p style={STYLES.text}>Phone: {activeResource.approvedByPhone}</p>
            <hr />
          </div>
        )}

      <div
        id='buttons-row'
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '60%',
          alignSelf: 'center',
        }}
      >
        {activeResource.requestStatus === 'Pending' &&
          activeResource.requestedByEmail !== hospital.email && (
            <>
              <ButtonView
                type='button'
                variant='primary'
                isLoading={isLoading1}
                onClick={handleApproveRequest}
              >
                Approve Request
              </ButtonView>
              <ButtonView
                type='button'
                variant='secondary'
                isLoading={isLoading2}
                onClick={handleHideRequest}
              >
                Hide Request
              </ButtonView>
            </>
          )}

        {activeResource.requestStatus === 'Pending' &&
          activeResource.requestedByEmail === hospital.email && (
            <ButtonView
              type='button'
              variant='danger'
              isLoading={isLoading3}
              onClick={handleDeleteRequest}
            >
              Delete Request
            </ButtonView>
          )}
      </div>
    </div>
  );
}

const STYLES = {
  text: {
    padding: '0rem',
    margin: '0rem',
  },
};

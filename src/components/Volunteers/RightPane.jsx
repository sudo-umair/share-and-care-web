import React, { useState } from 'react';
import ButtonView from '../UI/ButtonView';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GLOBALS } from '../../utils/constants';
import Applicants from './Applicants';
import ModalView from '../UI/ModalView';

export default function RightPane({ activeVolunteer, setRefresh }) {
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleUpdateRequest = async (requestStatus) => {
    setIsLoading1(true);
    await axios
      .post(`${GLOBALS.BASE_URL}/volunteers/updateVolunteerRequest`, {
        volunteerRequestId: activeVolunteer._id,
        requestStatus,
      })
      .then((response) => {
        if (response.data.status === '200') {
          toast.success(response.data.message);
        } else {
          toast.warning(response.data.message);
        }
      })
      .catch((error) => {
        toast.warning('Error updating request');
      })
      .finally(() => {
        setIsLoading1(false);
        setRefresh((prev) => !prev);
      });
  };

  const handleDeleteRequest = async () => {
    setIsLoading2(true);
    await axios
      .post(`${GLOBALS.BASE_URL}/volunteers/deleteVolunteerRequest`, {
        volunteerRequestId: activeVolunteer._id,
      })
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
        setIsLoading2(false);
        setRefresh((prev) => !prev);
      });
  };

  if (JSON.stringify(activeVolunteer) === '{}') {
    return null;
  }

  return (
    <>
      <div
        style={{
          width: '70%',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '0.8rem',
          overflowY: 'scroll',
        }}
        id='right-pane'
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h4>{activeVolunteer.volunteerRequestTitle}</h4>
          <p style={{ ...STYLES.text, marginBottom: '0.5rem' }}>
            Request Status:
            <span
              style={{
                color:
                  activeVolunteer.requestStatus === 'Enabled'
                    ? 'white'
                    : 'black',
                backgroundColor:
                  activeVolunteer.requestStatus === 'Enabled'
                    ? 'green'
                    : 'yellow',
                marginLeft: '0.5rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '0.4rem',
              }}
            >
              {activeVolunteer.requestStatus}
            </span>
          </p>

          <p
            style={{
              ...STYLES.text,
              marginRight: '5rem',
            }}
          >
            Volunteers Required: {activeVolunteer.volunteersRequired}
          </p>
          <p style={STYLES.text}>
            Applicants: {activeVolunteer.applicants.length}
          </p>
          <p style={STYLES.text}>Duration: {activeVolunteer.timeDuration}</p>

          <p style={STYLES.text}>
            Description: {activeVolunteer.volunteerRequestDescription}
          </p>
          <hr />
        </div>

        <div
          id='buttons-row'
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '60%',
            alignSelf: 'center',
          }}
        >
          <ButtonView
            type='button'
            variant={
              activeVolunteer.requestStatus === 'Enabled'
                ? 'warning'
                : 'success'
            }
            isLoading={isLoading1}
            onClick={
              activeVolunteer.requestStatus === 'Enabled'
                ? () => handleUpdateRequest('Disabled')
                : () => handleUpdateRequest('Enabled')
            }
          >
            {activeVolunteer.requestStatus === 'Enabled'
              ? 'Disable Request'
              : 'Enable Request'}
          </ButtonView>
          <ButtonView
            type='button'
            variant='danger'
            isLoading={isLoading2}
            onClick={() => setShowModal(true)}
          >
            Delete Request
          </ButtonView>
        </div>
        <hr />
        <h4
          style={{
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          Applicants
        </h4>
        <Applicants
          applicants={activeVolunteer.applicants}
          setRefresh={setRefresh}
          volunteerRequestId={activeVolunteer._id}
        />
        <hr />
      </div>
      <ModalView
        showModal={showModal}
        setShowModal={setShowModal}
        modalTitle='Delete Volunteer Request'
        modalBody='Are you sure you want to delete this volunteer request?'
        action2Text='Delete Request'
        action2Color='danger'
        action2Function={handleDeleteRequest}
        isLoading={isLoading2}
      />
    </>
  );
}

const STYLES = {
  text: {
    padding: '0rem',
    margin: '0rem',
  },
};

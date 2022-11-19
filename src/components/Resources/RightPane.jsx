import React from 'react';
import ButtonView from '../UI/ButtonView';

export default function RightPane({ activeResource, hospital }) {
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
        <p style={STYLES.text}>
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
                onClick={() => {
                  console.log('Ignore');
                }}
              >
                Approve Request
              </ButtonView>
              <ButtonView
                type='button'
                variant='secondary'
                onClick={() => {
                  console.log('Ignore');
                }}
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
              onClick={() => {
                console.log('Ignore');
              }}
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

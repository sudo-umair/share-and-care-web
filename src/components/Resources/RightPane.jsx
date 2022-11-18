import React from 'react';

export default function RightPane({ activeResource }) {
  return (
    <div
      style={{
        width: '70%',
        height: '80vh',
        overflowY: 'scroll',
      }}
      id='right-pane'
    >
      <p>{activeResource.resourceName}</p>
    </div>
  );
}

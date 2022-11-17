import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

export default function ButtonView({
  variant,
  type,
  onClick,
  children,
  isLoading,
  style,
}) {
  return (
    <Button
      size='sm'
      style={style}
      onClick={onClick}
      variant={variant}
      type={type}
    >
      {children}
      {isLoading && (
        <Spinner
          as='span'
          animation='border'
          size='sm'
          role='status'
          aria-hidden='true'
          variant='light'
          style={{ marginLeft: '5px' }}
        />
      )}
    </Button>
  );
}

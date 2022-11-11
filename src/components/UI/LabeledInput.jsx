import React from 'react';
import { Form } from 'react-bootstrap';

export default function LabeledInput({
  className,
  type,
  controlId,
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  style,
  as,
  bottomText,
}) {
  return (
    <Form.Group className={className} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        style={style}
        as={as}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? ''}
        required={required ?? true}
        disabled={disabled ?? false}
      />
      {bottomText && <Form.Text className='text-muted'>{bottomText}</Form.Text>}
    </Form.Group>
  );
}

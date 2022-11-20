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
  containerStyle,
  as,
  bottomText,
  maxLength,
  minLength,
}) {
  return (
    <Form.Group
      className={className}
      style={containerStyle ?? {}}
      controlId={controlId}
    >
      <Form.Label
        style={{
          fontSize: '0.9rem',
          margin: 0,
        }}
        title={label.endsWith('*') ? 'This field is required' : label}
      >
        {label}
      </Form.Label>
      <Form.Control
        size='sm'
        style={style}
        as={as}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? ''}
        required={required ?? false}
        disabled={disabled ?? false}
        maxLength={maxLength ?? 100}
        minLength={minLength ?? 0}
        title={
          disabled
            ? 'This field is disabled'
            : label.endsWith('*')
            ? `Enter ${label.slice(0, -2)} here`
            : `Enter ${label} here`
        }
      />
      {bottomText && <Form.Text className='text-muted'>{bottomText}</Form.Text>}
    </Form.Group>
  );
}

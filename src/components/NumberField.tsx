import React from 'react';
import { useFormContext } from 'react-hook-form';
import { NumberFieldProps } from '../types';

function TextField(props: NumberFieldProps & { name: string }) {
  const { register } = useFormContext();
  const { label, name, placeholder } = props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="number"
        id={name}
        placeholder={placeholder}
        {...register(name)}
      />
    </div>
  );
}

export default TextField;

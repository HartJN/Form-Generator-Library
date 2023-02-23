import React from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import TextField from './components/TextField';
import { ArrayFieldProps, Field, FormProps, ObjectFieldProps } from './types';
import NumberField from './components/NumberField';

function ObjectField(props: ObjectFieldProps & { name: string }) {
  const { label, name, properties } = props;
  return (
    <div>
      <label>{label}</label>
      {Object.entries(properties).map(([fieldName, objectField]) => {
        return renderFields([`${name}.${fieldName}`, objectField]);
      })}
    </div>
  );
}

const appendDefaults = {
  text: '',
  number: 0,
  array: [],
  object: {},
};

function ArrayField(props: ArrayFieldProps & { name: string }) {
  const { label, name, itemField } = props;
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  function add() {
    append(appendDefaults[itemField.type]);
  }

  return (
    <div>
      <label>{label}</label>
      <button onClick={add} type="button">
        +
      </button>

      {fields.map((field, index) => {
        return (
          <div key={`ArrayField__${name}_${field.id}`}>
            {renderFields([`${name}[${index}]`, itemField])}
            <button onClick={() => remove(index)}>-</button>
          </div>
        );
      })}
    </div>
  );
}

function renderFields([name, fieldProps]: [string, Field]) {
  if (fieldProps.type === 'text') {
    return <TextField name={name} {...fieldProps} />;
  }
  if (fieldProps.type === 'number') {
    return <NumberField name={name} {...fieldProps} />;
  }
  if (fieldProps.type === 'object') {
    return <ObjectField name={name} {...fieldProps} />;
  }
  if (fieldProps.type === 'array') {
    return <ArrayField name={name} {...fieldProps} />;
  }

  return <div>Unknown type</div>;
}

export function Form({ fields, onSubmit }: FormProps) {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {Object.entries(fields).map(renderFields)}
        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
}

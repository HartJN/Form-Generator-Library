import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Form, FormProps } from '../src';

const meta: Meta = {
  title: 'Form',
  component: Form,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<FormProps> = args => <Form {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

const fields: FormProps['fields'] = {
  email: {
    type: 'text',
    label: 'Email',
  },

  count: {
    type: 'number',
    label: 'Count',
  },

  myArray: {
    type: 'array',
    label: 'Field in array',
    itemField: {
      type: 'text',
      label: 'Array text',
    },
  },

  myObj: {
    type: 'object',
    label: 'Object field',
    properties: {
      mySubObject: {
        type: 'text',
        label: 'First sub prop',
        htmlType: 'email',
      },
    },
  },

  kv: {
    type: 'array',
    label: 'Array with nested objects',

    itemField: {
      type: 'object',
      label: 'Header fielders',
      properties: {
        key: {
          type: 'text',
          label: 'key',
        },
        value: {
          type: 'text',
          label: 'Value',
        },
      },
    },
  },
};

Default.args = {
  fields,
  onSubmit: values => {
    console.log(values, 'values');
  },
};

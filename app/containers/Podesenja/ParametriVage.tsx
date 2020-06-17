import React from 'react';
import { useForm } from 'react-hook-form';
import ParametriVageScreen from '../../screens/Podesenja/ParametriVageScreen';

function ParametriVageContainer() {
  const { control, errors, handleSubmit, getValues } = useForm();
  return (
    <ParametriVageScreen
      getValues={getValues}
      handleSubmit={handleSubmit}
      errors={errors}
      control={control}
    />
  );
}

export default ParametriVageContainer;

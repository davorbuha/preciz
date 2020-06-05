import React from 'react';
import { Control, NestDataObject, FieldError } from 'react-hook-form';
import Vozilo from '../../types/Vozilo';

interface Props {
  vozila: Vozilo[];
  control: Control<Record<string, any>>;
  errors: NestDataObject<Record<string, any>, FieldError>;
}

function VoziloScreen(props: Props) {
  return (
    <div>
      <p>VoziloScreen</p>
    </div>
  );
}

export default VoziloScreen;

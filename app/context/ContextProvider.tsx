/* eslint-disable react/destructuring-assignment */
import React from 'react';
import MainContext from './MainContext';

interface Props {
  value: any;
  children: JSX.Element;
}

function ContextProvider(props: Props) {
  return (
    <MainContext.Provider value={props.value}>
      {props.children}
    </MainContext.Provider>
  );
}

export default ContextProvider;

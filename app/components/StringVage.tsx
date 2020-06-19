import React from 'react';

interface Props {
  stringVage: string;
}

function StringVage(p: Props) {
  const { stringVage } = p;
  return (
    <div style={{ margin: '30px 0px', display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <span
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: 1,
            minHeight: 30,
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px'
          }}
        >
          String vage:{' '}
        </span>
        <span
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: 1,
            minHeight: 30,
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px'
          }}
        >
          Pozicija:{' '}
        </span>
      </div>
      {stringVage.split('').map((item, i) => {
        return (
          <div
            key={i + ''}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <span
              style={{
                borderStyle: 'solid',
                borderColor: 'black',
                borderWidth: 1,
                minHeight: 30,
                minWidth: 25,
                color: 'blue',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {item}
            </span>
            <span
              style={{
                borderStyle: 'solid',
                borderColor: 'black',
                borderWidth: 1,
                minHeight: 30,
                minWidth: 25,
                color: 'red',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {i}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default StringVage;

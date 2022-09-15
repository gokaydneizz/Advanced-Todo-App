import React from 'react';

const InputCard = ({children, theme}) => {
  return (
    <div className={theme === 'light' ? 'input-box light' : 'input-box'}>
      {children}
    </div>
  );
};

export default InputCard;

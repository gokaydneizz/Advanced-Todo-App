import React from 'react';

const TodosCard = ({children, theme}) => {
  return (
    <div className={theme === 'light' ? 'todos-box light' : 'todos-box'}>
      {children}
    </div>
  );
};

export default TodosCard;

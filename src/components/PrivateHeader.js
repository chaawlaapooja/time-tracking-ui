import React from 'react';

const PrivateHeader = (props) => {
  return (
    <div className="header">
        <div className="header__content">
            <h1 className="header__title">{props.title}</h1>
            <h2 style={{padding:'1rem'}}>Created by Pooja Chawla</h2>
        </div>
    </div>
  );
};

export default PrivateHeader;

import React from 'react';
import './BanList.css'

const BanList = ({ banList }) => {
  return (
    <div className="ban-list">
      <h3>Ban List:</h3>
      {banList && banList.length > 0 && banList.map((attribute, index) => (
        <>
        <button key={index} className="ban-item">
          {attribute}
        </button>&nbsp;
        </>
      ))} 
    </div>
  );
}

export default BanList;



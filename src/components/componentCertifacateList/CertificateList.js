import React, { useState, useEffect } from 'react';
import './certificateList.css';

function CertificateList({ certificates, onClick, drag, select }) {
  return (
    <div className="all-list">
      {certificates.length > 0 ? (
        !drag ? (
          certificates.map((c) => (
            <div
              className={
                c.idName === select ? 'selected pointer' : 'certificate pointer'
              }
              key={c.idName}
              onClick={onClick}
              data-name={c.idName}
            >
              {c.commonName}{' '}
              {c.idName === select ? (
                <p style={{ fontSize: '18px' }}>&#x25BA;</p>
              ) : null}{' '}
            </div>
          ))
        ) : (
          certificates.map((c) => (
            <div
              className={c.idName === select ? 'selected' : 'certificate'}
              key={c.idName}
              data-name={c.idName}
            >
              {c.commonName}
            </div>
          ))
        )
      ) : (
        <div className="empty-list">Додайте сертифікати</div>
      )}
    </div>
  );
}

export default CertificateList;

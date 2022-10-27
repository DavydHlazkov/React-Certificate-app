import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import asn1 from './data/asn1';
import { getFromStorage, setStorage } from './data/localStorage';
import CertificateList from './components/componentCertifacateList/CertificateList';
import CertificateInfo from './components/componentCertificateInfo/CertificateInfo';

function App() {
  const [drag, setDrag] = useState(false);
  const [listFiles, setListFiles] = useState([]);
  const [isInfo, setIsInfo] = useState(false);
  const [certificateInfo, setCertificateInfo] = useState({});
  const [select, setSelect] = useState();


  const setNewSert = () => {
    const store = getFromStorage();
    setListFiles(
      store
        .filter((c) => c.hasOwnProperty('idName'))
        .sort((a, b) => a.dateAdded - b.dateAdded)
    );
  }

  useEffect(() => {
    setNewSert()
    
  }, []);

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
    setIsInfo(false);
    setSelect('');
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
    setSelect('');
  }

  function onDropHandler(e) {
    e.preventDefault();
    let files = e.dataTransfer.files;
    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    reader.onload = () => {
      let result = asn1(reader.result, files[0].name);
      setStorage(files[0].name, result);
      setNewSert()
      
    };
    setDrag(false);
    setSelect('');
  }

  function certificateOnClickHandler(e) {
    const cerName = e.target.dataset.name;
    setCertificateInfo(listFiles.find((c) => c.idName === cerName));
    setIsInfo(true);
    setSelect(cerName);
  }

  return (
    <div className="app">
      <div className="certificate-list">
        <CertificateList
          select={select}
          certificates={listFiles}
          onClick={certificateOnClickHandler}
          drag={drag}
        />
        {!drag ? (
          <button onClick={(e) => dragStartHandler(e)}>Додати</button>
        ) : (
          <button onClick={(e) => dragLeaveHandler(e)}>Скасувати</button>
        )}
      </div>
      {isInfo ? (
        <CertificateInfo cerInfo={certificateInfo} />
      ) : drag ? (
        <div
          className="drop-area"
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
        >
          Перетягніть файл сертифіката у поле
        </div>
      ) : (
        <div className="grag-area">
          Виберіть сертифікат, щоб переглянути інформацію
        </div>
      )}
    </div>
  );
}
export default App;

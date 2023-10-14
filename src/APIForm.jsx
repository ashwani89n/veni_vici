import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppForm.css';
import BanList from './BanList';

const APIForm = () => {
  const [catData, setCatData] = useState({
    breed: '',
    origin: '',
    temperament: '',
    image_url: '',
  });

  const reset = () => {
    setCatData({
      breed: '',
      origin: '',
      temperament: '',
      image_url: '',
    });
  };
  const [dataAvail, SetDataAvail] = useState(false);
  const [banList, setBanList] = useState([]);

  const api_key = 'live_vbxlJlx4NBLtSJaVTnFLPW4sP2MqRnsecsWLgnOAeLGTxJ9Iw5Jn9IdbML3YFuGp';

  const fetchCatInfo = () => {
    axios
      .get(`https://api.thecatapi.com/v1/breeds?api_key=${api_key}`)
      .then((response) => {
        if (response.data.length > 0) {
          const randomBreed = response.data[Math.floor(Math.random() * response.data.length)];

          // Check if the breed attributes are in the ban list
          const attributesToBan = [randomBreed.name, randomBreed.origin, randomBreed.temperament.split(',')[0]];
          const shouldSkip = banList.some((bannedAttribute) =>
            attributesToBan.includes(bannedAttribute)
          );

          if (shouldSkip) {
            fetchCatInfo();
          } else {
            axios.get(`https://api.thecatapi.com/v1/images/search?api_key=${api_key}`)
            .then((response) => {
              if (response.data.length > 0) {
                const firstCat = response.data[0];
                setCatData({
                breed: randomBreed.name,
                origin: randomBreed.origin,
                temperament: randomBreed.temperament.split(',')[0],
                image_url: firstCat.url,
                });
                SetDataAvail(true);
                }
            })
    
          }
        }
      })
      .catch((error) => {
        console.error(error);
        reset();
      });
  };

  const handleBanAttribute = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  };


  return (
    <>
      <div className='wholeContent'>
        <div className="CatImage">
          <h2>Trippin' on Cats</h2>
          <h3>Discover cats from your wildest dreams!</h3>
          <h4>😺😸😹😻😼😽🙀😿😾</h4>
          <table align='center'>
            <tr>
              <button type="button" className="button" onClick={fetchCatInfo}>
                Discover!
              </button>
            </tr>
          </table>
          <table align='center'>
            <tr>
              {catData.image_url && (
                <div className="cat-container">
                  <img src={catData.image_url} alt="Cat" className="cat-image" />
                </div>
              )}
            </tr>
          </table>
          {dataAvail ? (
            <table align='center'>
              <tr>
                <td>
                  {catData.breed && (
                    <>
                      <button className="button-style" onClick={() => handleBanAttribute(catData.breed)}>
                        {catData.breed}{' '}
                      </button>
                      &nbsp;
                    </>
                  )}
                  {catData.origin && (
                    <>
                      <button className="button-style" onClick={() => handleBanAttribute(catData.origin)}>
                        {catData.origin}
                      </button>
                      &nbsp;
                    </>
                  )}
                  {catData.temperament && (
                    <>
                      <button
                        className="button-style"
                        onClick={() => handleBanAttribute(catData.temperament)}
                      >
                        {catData.temperament}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            </table>
          ) : (
            catData.image_url !== "" && (
              <button className="button-style">No Information to display!</button>
            )
          )}
        </div>
        <div className='banListContainer'>
          <BanList banList={banList} />
        </div>
      </div>
    </>
  );
};

export default APIForm;

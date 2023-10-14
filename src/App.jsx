import './App.css';
import React from 'react';
import APIForm from './APIForm';

const api_key = import.meta.env.VITE_APP_ACCESS_KEY;
const App = () => {

  return (
    <>
      <div className="whole-page">
        <table align='center'>
          <tr>
      <div className='Content'>
      <APIForm />
      </div>
      </tr>
      </table>
    <br></br>
  </div>
      </>
  )
}

export default App




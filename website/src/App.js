import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Header2 from './Components/Header2';
import Section from './Sections';
import { autoLogin } from './Slices/authSlice'

function App() {

  const { isLoggedin } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin())
  },[dispatch])

  return (
    <div>
      <Routes>
        <Route path='/*' element={<Header/>}></Route>
        <Route path='mycart-page/payment' element={isLoggedin ? <Header2/> : <Header/>}></Route>
      </Routes>
      
      <Section/>
    </div>
  );
}

export default App;

import React, { FC, useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './App.css'
import Home from './pages/home';
import Profil from './pages/profil';
import Board from './pages/board';
import { UserContext } from './context/userContext';

const App: FC = () => {

  const { currentUser, currentUserData } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      console.log("user : ", currentUser, currentUserData)
    } else { console.log("no-user"); }
  }, [currentUser, currentUserData])

  return (
    <div className="app">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App

import React, { useContext, useEffect, useState } from 'react';
import LogOut from '../components/logout/LogOut';
import SignIn from '../components/signIn/SignIn';
import SignUp from '../components/signup/SignUp';
import { UserContext } from '../context/userContext';
import Button from '../elements/button/Button';

export default function Profil() {
  const { currentUser } = useContext(UserContext)
  const [selectForm, setSelectForm] = useState('Sign Up')

  const handleSelectForm = () => {
    if(selectForm === 'Sign In') {
      setSelectForm('Sign Up')
    } else {
      setSelectForm('Sign In')
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        {currentUser == null ?
          <div>
            {
              selectForm === "Sign Up" ?
                <SignIn />
                :
                <SignUp />
            }
            <Button name={selectForm} type={"button"} onClick={handleSelectForm}/>
          </div>
          :
          <div>
            <h3>profil</h3>
            
            <LogOut />
          </div>
        }
      </div>
    </div>
  )
}

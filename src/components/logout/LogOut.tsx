import React  from 'react'
import Button from '../../elements/button/Button';
import { logOut } from '../../services/firebase/firebase.user';

export default function LogOut() {
  return <Button onClick={logOut} type={"submit"} name={"LogOut"} />
}

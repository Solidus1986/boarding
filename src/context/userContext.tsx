import { createContext, useState, useEffect, FC } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, database } from "../services/firebase/firebase.config"
import { ref, child, get } from "firebase/database";
import { authStatus } from "../services/firebase/firebase.user";

export const UserContext = createContext<any | undefined>(undefined)



export function UserContextProvider(props) {
  const [logStatus, setLogStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [loadingData, setLoadingData] = useState(true);


  useEffect(() => {

    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   console.log("test")
    //   setCurrentUser(currentUser)
    //   if (currentUser) {
    //     const dbRef = ref(database);
    //     get(child(dbRef, `users/${currentUser.uid}`)).then((res) => {
    //       setCurrentUserData(res.val())
    //       setLoadingData(false)
    //     }).catch((error) => {
    //       console.error(error);
    //     });
    //   } else { setLoadingData(false) } 
    // })
    // const unsubscribe = authStatus(setCurrentUser, setCurrentUserData, setLoadingData)
    const unsubscribe = authStatus(setCurrentUser, setCurrentUserData, setLoadingData)
    return unsubscribe ;
 
  }, [])

  return (
    <UserContext.Provider value={{ logStatus, currentUser, currentUserData }}>
      {!loadingData && props.children}
      {/* {props.children} */}
    </UserContext.Provider>
  )
}
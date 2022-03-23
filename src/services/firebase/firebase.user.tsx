import { auth, db, database, storage } from './firebase.config';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { ref, set, child, get } from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage"



export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err, 'toto wake up');
    const alert = err
    alert(alert.message);
  }
};

export const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    set(ref(database, "users/" + user.uid), {
      username: name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
  }
};

// export const sendPasswordResetEmail = async (email : Props) => {
//   try {
//     await auth.sendPasswordResetEmail(email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

export const writeUserData = async (userId: string, name: string, email: string, imageUrl: string) => {
  const res = set(ref(database, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl
  });
  return res
};


export const authStatus = async (setCurrentUser: any, setCurrentUserData: any, setLoadingData: any ) => {
  try {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser)
      if (currentUser) {
        const dbRef = ref(database);
        get(child(dbRef, `users/${currentUser.uid}`)).then((res) => {
          setCurrentUserData(res.val())
          setLoadingData(false)
        }).catch((error) => {
          console.error(error);
        });
      } else { setLoadingData(false) }
    })
  } catch (error) {
    console.log(error)
  }

}

// export const uploadPicture = async (image, setProgress, setUrl) => {
//   const uploadTask = await uploadBytes(refStorage(storage, `images/${image.name}`), image);
//   uploadTask
//   .then(
//       "state_changed",
//       snapshot => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(progress);
//       },
//       error => {
//         console.log(error);
//       },
//       () => {
//         storage
//           .refStorage("images")
//           .child(image.name)
//           .getDownloadURL()
//           .then(url => {
//             console.log(url, "????")
//             setUrl(url);
//           });
//       }
//     )
//     .catch(err => console.log(err, "error update"))
// }

// export async function upload(file, currentUser, setLoading) {
//   const fileRef = refStorage(storage, `images/users/${currentUser.uid}.png`);

//   setLoading(true);

//   const snapshot = await uploadBytes(fileRef, file);
//   const photoURL = await getDownloadURL(fileRef);

//   updateProfile(currentUser, { photoURL });

//   setLoading(false);
//   alert("Uploaded file!");
// }

export const logOut = () => {
  auth.signOut();
};

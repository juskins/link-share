// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz40gD7MR6GvuIN0Md77x7obJrSowV098",
  authDomain: "linkshare-app-dba43.firebaseapp.com",
  projectId: "linkshare-app-dba43",
  storageBucket: "linkshare-app-dba43.appspot.com",
  messagingSenderId: "635766924606",
  appId: "1:635766924606:web:a1ce642bac60fae054786f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore()



// Save user data
// export const saveUserData = async (userId, platform, url) => {
//   if (!userId || !platform || !url) {
//     console.error("Invalid data:", { userId, platform, url });
//     return;
//   }


//   try {
//     await addDoc(collection(db, 'userLinks'), {
//       userId,
//       platform,
//       url,
//     });
//   } catch (error) {
//     console.error('Error saving user data:', error);
//   }
// };


// Fetch user data
// export const fetchUserData = async (userId) => {
//   try {
//     const q = (collection(db, 'userLinks'));
//     const querySnapshot = await getDocs(q);
//     const userData = [];
//     querySnapshot.forEach((doc) => {
//       userData.push(doc.data());
//     });
//     return userData;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// };


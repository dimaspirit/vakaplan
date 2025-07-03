import { collection, getDocs, addDoc } from "firebase/firestore";
import { firebaseDB } from '../firebase';

const dbTableName = "projects"; // TODO: move to env variable

/**
 * 
 * TODO: move name of table in env. variable
 */
export const getProjects = async() => {
  const querySnapshot = await getDocs(collection(firebaseDB, dbTableName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createProject = async({ title, createdBy }) => {
  const docRef = await addDoc(collection(firebaseDB, dbTableName), {
    title,
    createdBy,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
};

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
 
// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// export const firebaseSignUp = async({ email, password }) => {
//   const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
//   return result;
// };

// export const firebaseSignOut = async() => {
//   await signOut(firebaseAuth);
// };
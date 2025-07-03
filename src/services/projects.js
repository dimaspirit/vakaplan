import { collection, getDocs, addDoc } from "firebase/firestore";
import { firebaseDB } from '../firebase';

const dbTableName = "projects"; // TODO: move to env variable

export const getProjects = async() => {
  const querySnapshot = await getDocs(collection(firebaseDB, dbTableName));
  return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
};

export const createProject = async({ title, createdBy }) => {
  const docRef = await addDoc(collection(firebaseDB, dbTableName), {
    title,
    createdBy,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
};
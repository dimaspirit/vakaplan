import { collection, doc, setDoc, serverTimestamp,getDocs, getDoc, query, where  } from "firebase/firestore";
import { firebaseDB } from '../firebase';

const dbTableName = "applications";

export const getProjects = async() => {
  const querySnapshot = await getDocs(collection(firebaseDB, dbTableName));
  return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
};

export const getApplications = async(userUID) => {
  const q = query(collection(firebaseDB, dbTableName), where("createdBy", "==", userUID));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
};

export const getApplicationByUID = async(uid) => {
  const docRef = doc(firebaseDB, dbTableName, uid);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()) return docSnap.data()
  return null;
}

export const createApplication = async(applicationData) => {
  const applicationRef = doc(collection(firebaseDB, dbTableName));

  try {
    await setDoc(applicationRef, {
      ...applicationData,
      uid: applicationRef.id,
      createdAt: serverTimestamp(),
    });
    return applicationRef.id;
  } catch (error) {
    console.error("Error creating application:", error);
    throw new Error("Failed to create application");
  }
};
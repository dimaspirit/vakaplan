import { collection, doc, setDoc, serverTimestamp  } from "firebase/firestore";
import { firebaseDB } from '../firebase';

const dbTableName = "applications"; // TODO: move to CONSTANTS file or env variable

export const createApplication = async({ position, title, url }) => {
  const applicationRef = doc(collection(firebaseDB, dbTableName));

  try {
    await setDoc(applicationRef, {
      url,
      position,
      title,
      uid: applicationRef.id,
      createdAt: serverTimestamp(),
    });
    return applicationRef.id;
  } catch (error) {
    console.error("Error creating application:", error);
    throw new Error("Failed to create application");
  }
};
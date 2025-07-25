import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { firebaseAuth } from '../firebase';

setPersistence(firebaseAuth, browserLocalPersistence);

export const firebaseSignIn = async({ email, password }) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const firebaseSignUp = async({ email, password }) => {
  const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  
  return result;
};

export const firebaseSignOut = async() => {
  await signOut(firebaseAuth);
};
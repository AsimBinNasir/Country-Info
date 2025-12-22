import * as firebaseAuth from "firebase/auth";
import { auth, googleProvider } from "./firebase";

/**
 * Register a new user, update profile, and send verification email.
 * Immediately signs out user so they must verify before their first full session.
 */
export const registerUser = async (email, password, displayName) => {
  const userCredential = await firebaseAuth.createUserWithEmailAndPassword(auth, email, password);
  
  if (userCredential.user) {
    // Update display name in Firebase Auth profile
    await firebaseAuth.updateProfile(userCredential.user, { displayName });
    
    // Store locally for UI immediate use (e.g., personalized welcome messages)
    localStorage.setItem('explorer_username', displayName);
    
    // Trigger verification email
    await firebaseAuth.sendEmailVerification(userCredential.user);
    
    // Sign out immediately to enforce the "Verify First" logic
    await firebaseAuth.signOut(auth);
  }
  return userCredential;
};

/**
 * Resends verification email. 
 * Note: Firebase requires an active session or recent login to send verification.
 */
export const resendVerificationEmail = async (email, password) => {
  const userCredential = await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
  
  if (userCredential.user && !userCredential.user.emailVerified) {
    await firebaseAuth.sendEmailVerification(userCredential.user);
    await firebaseAuth.signOut(auth);
  }
  return userCredential;
};

/**
 * Standard email/password login
 */
export const loginUser = (email, password) => {
  return firebaseAuth.signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign out and clear local cache
 */
export const logoutUser = () => {
  localStorage.removeItem('explorer_username');
  return firebaseAuth.signOut(auth);
};

/**
 * Google Popup Login
 */
export const loginWithGoogle = () => {
  return firebaseAuth.signInWithPopup(auth, googleProvider);
};
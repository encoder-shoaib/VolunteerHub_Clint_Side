import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import auth from "../firebase/firebase.init";
import AuthContext from "./AuthContext";

// Initialize Google provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync user with backend
  const syncUserWithBackend = async (firebaseUser) => {
    try {
      const response = await axios.post("https://volunteer-hub-server-side.vercel.app/users", {
        name: firebaseUser.displayName || "Anonymous",
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL || "",
        provider: firebaseUser.providerData[0]?.providerId || "email",
      });
      return response.data;
    } catch (err) {
      console.error("Error syncing user with backend:", err);
      setError("Failed to sync user data with server.");
      throw err;
    }
  };

  // Create new user with email and password
  const createUser = async (email, password, name, photoUrl) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (name || photoUrl) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoUrl,
        });
      }
      const backendUser = await syncUserWithBackend(auth.currentUser);
      setUser(backendUser);
      setLoading(false);
      return userCredential;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Update user profile
  const updateUserProfile = async (name, photoUrl) => {
    setLoading(true);
    setError(null);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl,
      });
      const backendUser = await syncUserWithBackend(auth.currentUser);
      setUser(backendUser);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Log in user with email and password
  const signInUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const backendUser = await syncUserWithBackend(userCredential.user);
      setUser(backendUser);
      setLoading(false);
      return userCredential;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Google sign-in
  const googleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const backendUser = await syncUserWithBackend(userCredential.user);
      setUser(backendUser);
      setLoading(false);
      return userCredential;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Sign out user
  const signOutUser = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  // Set up auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const backendUser = await syncUserWithBackend(currentUser);
          setUser(backendUser);
        } catch (err) {
          setUser(null);
          err
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  // Context value
  const authInfo = {
    user,
    loading,
    error,
    createUser,
    updateUserProfile,
    signInUser,
    googleSignIn,
    signOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-700">Loading...</p>
          <span className="loading loading-ring loading-2xl  text-primary"></span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
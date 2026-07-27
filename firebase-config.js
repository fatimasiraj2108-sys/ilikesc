// Shared Firebase setup — imported as a module by every public page
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, query, where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFZQLSYVO_ACX1Kb5DDSXEeuV7cDiQSbk",
  authDomain: "successclub12345.firebaseapp.com",
  projectId: "successclub12345",
  storageBucket: "successclub12345.firebasestorage.app",
  messagingSenderId: "974097783643",
  appId: "1:974097783643:web:3676e6e58715576780187e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const APPLICATIONS = "applications";

window.storeSetApplication = async function(record){
  try{
    // If someone is signed in with Google when they apply, tag the
    // record with their account so it shows up under "your applications".
    if (auth.currentUser) {
      record.ownerUid = auth.currentUser.uid;
      record.ownerEmail = auth.currentUser.email || "";
    }
    await setDoc(doc(db, APPLICATIONS, record.id), record);
    return true;
  } catch(err){
    console.error("Could not save application", err);
    return false;
  }
};
window.storeGetApplication = async function(id){
  try{
    const snap = await getDoc(doc(db, APPLICATIONS, id));
    return snap.exists() ? snap.data() : null;
  } catch(err){
    console.error("Could not fetch application", err);
    return null;
  }
};
window.storeListApplications = async function(){
  try{
    const snap = await getDocs(collection(db, APPLICATIONS));
    return snap.docs.map(d => d.data());
  } catch(err){
    console.error("Could not list applications", err);
    return [];
  }
};
// Only returns applications owned by the currently signed-in user —
// enforced by Firestore security rules, not just this query.
window.storeListMyApplications = async function(){
  try{
    if (!auth.currentUser) return [];
    const q = query(collection(db, APPLICATIONS), where("ownerUid", "==", auth.currentUser.uid));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data());
  } catch(err){
    console.error("Could not list your applications", err);
    return [];
  }
};
window.storeUpdateStatus = async function(id, status){
  try{
    await updateDoc(doc(db, APPLICATIONS, id), { status });
    return true;
  } catch(err){
    console.error("Could not update status", err);
    return false;
  }
};

// ---- Admin login (email/password, staff only) ----
window.adminSignIn = function(email, password){
  return signInWithEmailAndPassword(auth, email, password);
};
window.adminSignOut = function(){
  return signOut(auth);
};
window.onAdminAuthChange = function(callback){
  onAuthStateChanged(auth, callback);
};

// ---- Applicant login (Google, for linking status to a Gmail account) ----
window.signInWithGoogle = function(){
  return signInWithPopup(auth, new GoogleAuthProvider());
};
window.signOutUser = function(){
  return signOut(auth);
};
window.onUserAuthChange = function(callback){
  onAuthStateChanged(auth, callback);
};

// Signal to the page that the module has finished loading, in case
// other scripts need to wait for it.
window.dispatchEvent(new Event('firebase-ready'));

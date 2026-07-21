// Shared Firebase setup — imported as a module by apply.html and admin.html
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged
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
window.storeUpdateStatus = async function(id, status){
  try{
    await updateDoc(doc(db, APPLICATIONS, id), { status });
    return true;
  } catch(err){
    console.error("Could not update status", err);
    return false;
  }
};
window.adminSignIn = function(email, password){
  return signInWithEmailAndPassword(auth, email, password);
};
window.adminSignOut = function(){
  return signOut(auth);
};
window.onAdminAuthChange = function(callback){
  onAuthStateChanged(auth, callback);
};

// Signal to the page that the module has finished loading, in case
// other scripts need to wait for it.
window.dispatchEvent(new Event('firebase-ready'));

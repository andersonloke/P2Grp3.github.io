import firebase from "firebase/app";
import "firebase/auth";

function makeEmailCredential(email, password) {
    // [START auth_make_email_credential]
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    // [END auth_make_email_credential]
}

function signOut() {
    // [START auth_sign_out]
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
    // [END auth_sign_out]
}

function authStateListener() {
    // [START auth_state_listener]
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
    // [END auth_state_listener]
}
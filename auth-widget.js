// Powers the "Sign in with Google" widget in the nav on every public page.
// Requires firebase-config.js to be loaded first (as a module) on the
// same page — this file waits for its 'firebase-ready' signal.

window.addEventListener('firebase-ready', function () {
  window.onUserAuthChange(function (user) {
    const signInBtn = document.getElementById('authSignInBtn');
    const userBox = document.getElementById('authUserBox');
    const nameEl = document.getElementById('authUserName');
    if (!signInBtn || !userBox) return;

    if (user) {
      signInBtn.style.display = 'none';
      userBox.style.display = 'flex';
      if (nameEl) {
        const fullLabel = user.displayName || user.email || 'Signed in';
        nameEl.textContent = fullLabel.split(' ')[0];
        nameEl.title = fullLabel;
      }
    } else {
      signInBtn.style.display = 'inline-flex';
      userBox.style.display = 'none';
    }
  });
});

async function handleSignIn() {
  try {
    await window.signInWithGoogle();
  } catch (err) {
    console.error('Sign-in failed', err);
    alert("Couldn't sign in. Please try again.");
  }
}

async function handleSignOut() {
  try {
    await window.signOutUser();
  } catch (err) {
    console.error('Sign-out failed', err);
  }
}

window.handleSignIn = handleSignIn;
window.handleSignOut = handleSignOut;

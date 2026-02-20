const firebaseConfig = {
  apiKey: "AIzaSyATUJZXBqw6amu5NsoJRs-4CCJY9cpssyY",
  authDomain: "nari-sangha.firebaseapp.com",
  projectId: "nari-sangha",
  storageBucket: "nari-sangha.firebasestorage.app",
  messagingSenderId: "524704455101",
  appId: "1:524704455101:web:c43febcff4a445518fdad4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Auth state management
let currentUser = null;

// Listen to auth state changes
auth.onAuthStateChanged((user) => {
  currentUser = user;
  if (user) {
    // User is signed in
    localStorage.setItem('firebaseUser', JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }));
    
    // Dispatch custom event for other scripts to listen
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user } }));
  } else {
    // User is signed out
    localStorage.removeItem('firebaseUser');
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user: null } }));
  }
});

// Auth functions
const authService = {
  // Email/Password Sign In
  async signInWithEmail(email, password) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      let errorMessage = 'Sign in failed. Please try again.';
      
      // User-friendly error messages
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      return { success: false, error: errorMessage, code: error.code };
    }
  },

  // Email/Password Sign Up
  async signUpWithEmail(email, password, displayName = null) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      if (displayName && userCredential.user) {
        await userCredential.user.updateProfile({ displayName });
      }
      return { success: true, user: userCredential.user };
    } catch (error) {
      let errorMessage = 'Sign up failed. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please use at least 6 characters.';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      return { success: false, error: errorMessage, code: error.code };
    }
  },

  // Google Sign In
  async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      const userCredential = await auth.signInWithPopup(provider);
      return { success: true, user: userCredential.user };
    } catch (error) {
      // Handle popup blocked
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
        // Fallback to redirect
        return await this.signInWithGoogleRedirect();
      }
      
      let errorMessage = 'Google sign-in failed. Please try again.';
      if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage, code: error.code };
    }
  },

  // Google Sign In (Redirect method - fallback)
  async signInWithGoogleRedirect() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithRedirect(provider);
      return { success: true, redirect: true };
    } catch (error) {
      return { success: false, error: error.message || 'Redirect sign-in failed.' };
    }
  },

  // Sign Out
  async signOut() {
    try {
      await auth.signOut();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Sign out failed.' };
    }
  },

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return auth.currentUser !== null;
  },

  // Password Reset
  async resetPassword(email) {
    try {
      await auth.sendPasswordResetEmail(email);
      return { success: true };
    } catch (error) {
      let errorMessage = 'Failed to send password reset email.';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      
      return { success: false, error: errorMessage };
    }
  }
};

// Handle redirect result (for Google sign-in redirect)
auth.getRedirectResult().then((result) => {
  if (result.user) {
    // User signed in via redirect
    const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || 'dashboard.html';
    sessionStorage.removeItem('redirectAfterLogin');
    window.location.href = redirectUrl;
  }
}).catch((error) => {
  console.error('Redirect sign-in error:', error);
  // Don't show error to user if they cancelled
  if (error.code !== 'auth/popup-closed-by-user') {
    console.error('Auth redirect error:', error);
  }
});

// Export for use in other scripts
window.authService = authService;
window.firebaseAuth = auth;

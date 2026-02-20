// ============================================================
// Authentication Guard - Protects pages that require login
// ============================================================

// Pages that require authentication
const protectedPages = [
  'dashboard.html',
  'symptom_checker.html',
  'screening.html'
  // Add more protected pages as needed
];

// Check if current page requires auth
function isProtectedPage() {
  const currentPage = window.location.pathname.split('/').pop();
  return protectedPages.includes(currentPage);
}

// Redirect to login if not authenticated
function checkAuth() {
  if (isProtectedPage()) {
    // Wait for Firebase to be ready
    if (typeof firebaseAuth === 'undefined') {
      // Wait a bit and try again
      setTimeout(checkAuth, 100);
      return;
    }
    
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        // Store the page they tried to access
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = 'login.html';
      }
    });
  }
}

// Run check on page load
if (typeof firebaseAuth !== 'undefined') {
  checkAuth();
} else {
  // Wait for Firebase to load
  window.addEventListener('DOMContentLoaded', () => {
    // Give Firebase a moment to initialize
    setTimeout(() => {
      if (typeof firebaseAuth !== 'undefined') {
        checkAuth();
      } else {
        // If still not loaded, check again
        setTimeout(checkAuth, 500);
      }
    }, 100);
  });
}

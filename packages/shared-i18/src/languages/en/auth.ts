// Unified authentication properties for English
// Merges signin and login keys for backward compatibility

const authProperties: Record<string, string> = {
  // Primary standardized keys (for future use)
  'auth.title': 'Sign In',
  'auth.email.label': 'Email',
  'auth.email.placeholder': 'Enter your email',
  'auth.password.label': 'Password',
  'auth.password.placeholder': 'Enter your password',
  'auth.button.cancel': 'Cancel',
  'auth.button.submit': 'Sign In',
  'auth.button.submitting': 'Signing in...',
  'auth.error.generic': 'Sign in failed. Please try again.',

  // Backward compatibility: signin keys (used by web)
  'signin.title': 'Sign In',
  'signin.email.label': 'Email',
  'signin.email.placeholder': 'Enter your email',
  'signin.password.label': 'Password',
  'signin.password.placeholder': 'Enter your password',
  'signin.button.cancel': 'Cancel',
  'signin.button.submit': 'Sign In',
  'button.signin': 'Sign In',

  // Backward compatibility: login keys (used by mobile)
  'login.title': 'Log In',
  'login.email.label': 'Email',
  'login.email.placeholder': 'Enter your email',
  'login.password.label': 'Password',
  'login.password.placeholder': 'Enter your password',
  'login.button.cancel': 'Cancel',
  'login.button.submit': 'Log In',
  'login.button.submitting': 'Logging in...',
  'login.error.generic': 'Login failed. Please try again.',
  'button.login': 'Log In',

  // Shared button labels
  'button.logout': 'Logout',
};

export default authProperties;


// Unified authentication properties for Bengali
// Merges signin and login keys for backward compatibility

const authProperties: Record<string, string> = {
  // Primary standardized keys (for future use)
  'auth.title': 'সাইন ইন',
  'auth.email.label': 'ইমেইল',
  'auth.email.placeholder': 'আপনার ইমেইল লিখুন',
  'auth.password.label': 'পাসওয়ার্ড',
  'auth.password.placeholder': 'আপনার পাসওয়ার্ড লিখুন',
  'auth.button.cancel': 'বাতিল',
  'auth.button.submit': 'সাইন ইন',
  'auth.button.submitting': 'সাইন ইন হচ্ছে...',
  'auth.error.generic': 'সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',

  // Backward compatibility: signin keys (used by web)
  'signin.title': 'সাইন ইন',
  'signin.email.label': 'ইমেইল',
  'signin.email.placeholder': 'আপনার ইমেইল লিখুন',
  'signin.password.label': 'পাসওয়ার্ড',
  'signin.password.placeholder': 'আপনার পাসওয়ার্ড লিখুন',
  'signin.button.cancel': 'বাতিল',
  'signin.button.submit': 'সাইন ইন',
  'button.signin': 'সাইন ইন',

  // Backward compatibility: login keys (used by mobile)
  'login.title': 'সাইন ইন',
  'login.email.label': 'ইমেইল',
  'login.email.placeholder': 'আপনার ইমেইল লিখুন',
  'login.password.label': 'পাসওয়ার্ড',
  'login.password.placeholder': 'আপনার পাসওয়ার্ড লিখুন',
  'login.button.cancel': 'বাতিল',
  'login.button.submit': 'সাইন ইন',
  'login.button.submitting': 'সাইন ইন হচ্ছে...',
  'login.error.generic': 'লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
  'button.login': 'লগ ইন',

  // Shared button labels
  'button.logout': 'লগ আউট',
};

export default authProperties;


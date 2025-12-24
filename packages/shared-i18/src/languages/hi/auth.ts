// Unified authentication properties for Hindi
// Merges signin and login keys for backward compatibility

const authProperties: Record<string, string> = {
  // Primary standardized keys (for future use)
  'auth.title': 'साइन इन करें',
  'auth.email.label': 'ईमेल',
  'auth.email.placeholder': 'अपना ईमेल दर्ज करें',
  'auth.password.label': 'पासवर्ड',
  'auth.password.placeholder': 'अपना पासवर्ड दर्ज करें',
  'auth.button.cancel': 'रद्द करें',
  'auth.button.submit': 'साइन इन करें',
  'auth.button.submitting': 'साइन इन हो रहा है...',
  'auth.error.generic': 'साइन इन असफल रहा। कृपया दोबारा प्रयास करें।',

  // Backward compatibility: signin keys (used by web)
  'signin.title': 'साइन इन करें',
  'signin.email.label': 'ईमेल',
  'signin.email.placeholder': 'अपना ईमेल दर्ज करें',
  'signin.password.label': 'पासवर्ड',
  'signin.password.placeholder': 'अपना पासवर्ड दर्ज करें',
  'signin.button.cancel': 'रद्द करें',
  'signin.button.submit': 'साइन इन करें',
  'button.signin': 'साइन इन करें',

  // Backward compatibility: login keys (used by mobile)
  'login.title': 'साइन इन करें',
  'login.email.label': 'ईमेल',
  'login.email.placeholder': 'अपना ईमेल दर्ज करें',
  'login.password.label': 'पासवर्ड',
  'login.password.placeholder': 'अपना पासवर्ड दर्ज करें',
  'login.button.cancel': 'रद्द करें',
  'login.button.submit': 'साइन इन करें',
  'login.button.submitting': 'साइन इन हो रहा है...',
  'login.error.generic': 'लॉगिन असफल रहा। कृपया दोबारा प्रयास करें।',
  'button.login': 'लॉग इन',

  // Shared button labels
  'button.logout': 'लॉग आउट',
};

export default authProperties;


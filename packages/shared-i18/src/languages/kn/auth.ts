// Unified authentication properties for Kannada
// Merges signin and login keys for backward compatibility

const authProperties: Record<string, string> = {
  // Primary standardized keys (for future use)
  'auth.title': 'ಸೈನ್ ಇನ್',
  'auth.email.label': 'ಇಮೇಲ್',
  'auth.email.placeholder': 'ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ',
  'auth.password.label': 'ಪಾಸ್ವರ್ಡ್',
  'auth.password.placeholder': 'ನಿಮ್ಮ ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ',
  'auth.button.cancel': 'ರದ್ದುಮಾಡಿ',
  'auth.button.submit': 'ಸೈನ್ ಇನ್',
  'auth.button.submitting': 'ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ...',
  'auth.error.generic': 'ಸೈನ್ ಇನ್ ವಿಫಲವಾಗಿದೆ। ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.',

  // Backward compatibility: signin keys (used by web)
  'signin.title': 'ಸೈನ್ ಇನ್',
  'signin.email.label': 'ಇಮೇಲ್',
  'signin.email.placeholder': 'ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ',
  'signin.password.label': 'ಪಾಸ್ವರ್ಡ್',
  'signin.password.placeholder': 'ನಿಮ್ಮ ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ',
  'signin.button.cancel': 'ರದ್ದುಮಾಡಿ',
  'signin.button.submit': 'ಸೈನ್ ಇನ್',
  'button.signin': 'ಸೈನ್ ಇನ್',

  // Backward compatibility: login keys (used by mobile)
  'login.title': 'ಸೈನ್ ಇನ್',
  'login.email.label': 'ಇಮೇಲ್',
  'login.email.placeholder': 'ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ',
  'login.password.label': 'ಪಾಸ್ವರ್ಡ್',
  'login.password.placeholder': 'ನಿಮ್ಮ ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ',
  'login.button.cancel': 'ರದ್ದುಮಾಡಿ',
  'login.button.submit': 'ಸೈನ್ ಇನ್',
  'login.button.submitting': 'ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ...',
  'login.error.generic': 'ಲಾಗಿನ್ ವಿಫಲವಾಗಿದೆ। ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.',
  'button.login': 'ಲಾಗಿನ್',

  // Shared button labels
  'button.logout': 'ಲಾಗ್ ಔಟ್',
};

export default authProperties;


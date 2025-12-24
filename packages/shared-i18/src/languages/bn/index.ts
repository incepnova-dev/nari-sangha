// Bengali language properties

import brandProperties from './brand';
import authProperties from './auth';
import signupProperties from './signup';
import navigationProperties from './navigation';

const properties: Record<string, string> = {
  ...brandProperties,
  ...authProperties,
  ...signupProperties,
  ...navigationProperties,
};

// Export all properties
export default properties;


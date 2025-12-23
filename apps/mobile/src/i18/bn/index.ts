// Bengali language properties

import brandProperties from './brand';
import loginProperties from './login';
import signupProperties from './signup';
import navigationProperties from './navigation';

const properties: Record<string, string> = {
  ...signupProperties,
  ...loginProperties,
  ...brandProperties,
  ...navigationProperties,
};

// Export all properties
export default properties;


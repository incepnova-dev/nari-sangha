// Bengali language properties

import brandProperties from './brand';
import signinProperties from './signin';
import signupProperties from './signup';
import navigationProperties from './navigation';

const properties: Record<string, string> = {
  ...signupProperties,
  ...signinProperties,
  ...brandProperties,
  ...navigationProperties,
};

// Export all properties
export default properties;


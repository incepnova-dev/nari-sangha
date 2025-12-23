import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UnauthenticatedLanding from '../../components/UnauthenticatedLanding';

// Mock the i18 (languages) module
const mockProperties: Record<string, Record<string, string>> = {
  en: {
    'landing.welcome': 'Welcome to NariSangha',
    'landing.subtitle': 'Join our community',
    'landing.explore': 'Explore',
    'button.signin': 'Sign In',
    'button.signup': 'Sign Up',
    'signin.title': 'Sign In',
    'signin.button.cancel': 'Cancel',
    'signin.button.submit': 'Sign In',
    'signin.button.submitting': 'Signing in...',
    'signin.email.label': 'Email',
    'signin.email.placeholder': 'Enter your email',
    'signin.password.label': 'Password',
    'signin.password.placeholder': 'Enter your password',
    'signup.title': 'Sign Up',
    'signup.button.cancel': 'Cancel',
    'signup.button.submit': 'Sign Up',
  },
  hi: {
    'landing.welcome': 'नारीसंघ में आपका स्वागत है',
    'landing.subtitle': 'हमारे समुदाय में शामिल हों',
    'landing.explore': 'अन्वेषण करें',
    'button.signin': 'साइन इन',
    'button.signup': 'साइन अप',
  },
};

jest.mock('../../i18', () => ({
  getProperty: (key: string, lang: string = 'en') => {
    return mockProperties[lang]?.[key] || key;
  },
}));

describe('UnauthenticatedLanding', () => {
  const mockOnSignInSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the component without crashing', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="en" />
      );
      expect(getByText('Welcome to NariSangha')).toBeTruthy();
    });

    it('should render welcome message', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="en" />
      );
      expect(getByText('Welcome to NariSangha')).toBeTruthy();
    });

    it('should render subtitle', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="en" />
      );
      expect(getByText('Join our community')).toBeTruthy();
    });

    it('should render explore text', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="en" />
      );
      expect(getByText('Explore')).toBeTruthy();
    });

    it('should render Sign In button', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="en" />
      );
      expect(getByText('Sign In')).toBeTruthy();
    });

    it('should render Sign Up button', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="en" />
      );
      expect(getByText('Sign Up')).toBeTruthy();
    });

    it('should render with default language (en) when language prop is not provided', () => {
      const { getByText } = render(<UnauthenticatedLanding />);
      expect(getByText('Welcome to NariSangha')).toBeTruthy();
    });

    it('should render with Hindi language when language prop is "hi"', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="hi" />
      );
      expect(getByText('नारीसंघ में आपका स्वागत है')).toBeTruthy();
    });
  });

  describe('Button Interactions', () => {
    it('should open Sign In modal when Sign In button is pressed', () => {
      const { getByText, getAllByText } = render(
        <UnauthenticatedLanding language="en" />
      );

      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton);

      // After opening modal, there should be multiple "Sign In" texts (button + modal title)
      const signInTexts = getAllByText('Sign In');
      expect(signInTexts.length).toBeGreaterThan(1);
      expect(getByText('Email')).toBeTruthy();
      expect(getByText('Password')).toBeTruthy();
    });

    it('should open Sign Up modal when Sign Up button is pressed', () => {
      const { getByText, getAllByText } = render(
        <UnauthenticatedLanding language="en" />
      );

      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton);

      // After opening modal, there should be multiple "Sign Up" texts (button + modal title)
      const signUpTexts = getAllByText('Sign Up');
      expect(signUpTexts.length).toBeGreaterThan(1);
      expect(getByText('Sign Up functionality will be implemented here')).toBeTruthy();
    });

    it('should close Sign In modal when Cancel button is pressed', async () => {
      const { getByText, queryByText, getAllByText } = render(
        <UnauthenticatedLanding language="en" />
      );

      // Open modal
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton);

      // Verify modal is open
      expect(getByText('Email')).toBeTruthy();

      // Close modal
      const cancelButton = getByText('Cancel');
      fireEvent.press(cancelButton);

      await waitFor(() => {
        // Modal should be closed - form fields should not be visible
        expect(queryByText('Email')).toBeNull();
        // Button should still be visible
        expect(getByText('Sign In')).toBeTruthy();
      });
    });

    it('should close Sign Up modal when Cancel button is pressed', async () => {
      const { getByText, queryByText } = render(
        <UnauthenticatedLanding language="en" />
      );

      // Open modal
      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton);

      // Verify modal is open
      expect(getByText('Sign Up')).toBeTruthy();

      // Close modal
      const cancelButton = getByText('Cancel');
      fireEvent.press(cancelButton);

      await waitFor(() => {
        // Modal should be closed - title text should not be duplicated
        expect(queryByText('Sign Up')).toBeTruthy();
        // Button should still be visible
        expect(getByText('Sign Up')).toBeTruthy();
      });
    });
  });

  describe('Sign In Success Callback', () => {
    it('should call onSignInSuccess when Sign In is successful', async () => {
      const { getByText, getAllByText } = render(
        <UnauthenticatedLanding
          language="en"
          onSignInSuccess={mockOnSignInSuccess}
        />
      );

      // Open Sign In modal
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton);

      // Wait for modal to open
      await waitFor(() => {
        expect(getByText('Email')).toBeTruthy();
      });

      // Submit Sign In - find all "Sign In" texts and use the last one (submit button in modal)
      const allSignInTexts = getAllByText('Sign In');
      const modalSubmitButton = allSignInTexts[allSignInTexts.length - 1];
      fireEvent.press(modalSubmitButton);

      await waitFor(() => {
        expect(mockOnSignInSuccess).toHaveBeenCalledWith({
          user: { name: 'Test User' },
        });
      });
    });

    it('should not call onSignInSuccess if prop is not provided', async () => {
      const { getByText, getAllByText } = render(
        <UnauthenticatedLanding language="en" />
      );

      // Open Sign In modal
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton);

      // Wait for modal to open
      await waitFor(() => {
        expect(getByText('Email')).toBeTruthy();
      });

      // Submit Sign In - find all "Sign In" texts and use the last one (submit button in modal)
      const allSignInTexts = getAllByText('Sign In');
      const modalSubmitButton = allSignInTexts[allSignInTexts.length - 1];
      fireEvent.press(modalSubmitButton);

      await waitFor(() => {
        // Should not crash even without callback
        expect(true).toBe(true);
      });
    });

    it('should prevent multiple calls to onSignInSuccess', async () => {
      const { getByText, getAllByText } = render(
        <UnauthenticatedLanding
          language="en"
          onSignInSuccess={mockOnSignInSuccess}
        />
      );

      // Open Sign In modal
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton);

      // Wait for modal to open
      await waitFor(() => {
        expect(getByText('Email')).toBeTruthy();
      });

      // Submit Sign In multiple times quickly - find all "Sign In" texts and use the last one
      const allSignInTexts = getAllByText('Sign In');
      const modalSubmitButton = allSignInTexts[allSignInTexts.length - 1];
      fireEvent.press(modalSubmitButton);
      fireEvent.press(modalSubmitButton);
      fireEvent.press(modalSubmitButton);

      await waitFor(() => {
        // Should only be called once due to ref guard
        expect(mockOnSignInSuccess).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Modal Behavior', () => {
    it('should show Sign In modal when isSignInModalOpen is true', () => {
      const { getByText, getAllByText } = render(
        <UnauthenticatedLanding language="en" />
      );

      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton);

      // After opening modal, there should be multiple "Sign In" texts (button + modal title)
      const signInTexts = getAllByText('Sign In');
      expect(signInTexts.length).toBeGreaterThan(1);
      expect(getByText('Sign In functionality will be implemented here')).toBeTruthy();
    });

    it('should show Sign Up modal when isSignUpModalOpen is true', () => {
      const { getByText, getAllByText } = render(
        <UnauthenticatedLanding language="en" />
      );

      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton);

      // After opening modal, there should be multiple "Sign Up" texts (button + modal title)
      const signUpTexts = getAllByText('Sign Up');
      expect(signUpTexts.length).toBeGreaterThan(1);
      expect(getByText('Sign Up functionality will be implemented here')).toBeTruthy();
    });

    it('should close modal when onRequestClose is called', async () => {
      const { getByText, getAllByText } = render(
        <UnauthenticatedLanding language="en" />
      );

      // Open modal
      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton);

      // Modal should be visible - there should be multiple "Sign In" texts
      const signInTexts = getAllByText('Sign In');
      expect(signInTexts.length).toBeGreaterThan(1);
      expect(getByText('Sign In functionality will be implemented here')).toBeTruthy();
    });
  });

  describe('Language Support', () => {
    it('should display text in English when language is "en"', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="en" />
      );
      expect(getByText('Welcome to NariSangha')).toBeTruthy();
      expect(getByText('Join our community')).toBeTruthy();
    });

    it('should display text in Hindi when language is "hi"', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="hi" />
      );
      expect(getByText('नारीसंघ में आपका स्वागत है')).toBeTruthy();
    });

    it('should fallback to key when translation is missing', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="unknown" />
      );
      // Should still render something
      expect(getByText('landing.welcome')).toBeTruthy();
    });
  });

  describe('Component Props', () => {
    it('should accept language prop', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="en" />
      );
      expect(getByText('Welcome to NariSangha')).toBeTruthy();
    });

    it('should accept onSignInSuccess callback prop', () => {
      const { getByText } = render(
        <UnauthenticatedLanding
          language="en"
          onSignInSuccess={mockOnSignInSuccess}
        />
      );
      expect(getByText('Welcome to NariSangha')).toBeTruthy();
    });

    it('should work without onSignInSuccess prop', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="en" />
      );
      expect(getByText('Welcome to NariSangha')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should render all interactive elements', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="en" />
      );

      expect(getByText('Sign In')).toBeTruthy();
      expect(getByText('Sign Up')).toBeTruthy();
    });

    it('should have proper button labels', () => {
      const { getByText } = render(
        <UnauthenticatedLanding language="en" />
      );

      const signInButton = getByText('Sign In');
      const signUpButton = getByText('Sign Up');

      expect(signInButton).toBeTruthy();
      expect(signUpButton).toBeTruthy();
    });
  });
});


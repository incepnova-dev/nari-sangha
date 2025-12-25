/**
 * SignInModal Tests
 * Tests for the SignInModal component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignInModal from '../SignInModal';
import { signIn } from '../../../services';

// Mock the API service
jest.mock('../../../services', () => ({
  signIn: jest.fn(),
}));

// Mock the language utility
jest.mock('../../../i18', () => ({
  getProperty: (key: string, lang: string) => {
    const properties: Record<string, string> = {
      'signin.title': 'Sign In',
      'signin.email.label': 'Email',
      'signin.email.placeholder': 'Enter your email',
      'signin.password.label': 'Password',
      'signin.password.placeholder': 'Enter your password',
      'signin.button.cancel': 'Cancel',
      'signin.button.submit': 'Sign In',
      'signin.button.submitting': 'Signing in...',
    };
    return properties[key] || key;
  },
}));

describe('SignInModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSignInSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <SignInModal
        isOpen={false}
        onClose={mockOnClose}
        language="en"
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders modal when isOpen is true', () => {
    render(
      <SignInModal
        isOpen={true}
        onClose={mockOnClose}
        language="en"
      />
    );
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <SignInModal
        isOpen={true}
        onClose={mockOnClose}
        language="en"
      />
    );
    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    render(
      <SignInModal
        isOpen={true}
        onClose={mockOnClose}
        language="en"
      />
    );
    const backdrop = document.querySelector('.wp-modal-backdrop');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('does not call onClose when modal content is clicked', () => {
    render(
      <SignInModal
        isOpen={true}
        onClose={mockOnClose}
        language="en"
      />
    );
    const modalContent = document.querySelector('.wp-modal');
    if (modalContent) {
      fireEvent.click(modalContent);
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });

  it('updates email field when user types', async () => {
    const user = userEvent.setup();
    render(
      <SignInModal
        isOpen={true}
        onClose={mockOnClose}
        language="en"
      />
    );
    const emailInput = screen.getByPlaceholderText('Enter your email') as HTMLInputElement;
    await user.type(emailInput, 'test@example.com');
    expect(emailInput.value).toBe('test@example.com');
  });

  it('updates password field when user types', async () => {
    const user = userEvent.setup();
    render(
      <SignInModal
        isOpen={true}
        onClose={mockOnClose}
        language="en"
      />
    );
    const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;
    await user.type(passwordInput, 'password123');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls signIn with correct credentials on form submit', async () => {
    const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
    mockSignIn.mockResolvedValue({
      success: true,
      data: { token: 'test-token', user: { name: 'Test User' } },
    });

    const user = userEvent.setup();
    render(
      <SignInModal
        isOpen={true}
        onClose={mockOnClose}
        language="en"
        onSignInSuccess={mockOnSignInSuccess}
      />
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText('Sign In');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('stores token in localStorage on successful sign in', async () => {
    const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
    mockSignIn.mockResolvedValue({
      success: true,
      data: { token: 'test-token', refreshToken: 'refresh-token' },
    });

    const user = userEvent.setup();
    render(
      <SignInModal
        isOpen={true}
        onClose={mockOnClose}
        language="en"
      />
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText('Sign In');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem('authToken')).toBe('test-token');
      expect(localStorage.getItem('refreshToken')).toBe('refresh-token');
    });
  });

  it('calls onSignInSuccess with user data on successful sign in', async () => {
    const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
    const userData = { token: 'test-token', user: { name: 'Test User' } };
    mockSignIn.mockResolvedValue({
      success: true,
      data: userData,
    });

    const user = userEvent.setup();
    render(
      <SignInModal
        isOpen={true}
        onClose={mockOnClose}
        language="en"
        onSignInSuccess={mockOnSignInSuccess}
      />
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText('Sign In');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSignInSuccess).toHaveBeenCalledWith(userData);
    });
  });

  it('displays error message on failed sign in', async () => {
    const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
    mockSignIn.mockResolvedValue({
      success: false,
      error: 'Invalid credentials',
    });

    const user = userEvent.setup();
    render(
      <SignInModal
        isOpen={true}
        onClose={mockOnClose}
        language="en"
      />
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText('Sign In');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('disables form fields and shows loading state during sign in', async () => {
    const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
    let resolveSignIn: (value: any) => void;
    const signInPromise = new Promise((resolve) => {
      resolveSignIn = resolve;
    });
    mockSignIn.mockReturnValue(signInPromise as any);

    const user = userEvent.setup();
    render(
      <SignInModal
        isOpen={true}
        onClose={mockOnClose}
        language="en"
      />
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText('Sign In');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(screen.getByText('Signing in...')).toBeInTheDocument();
    });

    resolveSignIn!({ success: true, data: {} });
  });

  it('clears error when user starts typing', async () => {
    const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
    mockSignIn.mockResolvedValue({
      success: false,
      error: 'Invalid credentials',
    });

    const user = userEvent.setup();
    render(
      <SignInModal
        isOpen={true}
        onClose={mockOnClose}
        language="en"
      />
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const submitButton = screen.getByText('Sign In');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    await user.type(emailInput, 'x');
    await waitFor(() => {
      expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
    });
  });
});


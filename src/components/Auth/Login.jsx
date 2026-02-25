import React, { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

// Constants
const API_DELAY = 1500;
const MIN_PASSWORD_LENGTH = 8;

// Custom Hook for form handling
const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldErrors = validate({ ...values, [name]: e.target.value });
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  }, [values, validate]);

  const handleSubmit = useCallback((onSubmit) => async (e) => {
    e.preventDefault();
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    const formErrors = validate(values);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      await onSubmit(values);
    }
  }, [values, validate]);

  return { values, errors, touched, handleChange, handleBlur, handleSubmit };
};

// Validation logic - Updated for email
const validateLogin = (values) => {
  const errors = {};

  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  return errors;
};

// Reusable Input Component
const FormInput = React.memo(({
  label,
  name,
  type = "text",
  value,
  error,
  touched,
  icon: Icon,
  onChange,
  onBlur,
  rightElement,
  ...props
}) => {
  const hasError = error && touched;
  const isActive = value || document.activeElement?.name === name;

  return (
    <div className="relative group">
      <label
        htmlFor={name}
        className={`absolute left-12 transition-all duration-200 pointer-events-none z-10 ${isActive
          ? "-top-2 text-xs text-emerald-800 bg-white px-1"
          : "top-3.5 text-gray-400"
          }`}
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute left-4 top-3.5 w-5 h-5 transition-colors duration-200 ${hasError ? "text-red-500" : isActive ? "text-emerald-800" : "text-gray-400"
              }`}
          />
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full pl-12 pr-${rightElement ? "12" : "4"} py-3 bg-gray-50 border-2 rounded-xl 
            focus:outline-none focus:bg-white transition-all duration-200 text-gray-800
            ${hasError
              ? "border-red-500 focus:border-red-500 bg-red-50"
              : "border-gray-200 focus:border-emerald-800"
            }`}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-4 top-3.5">
            {rightElement}
          </div>
        )}
      </div>

      {hasError && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

FormInput.displayName = "FormInput";

// Icons as components for better tree-shaking
const MailIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = ({ className, open }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    {open ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    )}
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const Spinner = ({ className }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

// Social Login Buttons
const SocialButton = React.memo(({ provider, onClick, icon: Icon, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center px-4 py-2.5 border-2 border-gray-200 rounded-xl 
      hover:border-emerald-800 hover:bg-emerald-50 transition-all duration-200 group
      focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2
      ${className}`}
    aria-label={`Sign in with ${provider}`}
  >
    <Icon className="w-5 h-5 text-gray-600 group-hover:text-emerald-800 transition-colors" />
  </button>
));

SocialButton.displayName = "SocialButton";

const GoogleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// Main Component
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const initialValues = useMemo(() => ({
    email: "",
    password: "",
    rememberMe: false,
  }), []);

  const onSubmit = useCallback(async (values) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Success handling
      console.log("Login successful:", data);

      // Save token if available
      if (data.token) {
        localStorage.setItem("token", data.token);
      } else if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
      }

      navigate("/dashboard");

    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialValues, validateLogin);

  const onFormSubmit = handleSubmit(onSubmit);

  const isFormValid = useMemo(() => {
    return values.email && values.password &&
      !errors.email && !errors.password;
  }, [values, errors]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSocialLogin = useCallback((provider) => {
    if (provider === "Google") {
      window.location.href = "http://localhost:3000/auth/google";
    }
  }, []);


  return (
    <div className="min-h-screen w-full flex items-center justify-center from-emerald-50 to-teal-100 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" />
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        {/* Decorative top border */}

        <div className="p-8 border-2 border-green-700 rounded-2xl">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-900 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <LockIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>

          </header>

          {/* Error Alert */}
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" role="alert">
              {submitError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={onFormSubmit} className="space-y-5" noValidate>
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={values.email}
              error={errors.email}
              touched={touched.email}
              icon={MailIcon}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              required
            />

            <FormInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              error={errors.password}
              touched={touched.password}
              icon={LockIcon}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="current-password"
              required
              rightElement={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-emerald-800 transition-colors focus:outline-none focus:text-emerald-800"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon className="w-5 h-5" open={showPassword} />
                </button>
              }
            />

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={values.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-emerald-800 focus:ring-emerald-800 cursor-pointer"
                />
                <span className="ml-2 text-gray-600 group-hover:text-emerald-800 transition-colors">
                  Remember me
                </span>
              </label>
              <a
                href="#forgot-password"
                className="text-emerald-800 hover:text-emerald-900 font-medium hover:underline transition-all focus:outline-none focus:ring-2 focus:ring-emerald-800 rounded"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full bg-gradient-to-r from-emerald-900 to-emerald-700 text-white py-3.5 rounded-xl 
                font-semibold shadow-lg hover:shadow-xl hover:from-emerald-800 hover:to-emerald-900 
                transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none 
                flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
            >
              {isLoading ? (
                <>
                  <Spinner className="h-5 w-5 text-white" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="flex items-center justify-center">
            <SocialButton
              className="w-40 max-w-xs"
              provider="Google"
              onClick={() => handleSocialLogin("Google")}
              icon={GoogleIcon}
            />

          </div>

          {/* Footer */}
          <footer className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-emerald-800 hover:text-emerald-900 hover:underline transition-all"
            >
              Sign up
            </Link>
          </footer>

        </div>
      </div>
    </div>
  );
}

export default Login;
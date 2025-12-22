import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useToast } from '../hooks/useToast';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const SignUpForm = ({ onSwitchToSignIn }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation checks
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!acceptTerms) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);
    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      await registerUser(email, password, fullName);
      
      showToast(
        "You’ve successfully created your account. A verification email has been sent. Confirm your email to log in.", 
        "success"
      );
      
      // Navigate user to sign-in view within the same modal
      onSwitchToSignIn();
    } catch (err) {
      let msg = "Something went wrong. Please try again.";
      
      // Specific Firebase Auth error handling
      if (err.code === 'auth/email-already-in-use') {
        msg = "An account with this email already exists.";
      } else if (err.code === 'auth/invalid-email') {
        msg = "Please enter a valid email address.";
      } else if (err.code === 'auth/weak-password') {
        msg = "Password should be at least 6 characters.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">Join Exploration</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 font-bold text-sm">Create an explorer profile to start your journey</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl mb-6 flex items-start gap-3">
          <FaExclamationCircle className="mt-1 text-red-500 shrink-0" />
          <p className="text-xs font-bold text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
            <div className="relative group">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                required 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-blue-950 text-gray-950 dark:text-white rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold" 
                placeholder="Jane" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
            <input 
              type="text" 
              required 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className="w-full px-4 py-3.5 bg-gray-50 dark:bg-blue-950 text-gray-950 dark:text-white rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold" 
              placeholder="Doe" 
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative group">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-blue-950 text-gray-950 dark:text-white rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold" 
              placeholder="name@example.com" 
            />
          </div>
        </div>

        {/* Password Fields */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
          <div className="relative group">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type={showPassword ? "text" : "password"} 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full pl-11 pr-12 py-3.5 bg-gray-50 dark:bg-blue-950 text-gray-950 dark:text-white rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold" 
              placeholder="••••••••" 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
          <div className="relative group">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              required 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="w-full pl-11 pr-12 py-3.5 bg-gray-50 dark:bg-blue-950 text-gray-950 dark:text-white rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold" 
              placeholder="••••••••" 
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 cursor-pointer"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center gap-3 pt-2">
          <div 
            className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${acceptTerms ? 'bg-blue-600 border-blue-600' : 'border-gray-200 dark:border-blue-800'}`}
            onClick={() => setAcceptTerms(!acceptTerms)}
          >
            {acceptTerms && <FaCheckCircle className="text-white text-xs" />}
          </div>
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
            I agree to the <span className="text-blue-600 underline">Terms of Exploration</span>
          </p>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 mt-4 cursor-pointer"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm font-bold text-gray-500 dark:text-gray-400">
        Already joined? <button onClick={onSwitchToSignIn} className="text-blue-600 hover:underline font-black cursor-pointer">Sign in here</button>
      </div>
    </div>
  );
};

export default SignUpForm;
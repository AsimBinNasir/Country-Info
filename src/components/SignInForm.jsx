import React, { useState } from 'react';
import { loginUser, loginWithGoogle, resendVerificationEmail, logoutUser } from '../services/authService';
import { useToast } from '../hooks/useToast';
import { 
  FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash, 
  FaExclamationCircle, FaCopy, FaTools, FaExternalLinkAlt, FaCheck, FaPaperPlane
} from 'react-icons/fa';

/**
 * SignInForm Component
 * Handles Standard Login, Google Login, and Email Verification logic.
 */
const SignInForm = ({ onSuccess, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState(null); // Shape: { message, code, type }
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const currentHostname = window.location.hostname;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await loginUser(email, password);
      
      // Strict Verification Check
      if (!userCredential.user.emailVerified) {
        // We sign them out immediately so they can't bypass the check via refresh
        await logoutUser();
        setError({ 
          message: "Please verify your email address before signing in.", 
          type: 'verification' 
        });
        setLoading(false);
        return;
      }
      
      showToast("Welcome back! You have logged in successfully.", "success");
      onSuccess();
    } catch (err) {
      let msg = "Invalid email or password. Please try again.";
      // Catching specific Firebase Auth codes
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        msg = "Email/Password didn't match";
      }
      setError({ message: msg, code: err.code });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      showToast("Welcome back! You have logged in successfully.", "success");
      onSuccess();
    } catch (err) {
      setError({ message: "Google Sign-In failed. Please try again.", code: err.code });
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await resendVerificationEmail(email, password);
      showToast("Verification link sent! Check your inbox.", "info");
      setError(null);
    } catch (err) {
      // Fixed: Now using 'err' to log the error, satisfying ESLint
      console.error("Resend verification error:", err);
      showToast("Failed to resend. Please check your credentials.", "error");
    } finally {
      setResending(false);
    }
  };

  const isUnauthorized = error?.code === 'auth/unauthorized-domain';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 font-bold text-sm">Sign in to continue your journey</p>
      </div>

      {/* Developer Helper: Shown when the Firebase domain is not whitelisted */}
      {isUnauthorized ? (
        <div className="bg-amber-50 border-2 border-amber-400 p-5 mb-6 rounded-2xl">
          <div className="flex items-start gap-3">
            <FaTools className="mt-1 text-amber-600" />
            <div className="flex-1">
              <p className="text-xs font-black text-amber-900 uppercase mb-2 tracking-tighter">Domain Whitelist Required</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 bg-white border border-amber-200 px-3 py-2 rounded-lg font-mono text-[10px] font-bold text-blue-700 truncate">
                  {currentHostname}
                </div>
                <button 
                  onClick={() => { 
                    navigator.clipboard.writeText(currentHostname); 
                    setCopied(true); 
                    setTimeout(() => setCopied(false), 2000); 
                  }}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg text-[10px] font-black cursor-pointer"
                >
                  {copied ? <FaCheck /> : <FaCopy />}
                </button>
              </div>
              <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-[10px] font-bold text-blue-700 underline flex items-center gap-1">
                Open Firebase Console <FaExternalLinkAlt />
              </a>
            </div>
          </div>
        </div>
      ) : error && (
        /* Standard Error or Verification Notice */
        <div className={`border-l-4 p-4 rounded-xl mb-6 flex flex-col gap-3 ${error.type === 'verification' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-red-50 border-red-500 text-red-700'}`}>
          <div className="flex items-start gap-3">
            <FaExclamationCircle className="mt-1 shrink-0" />
            <p className="text-xs font-bold">{error.message}</p>
          </div>
          {error.type === 'verification' && (
            <button 
              onClick={handleResend} 
              type="button"
              disabled={resending} 
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer self-start"
            >
              <FaPaperPlane className={resending ? 'animate-bounce' : ''} /> 
              {resending ? 'Sending...' : 'Resend Link'}
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
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

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 mt-4 cursor-pointer"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
        </div>
        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
          <span className="px-4 bg-white dark:bg-blue-900 text-gray-400">Or continue with</span>
        </div>
      </div>

      <button 
        onClick={handleGoogleLogin} 
        type="button"
        className="w-full py-4 flex items-center justify-center gap-3 bg-white dark:bg-blue-950 text-gray-700 dark:text-white border-2 border-gray-100 dark:border-blue-800 font-black rounded-xl hover:bg-gray-50 dark:hover:bg-blue-900 hover:border-blue-600 transition-all active:scale-[0.98] cursor-pointer"
      >
        <FaGoogle className="text-red-500" /> Continue with Google
      </button>

      <div className="mt-8 text-center text-sm font-bold text-gray-500 dark:text-gray-400">
        New explorer? <button onClick={onSwitchToSignUp} className="text-blue-600 hover:underline font-black cursor-pointer">Create account</button>
      </div>
    </div>
  );
};

export default SignInForm;
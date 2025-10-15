/**
 * Sign Up Page
 * 
 * Custom sign-up page with Clerk authentication
 */

import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-[#0D0E1C] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            VNC SOAR Platform
          </h1>
          <p className="text-gray-400">
            Join the Security Operations Center
          </p>
        </div>
        
        {/* Clerk Sign Up Component */}
        <div className="flex justify-center">
          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-[#17182F] border border-white/10 shadow-2xl',
                headerTitle: 'text-white',
                headerSubtitle: 'text-gray-400',
                socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10',
                formButtonPrimary: 'bg-purple-500 hover:bg-purple-600',
                formFieldInput: 'bg-white/5 border-white/10 text-white',
                formFieldLabel: 'text-gray-300',
                footerActionLink: 'text-purple-400 hover:text-purple-300',
                identityPreviewText: 'text-white',
                identityPreviewEditButton: 'text-purple-400',
              },
            }}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl="/dashboard"
          />
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          By signing up, you agree to our Terms of Service
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

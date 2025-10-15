/**
 * User Button Component
 * 
 * Wrapper for Clerk's UserButton with custom styling
 */

import React from 'react';
import { UserButton as ClerkUserButton } from '@clerk/clerk-react';

const UserButton = () => {
  return (
    <ClerkUserButton
      appearance={{
        elements: {
          avatarBox: 'w-10 h-10',
          userButtonPopoverCard: 'bg-[#17182F] border border-white/10',
          userButtonPopoverActionButton: 'hover:bg-white/5',
          userButtonPopoverActionButtonText: 'text-gray-300',
          userButtonPopoverFooter: 'hidden',
        },
      }}
      afterSignOutUrl="/sign-in"
    />
  );
};

export default UserButton;

/**
 * User Management Service
 * 
 * This service handles communication with the backend API for user management.
 * In production, you need to set up a backend API that uses Clerk's Backend SDK
 * to manage users.
 * 
 * Backend Setup Required:
 * 1. Create a Node.js/Express backend
 * 2. Install @clerk/backend SDK
 * 3. Implement the following endpoints:
 *    - GET /api/users - List all users
 *    - GET /api/users/:id - Get user details
 *    - PATCH /api/users/:id - Update user (role, metadata)
 *    - DELETE /api/users/:id - Delete user
 * 
 * Example Backend Implementation:
 * ```javascript
 * import { clerkClient } from '@clerk/backend';
 * 
 * // List users
 * app.get('/api/users', async (req, res) => {
 *   const users = await clerkClient.users.getUserList();
 *   res.json(users);
 * });
 * 
 * // Update user
 * app.patch('/api/users/:id', async (req, res) => {
 *   const { role, banned } = req.body;
 *   const user = await clerkClient.users.updateUser(req.params.id, {
 *     publicMetadata: { role },
 *     banned
 *   });
 *   res.json(user);
 * });
 * 
 * // Delete user
 * app.delete('/api/users/:id', async (req, res) => {
 *   await clerkClient.users.deleteUser(req.params.id);
 *   res.json({ success: true });
 * });
 * ```
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

/**
 * Fetch all users from Clerk via backend API
 */
export const fetchUsers = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Update a user's role and status
 */
export const updateUser = async (userId, updates, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Delete a user
 */
export const deleteUser = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

/**
 * Get a single user by ID
 */
export const getUser = async (userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

/**
 * Transform Clerk user object to our app format
 */
export const transformClerkUser = (clerkUser, defaultRole = 'viewer') => {
  return {
    id: clerkUser.id,
    name: clerkUser.firstName && clerkUser.lastName 
      ? `${clerkUser.firstName} ${clerkUser.lastName}` 
      : clerkUser.username || clerkUser.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'Unknown User',
    email: clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses?.[0]?.emailAddress || 'No email',
    role: clerkUser.publicMetadata?.role || defaultRole,
    status: clerkUser.banned ? 'inactive' : 'active',
    lastActive: clerkUser.lastSignInAt ? new Date(clerkUser.lastSignInAt) : null,
    createdAt: new Date(clerkUser.createdAt),
    imageUrl: clerkUser.imageUrl || clerkUser.profileImageUrl,
  };
};

# Backend API Setup for User Management

This guide explains how to set up a backend API to enable user management features in the VNC SOAR Dashboard.

## Why Do We Need a Backend?

Clerk's React SDK only allows managing the currently logged-in user from the frontend. To manage all users (list, update roles, delete), you need to use Clerk's Backend SDK from a secure server environment.

## Quick Setup Guide

### Option 1: Node.js/Express Backend (Recommended)

1. **Create a new backend project:**
```bash
mkdir vnc-dashboard-backend
cd vnc-dashboard-backend
npm init -y
```

2. **Install dependencies:**
```bash
npm install express @clerk/backend cors dotenv
```

3. **Create `.env` file:**
```env
CLERK_SECRET_KEY=your_clerk_secret_key_here
PORT=3001
ALLOWED_ORIGIN=http://localhost:3000
```

4. **Create `server.js`:**
```javascript
import express from 'express';
import { clerkClient } from '@clerk/backend';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

// Verify Clerk token middleware
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify the token with Clerk
    const verified = await clerkClient.verifyToken(token);
    req.userId = verified.sub;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// List all users
app.get('/api/users', verifyToken, async (req, res) => {
  try {
    const users = await clerkClient.users.getUserList({
      limit: 100,
      orderBy: '-created_at'
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get single user
app.get('/api/users/:id', verifyToken, async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.params.id);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user (role and banned status)
app.patch('/api/users/:id', verifyToken, async (req, res) => {
  try {
    const { role, banned } = req.body;
    
    const updateData = {};
    if (role !== undefined) {
      updateData.publicMetadata = { role };
    }
    if (banned !== undefined) {
      updateData.banned = banned;
    }

    const user = await clerkClient.users.updateUser(req.params.id, updateData);
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
app.delete('/api/users/:id', verifyToken, async (req, res) => {
  try {
    await clerkClient.users.deleteUser(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend API running on http://localhost:${PORT}`);
});
```

5. **Update `package.json`:**
```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

6. **Run the backend:**
```bash
npm start
```

7. **Update your React app's `.env`:**
```env
REACT_APP_CLERK_PUBLISHABLE_KEY=your_publishable_key
REACT_APP_API_URL=http://localhost:3001
```

---

### Option 2: Serverless Functions (Vercel/Netlify)

Create API routes in your deployment platform:

**`/api/users.js` (Vercel/Netlify):**
```javascript
import { clerkClient } from '@clerk/backend';

export default async function handler(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await clerkClient.verifyToken(token);
    
    if (req.method === 'GET') {
      const users = await clerkClient.users.getUserList();
      return res.json(users);
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

---

## Getting Your Clerk Secret Key

1. Go to https://dashboard.clerk.com
2. Select your application
3. Go to **API Keys** in the left sidebar
4. Copy the **Secret Key** (starts with `sk_test_` or `sk_live_`)
5. ⚠️ **Never expose this key in your frontend code!**

---

## Testing the API

Once your backend is running, test the endpoints:

```bash
# Get authentication token from your browser
# Open DevTools → Application → Cookies → __session

# List users
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3001/api/users

# Update user role
curl -X PATCH \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role":"admin"}' \
  http://localhost:3001/api/users/user_123

# Delete user
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/users/user_123
```

---

## Security Best Practices

1. **Always verify tokens** on the backend before processing requests
2. **Rate limit** your API endpoints to prevent abuse
3. **Log all user management actions** for audit trails
4. **Restrict user management** to super admins only
5. **Use HTTPS** in production
6. **Implement CORS** properly to only allow your frontend domain

---

## Current Behavior Without Backend

Without a backend API, the User Management page will:
- Show only the currently logged-in user
- Display an error message explaining the backend is needed
- Provide a link to Clerk Dashboard for manual user management
- Still allow profile editing for the current user

---

## Questions?

Refer to Clerk's documentation:
- [Backend SDK](https://clerk.com/docs/references/backend/overview)
- [User Management](https://clerk.com/docs/users/overview)
- [API Reference](https://clerk.com/docs/reference/backend-api)

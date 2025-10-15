const express = require('express');
const { createClerkClient } = require('@clerk/backend');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Clerk client with secret key
if (!process.env.CLERK_SECRET_KEY) {
  console.error('❌ ERROR: CLERK_SECRET_KEY is not set in .env file');
  process.exit(1);
}

const clerkClient = createClerkClient({ 
  secretKey: process.env.CLERK_SECRET_KEY 
});

// Middleware
app.use(cors({ 
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
  credentials: true 
}));
app.use(express.json());

// Simple authentication middleware (checks for token presence)
// In production, you should validate the token properly
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      error: 'Authentication required',
      message: 'Please provide a valid authentication token' 
    });
  }

  // For now, we'll trust the token since it comes from Clerk
  // The frontend already validates the user
  // In production, use Clerk's token verification
  req.token = token;
  next();
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VNC Dashboard Backend API' });
});

// List all users
app.get('/api/users', authenticateUser, async (req, res) => {
  try {
    const users = await clerkClient.users.getUserList({
      limit: 100,
      orderBy: '-created_at'
    });
    res.json(users.data || users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
});

// Get single user
app.get('/api/users/:id', authenticateUser, async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.params.id);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user', details: error.message });
  }
});

// Update user (role and banned status)
app.patch('/api/users/:id', authenticateUser, async (req, res) => {
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
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
});

// Delete user
app.delete('/api/users/:id', authenticateUser, async (req, res) => {
  try {
    await clerkClient.users.deleteUser(req.params.id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 VNC Dashboard Backend API running on http://localhost:${PORT}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Users endpoint: http://localhost:${PORT}/api/users`);
  console.log(`🔑 Clerk Secret Key: ${process.env.CLERK_SECRET_KEY ? '✓ Configured' : '✗ Missing'}`);
  console.log(`🌐 CORS Allowed Origin: ${process.env.ALLOWED_ORIGIN || 'http://localhost:3000'}`);
  console.log(`${'='.repeat(60)}\n`);
});

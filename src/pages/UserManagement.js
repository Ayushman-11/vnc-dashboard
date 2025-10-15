import React, { useState, useEffect } from 'react';
import { FiUserPlus, FiSearch, FiEdit2, FiTrash2, FiShield, FiMail, FiClock, FiAlertCircle } from 'react-icons/fi';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Card, Button, SearchBar, Table, Badge, Modal, Dropdown, ConfirmModal, SuccessModal } from '../components/common';
import { RoleBadge } from '../components/auth';
import { formatDateTime } from '../utils';
import { ROLES, ROLE_CONFIG } from '../utils/permissions';

const UserManagement = () => {
  const { user: currentUser } = useUser();
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editFormData, setEditFormData] = useState({
    role: '',
    status: 'active',
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  // Fetch users from Clerk
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the session token to make authenticated requests
        const token = await getToken();

        if (!token) {
          throw new Error('No authentication token available');
        }

        // Fetch users from Clerk Backend API
        // Note: This requires setting up a backend endpoint or using Clerk's Backend SDK
        // For now, we'll use the organization members if available, or fetch from your backend
        const response = await fetch(`${API_URL}/api/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        
        // Transform Clerk user data to our format
        const transformedUsers = data.map(clerkUser => ({
          id: clerkUser.id,
          name: clerkUser.firstName && clerkUser.lastName 
            ? `${clerkUser.firstName} ${clerkUser.lastName}` 
            : clerkUser.username || 'Unknown User',
          email: clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses?.[0]?.emailAddress || 'No email',
          role: clerkUser.publicMetadata?.role || ROLES.VIEWER,
          status: clerkUser.banned ? 'inactive' : 'active',
          lastActive: clerkUser.lastSignInAt ? new Date(clerkUser.lastSignInAt) : null,
          createdAt: new Date(clerkUser.createdAt),
          imageUrl: clerkUser.imageUrl,
        }));

        setUsers(transformedUsers);
        setFilteredUsers(transformedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        
        // Fallback to mock data if API fails (for development)
        const mockUsers = [
          {
            id: currentUser?.id || 'user_current',
            name: currentUser?.fullName || 'Current User',
            email: currentUser?.primaryEmailAddress?.emailAddress || 'user@example.com',
            role: currentUser?.publicMetadata?.role || ROLES.SUPER_ADMIN,
            status: 'active',
            lastActive: new Date(),
            createdAt: new Date(currentUser?.createdAt || Date.now()),
            imageUrl: currentUser?.imageUrl,
          },
        ];
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser, getToken]);

  // Filter users
  useEffect(() => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRole) {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }

    setFilteredUsers(filtered);
  }, [searchQuery, selectedRole, users]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditFormData({
      role: user.role,
      status: user.status,
    });
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Get the session token
      const token = await getToken();

      if (!token) {
        throw new Error('No authentication token available');
      }

      // Update user role via backend API
      const response = await fetch(`${API_URL}/api/users/${selectedUser.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: editFormData.role,
          banned: editFormData.status === 'inactive',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      // Update user in local state
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, role: editFormData.role, status: editFormData.status }
          : user
      ));

      setShowEditModal(false);
      setSuccessMessage(`User ${selectedUser.name} has been updated successfully. Changes will take effect on next login.`);
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Error updating user:', err);
      alert(`Failed to update user: ${err.message}`);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      // Get the session token
      const token = await getToken();

      if (!token) {
        throw new Error('No authentication token available');
      }

      // Delete user via backend API
      const response = await fetch(`${API_URL}/api/users/${selectedUser.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove user from local state
      setUsers(users.filter(user => user.id !== selectedUser.id));
      
      setShowDeleteModal(false);
      setSuccessMessage(`User ${selectedUser.name} has been deleted successfully.`);
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Error deleting user:', err);
      alert(`Failed to delete user: ${err.message}`);
    }
  };

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: ROLES.SUPER_ADMIN, label: 'Super Admin' },
    { value: ROLES.ADMIN, label: 'Admin' },
    { value: ROLES.ANALYST, label: 'Analyst' },
    { value: ROLES.VIEWER, label: 'Viewer' },
  ];

  const statistics = [
    {
      label: 'Total Users',
      value: users.length.toString(),
      icon: FiShield,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Active Users',
      value: users.filter(u => u.status === 'active').length.toString(),
      icon: FiMail,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Admins',
      value: users.filter(u => u.role === ROLES.ADMIN || u.role === ROLES.SUPER_ADMIN).length.toString(),
      icon: FiShield,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      label: 'Analysts',
      value: users.filter(u => u.role === ROLES.ANALYST).length.toString(),
      icon: FiClock,
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  const columns = [
    {
      header: 'User',
      accessor: 'user',
      render: (row) => (
        <div className="flex items-center gap-3">
          {row.imageUrl ? (
            <img 
              src={row.imageUrl} 
              alt={row.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              {row.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="text-white font-medium">{row.name}</div>
            <div className="text-gray-400 text-sm">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessor: 'role',
      render: (row) => <RoleBadge role={row.role} size="sm" />,
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'success' : 'default'}>
          {row.status === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      header: 'Last Active',
      accessor: 'lastActive',
      render: (row) => (
        <span className="text-gray-400 text-sm">
          {formatDateTime(row.lastActive)}
        </span>
      ),
    },
    {
      header: 'Created',
      accessor: 'createdAt',
      render: (row) => (
        <span className="text-gray-400 text-sm">
          {formatDateTime(row.createdAt)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all group relative"
            onClick={() => handleEditUser(row)}
            title="Edit User"
          >
            <FiEdit2 className="text-lg" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
              Edit User
            </span>
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all group relative"
            onClick={() => handleDeleteUser(row)}
            title="Delete User"
          >
            <FiTrash2 className="text-lg" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
              Delete User
            </span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage users, roles, and permissions</p>
        </div>
        <Button 
          variant="primary" 
          icon={FiUserPlus}
          onClick={() => window.open('https://dashboard.clerk.com', '_blank')}
        >
          Add User in Clerk
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Card className="bg-red-500/10 border-red-500/30">
          <div className="flex items-center gap-3 text-red-400">
            <FiAlertCircle className="text-2xl flex-shrink-0" />
            <div>
              <p className="font-semibold">Failed to load users from Clerk</p>
              <p className="text-sm text-red-300 mt-1">
                {error}. Showing current user only. Please set up a backend API endpoint at <code className="bg-red-500/20 px-1 rounded">/api/users</code> to fetch all users.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Loading State */}
      {loading ? (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <p className="text-gray-400">Loading users from Clerk...</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statistics.map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                    <stat.icon className="text-white text-xl" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <SearchBar 
                  placeholder="Search users by name or email..."
                  onSearch={handleSearch}
                />
              </div>
              <div className="w-full md:w-48">
                <Dropdown
                  options={roleOptions}
                  value={selectedRole}
                  onChange={handleRoleFilter}
                />
              </div>
            </div>
          </Card>

          {/* Users Table */}
          <Card>
            <Table 
              columns={columns} 
              data={filteredUsers}
              emptyMessage="No users found"
            />
          </Card>
        </>
      )}

      {/* Edit User Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit User"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              User
            </label>
            <div className="flex items-center gap-3 p-3 bg-[#1a1b35] rounded-lg">
              {selectedUser?.imageUrl ? (
                <img 
                  src={selectedUser.imageUrl} 
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  {selectedUser?.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="text-white font-medium">{selectedUser?.name}</div>
                <div className="text-gray-400 text-sm">{selectedUser?.email}</div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              value={editFormData.role}
              onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
              className="w-full px-4 py-2 bg-[#1a1b35] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value={ROLES.VIEWER}>Viewer</option>
              <option value={ROLES.ANALYST}>Analyst</option>
              <option value={ROLES.ADMIN}>Admin</option>
              <option value={ROLES.SUPER_ADMIN}>Super Admin</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Note: Role changes will take effect on next user login
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={editFormData.status}
              onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
              className="w-full px-4 py-2 bg-[#1a1b35] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowEditModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveEdit} className="flex-1">
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
        confirmText="Delete User"
        variant="danger"
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />
    </div>
  );
};

export default UserManagement;

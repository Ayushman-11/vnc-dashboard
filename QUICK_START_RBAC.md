# 🚀 Quick Start Guide - RBAC Implementation

## ✅ What's Been Implemented

Your VNC SOAR Dashboard now has **complete Role-Based Access Control (RBAC)** with Clerk authentication!

### Features Added:
- ✅ Clerk authentication integration
- ✅ 4-tier role system (Super Admin, Admin, Analyst, Viewer)
- ✅ Protected routes with permission checks
- ✅ Role-based sidebar menu filtering
- ✅ Permission gate component for conditional rendering
- ✅ Custom sign-in/sign-up pages with dark theme
- ✅ Unauthorized access page
- ✅ User role badge display

---

## 🎯 Next Steps

### Step 1: Start the Development Server

```bash
cd "c:\Users\ayush\OneDrive\Desktop\VNC\vnc-dashboard"
npm start
```

The app will open at `http://localhost:3000` and redirect you to `/sign-in`

---

### Step 2: Create Your First User

1. Click **"Sign Up"** on the sign-in page
2. Enter your email and create a password
3. Complete the email verification
4. You'll be redirected to the dashboard

**Default Role**: New users get `viewer` role automatically

---

### Step 3: Assign Role in Clerk Dashboard

To give yourself admin permissions:

1. Go to **[Clerk Dashboard](https://dashboard.clerk.com/)**
2. Navigate to **Users**
3. Click on your user account
4. Go to the **"Metadata"** tab
5. Under **"Public Metadata"**, click **"Edit"**
6. Add this JSON:
   ```json
   {
     "role": "super_admin"
   }
   ```
7. Click **"Save"**
8. **Refresh** your VNC SOAR Dashboard

**Available Roles:**
- `super_admin` - Full access including user management
- `admin` - Management access (no user management)
- `analyst` - Operational access (investigate/resolve)
- `viewer` - Read-only access

---

### Step 4: Verify RBAC is Working

After setting your role, check:

1. **Sidebar Menu**:
   - Your name and role badge appear at the top
   - Menu items are filtered based on your role
   - Super admins see "User Management" link

2. **Dashboard Access**:
   - Try accessing different pages
   - Verify you can see all pages with admin/super_admin role

3. **Action Buttons**:
   - Currently all visible (need to add PermissionGates)
   - This is the next phase of implementation

---

## 📋 What Needs to Be Done Next

### Phase 1: Add Permission Gates to Existing Pages ⏳

Update these files to wrap action buttons with `PermissionGate`:

#### 1. Sessions Page
File: `src/pages/Sessions.js`

Add to imports:
```javascript
import { PermissionGate } from '../components/common';
import { PERMISSIONS } from '../utils/permissions';
```

Wrap the Block IP button:
```javascript
<PermissionGate permission={PERMISSIONS.BLOCK_IPS}>
  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-all group relative"
    onClick={() => handleBlockIP(row)}>
    <FiShield className="text-lg" />
    <span className="tooltip">Block IP</span>
  </button>
</PermissionGate>
```

Wrap the Terminate button:
```javascript
<PermissionGate permission={PERMISSIONS.TERMINATE_SESSIONS}>
  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all group relative"
    onClick={() => handleTerminate(row)}>
    <FiX className="text-lg" />
    <span className="tooltip">Terminate</span>
  </button>
</PermissionGate>
```

#### 2. Alerts Page
File: `src/pages/Alerts.js`

Wrap action buttons (Investigate, Resolve, Dismiss) with appropriate permissions:
- `PERMISSIONS.INVESTIGATE_ALERTS`
- `PERMISSIONS.RESOLVE_ALERTS`
- `PERMISSIONS.DISMISS_ALERTS`

#### 3. Firewall Page
File: `src/pages/Firewall.js`

Wrap Add Rule button and action buttons with permissions:
- `PERMISSIONS.ADD_FIREWALL_RULES`
- `PERMISSIONS.TOGGLE_FIREWALL_RULES`
- `PERMISSIONS.DELETE_FIREWALL_RULES`

---

### Phase 2: Create Settings Page ⏳

Create `src/pages/Settings.js` with sections:
- Profile & Account (all users)
- Alert Configuration (admin+ only)
- System Settings (super admin only)

---

### Phase 3: Create User Management Page ⏳

Create `src/pages/UserManagement.js` (super admin only):
- List all users from Clerk
- View/edit user roles
- Deactivate users

---

## 🧪 Testing Different Roles

To test how different roles experience the app:

1. **Create Multiple Test Accounts**:
   - Sign up with different emails
   - Assign different roles in Clerk Dashboard

2. **Test Each Role**:
   ```
   viewer     → Can only view data, no action buttons
   analyst    → Can investigate/resolve alerts, cannot terminate
   admin      → Can do everything except user management
   super_admin → Full access including user management
   ```

3. **Try Accessing Unauthorized Routes**:
   - As a `viewer`, try manually navigating to `/users`
   - You should see the "Unauthorized" page

---

## 🔐 Permission Reference

### Quick Permission Guide

| Action | Permission Constant | Who Has Access |
|--------|-------------------|----------------|
| View Dashboard | `PERMISSIONS.VIEW_DASHBOARD` | All |
| View Alerts | `PERMISSIONS.VIEW_ALERTS` | All |
| Investigate Alert | `PERMISSIONS.INVESTIGATE_ALERTS` | Analyst+ |
| Resolve Alert | `PERMISSIONS.RESOLVE_ALERTS` | Analyst+ |
| Block IP | `PERMISSIONS.BLOCK_IPS` | Admin+ |
| Terminate Session | `PERMISSIONS.TERMINATE_SESSIONS` | Admin+ |
| Add Firewall Rule | `PERMISSIONS.ADD_FIREWALL_RULES` | Admin+ |
| Delete Firewall Rule | `PERMISSIONS.DELETE_FIREWALL_RULES` | Admin+ |
| Manage Users | `PERMISSIONS.MANAGE_USERS` | Super Admin |

---

## 🐛 Troubleshooting

### Issue: "Missing Clerk Publishable Key" Error
**Solution**: Make sure `.env` file has:
```env
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_cHJlY2lzZS1sYW1wcmV5LTY4LmNsZXJrLmFjY291bnRzLmRldiQ
```

### Issue: Stuck on Loading Screen
**Solution**: 
1. Check browser console for errors
2. Verify Clerk keys are correct
3. Make sure you're logged in to Clerk

### Issue: Role Not Updating
**Solution**:
1. After changing role in Clerk Dashboard, **hard refresh** (Ctrl+Shift+R)
2. Or sign out and sign back in

### Issue: All Menu Items Hidden
**Solution**: 
- Check that your role is set correctly in Clerk
- Default role is `viewer` if no role is set
- Make sure JSON in publicMetadata is valid

---

## 📚 Documentation Files

- **RBAC_IMPLEMENTATION.md** - Detailed implementation guide
- **DESIGN_SYSTEM.md** - UI/UX design guidelines
- **README.md** - Project overview
- **.design-system-reference.txt** - Quick reference

---

## 💡 Tips

1. **Always test with multiple roles** before deploying
2. **Use PermissionGate liberally** - wrap any action that should be restricted
3. **Check permissions on both frontend AND backend** (when you build the API)
4. **Log all privileged actions** for security auditing
5. **Review Clerk documentation** for advanced features

---

## 🎉 You're All Set!

Your RBAC system is now:
- ✅ **Configured** with Clerk
- ✅ **Integrated** into the app
- ✅ **Protected** all routes
- ✅ **Role-aware** sidebar

**Next**: Add `PermissionGate` components to restrict action buttons based on roles!

---

**Questions?** Check the documentation or the detailed implementation in the source files.

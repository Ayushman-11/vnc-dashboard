# VNC Data Exfiltration SOAR Platform

A modern, real-time Security Orchestration, Automation, and Response (SOAR) platform for VNC Data Exfiltration detection. Features a polished dark-themed UI with comprehensive monitoring, automated response capabilities, role-based access control (RBAC), and intuitive security workflows.

## 🎯 Project Overview

This platform provides enterprise-grade monitoring and automated response capabilities for VNC server security, including:

- **Real-time Monitoring**: Live VNC session tracking with risk assessment and data transfer monitoring
- **User Behavior Analytics**: Anomaly detection with risk scoring and threat classification
- **Automated Response**: Dynamic firewall rule management and instant session termination
- **Alert Management**: Multi-severity alert system with complete lifecycle tracking
- **Role-Based Access Control (RBAC)**: 4-tier permission system with Clerk authentication
- **User Management**: Centralized user administration with role assignment
- **Comprehensive Settings**: 9-section configuration management for system-wide preferences
- **Interactive Dashboard**: Modern dark-themed UI with gradient accents and real-time metrics
- **Professional UX**: Icon-based actions with tooltips, responsive design, and smooth transitions

## 🔐 Security & Authentication

### Clerk Integration
The platform uses **Clerk** for enterprise-grade authentication and user management:
- **Sign Up/Sign In**: Secure authentication with email/password or OAuth providers
- **User Profiles**: Managed through Clerk Dashboard with avatar support
- **Token-based Auth**: JWT tokens for secure API communication
- **Session Management**: Automatic token refresh and secure session handling

### Role-Based Access Control (RBAC)

#### 4-Tier Permission System
1. **Super Admin** 🔴
   - Full system access
   - User management (create, edit, delete users)
   - System configuration and audit logs
   - All operational permissions

2. **Admin** 🟠
   - Alert configuration and management
   - Firewall rule management
   - Session monitoring and control
   - Limited to operational tasks (no user management)

3. **Analyst** 🟡
   - Alert investigation and resolution
   - Session monitoring (read-only)
   - Cannot modify firewall rules or system settings

4. **Viewer** 🟢
   - Read-only access to all dashboards
   - No action buttons or modification capabilities
   - View-only permissions across all pages

#### Permission Enforcement
All action buttons are wrapped with `<PermissionGate>` components that:
- Show/hide actions based on user role
- Maintain UI alignment with fallback elements
- Prevent unauthorized API calls
- Display appropriate error messages for insufficient permissions

### Backend API Authentication
Express.js backend with Clerk Backend SDK:
- JWT token verification on all endpoints
- Secure user data retrieval from Clerk
- Role-based endpoint access control
- Environment variable protection for secrets

## 🏗️ Architecture

### Frontend (React)
- **Framework**: React 19.2.0 with functional components and hooks
- **Authentication**: Clerk React SDK (@clerk/clerk-react) for user management
- **Routing**: React Router DOM with protected routes
- **State Management**: Zustand for efficient global state management
- **Styling**: Tailwind CSS v3.4.0 with custom dark theme and gradient system
- **UI Components**: Custom modal system (base, confirm, success) with animations
- **Icons**: Feather Icons (react-icons/fi) for consistent iconography
- **Design Pattern**: Card-based layouts with glass-morphism effects
- **Interactions**: Icon-only action buttons with hover tooltips
- **Animations**: Smooth transitions, fade-ins, and hover effects
- **RBAC**: Custom permission hooks and PermissionGate component

### Backend (Node.js/Express)
- **Framework**: Express.js v5.1.0
- **Authentication**: Clerk Backend SDK (@clerk/backend v2.18.0)
- **JWT Verification**: Token-based authentication middleware
- **CORS**: Configured for frontend communication
- **Environment**: dotenv for secure configuration
- **API Structure**: RESTful endpoints for user management
- **Port**: 3001 (configurable via environment variables)

### Planned Microservices (Future)
- **Data Ingestion Service**: Log file monitoring and parsing
- **UBA Service**: Anomaly detection and behavior analysis
- **Orchestration & Response Service**: Automated action execution
- **Session & Alert Service**: Extended REST API for data persistence
- **WebSocket Service**: Real-time updates to frontend
- **Message Broker**: Apache Kafka / RabbitMQ
- **Database**: PostgreSQL / MongoDB
- **Monitoring**: Prometheus + Grafana + ELK Stack

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Clerk account (for authentication)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vnc-dashboard
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd vnc-dashboard-backend
npm install
cd ..
```

### Configuration

#### Frontend Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
REACT_APP_API_URL=http://localhost:3001
```

#### Backend Environment Variables
Create a `.env` file in the `vnc-dashboard-backend/` directory:
```env
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
PORT=3001
```

#### Getting Clerk Keys
1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Go to **API Keys** section
4. Copy the **Publishable Key** (starts with `pk_test_`)
5. Copy the **Secret Key** (starts with `sk_test_`)
6. Add these keys to the respective `.env` files

### Development

1. Start the backend server:
```bash
cd vnc-dashboard-backend
npm start
```
The backend will run at http://localhost:3001

2. In a new terminal, start the frontend:
```bash
npm start
```
The application will open at http://localhost:3000

### Build

Create a production build:
```bash
npm run build
```

## 📁 Project Structure

```
vnc-dashboard/
├── public/                 # Static assets
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/        # React components
│   │   ├── common/       # Reusable UI components
│   │   │   ├── Button.js
│   │   │   ├── Card.js
│   │   │   ├── MetricCard.js        # Gradient-themed metric cards
│   │   │   ├── Table.js
│   │   │   ├── Modal.js              # Base modal component
│   │   │   ├── ConfirmModal.js       # Confirmation dialogs
│   │   │   ├── SuccessModal.js       # Success notifications
│   │   │   ├── SearchBar.js          # Search component
│   │   │   ├── Dropdown.js           # Dropdown component
│   │   │   ├── Badge.js              # Status badges
│   │   │   ├── PermissionGate.js     # RBAC enforcement component
│   │   │   └── index.js
│   │   ├── auth/         # Authentication components
│   │   │   ├── UserButton.js         # User profile dropdown
│   │   │   ├── RoleBadge.js          # Role display badge
│   │   │   └── index.js
│   │   └── dashboard/    # Dashboard-specific components
│   │       ├── RecentAlerts.js       # Recent alerts widget
│   │       ├── SessionsTable.js      # Active sessions widget
│   │       ├── TrafficChart.js       # Traffic visualization
│   │       ├── AlertsSeverityChart.js # Alert severity chart
│   │       ├── AlertsStatusChart.js  # Alert status chart
│   │       └── index.js
│   ├── auth/             # Route protection
│   │   └── ProtectedRoute.js        # RBAC route wrapper
│   ├── layouts/          # Page layouts
│   │   └── MainLayout.js            # Sidebar + main content
│   ├── pages/            # Main application pages
│   │   ├── Dashboard.js             # Main dashboard with metrics
│   │   ├── Sessions.js              # VNC sessions management
│   │   ├── Alerts.js                # Alert management with lifecycle
│   │   ├── Firewall.js              # Firewall rules management
│   │   ├── Settings.js              # Comprehensive settings (9 sections)
│   │   ├── UserManagement.js        # User administration (Super Admin)
│   │   ├── SignIn.js                # Clerk sign-in page
│   │   ├── SignUp.js                # Clerk sign-up page
│   │   ├── Unauthorized.js          # Access denied page
│   │   └── index.js
│   ├── services/         # API service layer
│   │   ├── apiClient.js             # HTTP client configuration
│   │   ├── userService.js           # User API calls
│   │   ├── alertService.js          # Alert API calls
│   │   ├── sessionService.js        # Session API calls
│   │   ├── firewallService.js       # Firewall API calls
│   │   ├── metricsService.js        # Metrics API calls
│   │   ├── websocketService.js      # WebSocket connection
│   │   └── index.js
│   ├── store/            # Zustand state management
│   │   ├── alertStore.js            # Alert state and actions
│   │   ├── sessionStore.js          # Session state and actions
│   │   ├── firewallStore.js         # Firewall state and actions
│   │   └── metricsStore.js          # Dashboard metrics
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.js               # Authentication hook (Clerk)
│   │   ├── usePermissions.js        # RBAC permission checking
│   │   ├── useDataFetcher.js        # Data fetching with loading states
│   │   ├── useWebSocket.js          # WebSocket connection hook
│   │   └── index.js
│   ├── utils/            # Utility functions
│   │   ├── permissions.js           # RBAC permissions and roles
│   │   ├── rbac.js                  # Role checking utilities
│   │   ├── helpers.js               # General helper functions
│   │   ├── dateUtils.js             # Date formatting utilities
│   │   ├── mockData.js              # Mock data for development
│   │   └── index.js
│   ├── constants/        # Configuration and constants
│   │   └── index.js                 # Alert status, severity, API URLs, etc.
│   ├── App.css           # Global styles
│   ├── App.js            # Root component with routing
│   ├── index.css         # Tailwind directives
│   └── index.js          # Application entry point
├── vnc-dashboard-backend/ # Backend API server
│   ├── server.js         # Express server with Clerk authentication
│   ├── package.json      # Backend dependencies
│   └── .env              # Backend environment variables
├── tailwind.config.js    # Tailwind configuration with animations
├── postcss.config.js     # PostCSS configuration
├── package.json          # Frontend dependencies
├── README.md             # Project overview and setup
├── DESIGN_SYSTEM.md      # 📖 Complete design system documentation
├── RBAC_IMPLEMENTATION.md # 📖 RBAC setup and configuration guide
├── BACKEND_SETUP.md      # 📖 Backend API setup instructions
├── QUICK_START_RBAC.md   # 📖 Quick start guide for RBAC
└── DEPLOYMENT_SUMMARY.md # 📖 Deployment checklist and summary
```
│   │   ├── Dashboard.js         # Main dashboard with metrics
│   │   ├── Sessions.js          # VNC sessions management
│   │   ├── Alerts.js            # Alert management with lifecycle
│   │   └── Firewall.js          # Firewall rules management
│   ├── store/            # Zustand state management
│   │   ├── alertStore.js        # Alert state and actions
│   │   ├── sessionStore.js      # Session state and actions
│   │   ├── firewallStore.js     # Firewall state and actions
│   │   └── metricStore.js       # Dashboard metrics
│   ├── constants/        # Configuration and constants
│   │   └── index.js             # Alert status, severity, etc.
│   ├── App.css           # Global styles
│   ├── App.js            # Root component with routing
│   ├── index.css         # Tailwind directives
│   └── index.js          # Application entry point
├── tailwind.config.js    # Tailwind configuration with animations
├── postcss.config.js     # PostCSS configuration
├── package.json
├── README.md             # Project overview and setup
├── DESIGN_SYSTEM.md      # 📖 Complete design system documentation
└── .design-system-reference.txt  # Quick reference for developers
```

## 🎨 Design System

> **📖 For detailed design guidelines, component patterns, and AI/LLM instructions, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)**

The VNC SOAR Dashboard follows a comprehensive design system to ensure visual consistency and professional UX across all pages and components.

### Quick Reference

#### Color Palette
- **Background**: `#0D0E1C` (Primary dark background)
- **Surface**: `#17182F` (Card/panel background)
- **Primary Accent**: `#6351ED` (Purple - view/read actions)
- **Secondary Accent**: `#8884d8` (Blue gradient accent)
- **Success**: `#10b981` (Green - positive actions, resolve)
- **Warning**: `#f59e0b` (Orange - caution, investigate)
- **Danger**: `#ef4444` (Red - destructive actions, terminate)
- **Teal**: `#14b8a6` (Teal gradient accent)
- **Pink**: `#ec4899` (Pink gradient accent)

### Gradient System
Multi-color gradient themes applied across metric cards and filters:
- **Purple**: `from-purple-500/20 to-purple-600/20`
- **Blue**: `from-blue-500/20 to-blue-600/20`
- **Teal**: `from-teal-500/20 to-teal-600/20`
- **Pink**: `from-pink-500/20 to-pink-600/20`
- **Orange**: `from-orange-500/20 to-orange-600/20`

### UI Components
- **Modals**: Backdrop blur with fade-in animations, size variants (sm/md/lg/xl)
  - Base Modal: Generic container with gradient background
  - Confirm Modal: Warning/Danger/Info/Success types with icons
  - Success Modal: Auto-close notifications with checkmark
- **Cards**: Glass-morphism effect with gradient borders and backgrounds
- **Buttons**: Icon-only (40×40px) with colored backgrounds and hover tooltips
- **Tooltips**: Absolute positioned, appear on hover with dark background
- **Tables**: Responsive with fixed-width action columns
- **Filters**: Gradient-themed sections with clear labels
- **Status Badges**: Color-coded with rounded borders

### Icon Action Buttons
All action buttons use icon-only design with hover tooltips:
- **Fixed Size**: 40px × 40px for consistent layout
- **Icon Size**: 18px (text-lg) for clarity
- **Color Coding**:
  - Purple: View/Read operations (FiEye)
  - Orange: Warning/Investigation (FiAlertTriangle, FiShield)
  - Red: Destructive actions (FiTrash2, FiX)
  - Green: Positive actions (FiCheckCircle, FiToggleLeft when active)
  - Gray: Neutral actions (FiXCircle for dismiss)
- **Hover Effects**: Background opacity increases, tooltip appears
- **Tooltips**: Bottom-positioned, white text on dark background, z-index 10

### For Developers & AI Assistants

When adding new pages or modifying existing components:

1. **Always refer to [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** for complete guidelines
2. **Use icon-only buttons** in table action columns (never text buttons)
3. **Include hover tooltips** for all icon buttons
4. **Apply different gradients** to metric cards on the same page
5. **Use confirmation modals** for all destructive actions
6. **Follow the color coding system** for action types
7. **Maintain the dark theme** - never use light backgrounds

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for:
- Complete component patterns with code examples
- Color system and gradient usage
- Modal implementation guidelines
- Responsive design patterns
- Anti-patterns to avoid
- Full example of creating a new page

---

## 📊 Features

### Dashboard
- **Real-time Metrics**: Live overview cards with gradient themes
  - Active Sessions count
  - Active Alerts count  
  - Active Firewall Rules count
  - System Status indicator
- **Visual Analytics**: 
  - Alert severity distribution (pie chart)
  - Alert status breakdown (pie chart)
  - Traffic volume trends (area chart)
- **Recent Activity**: Latest alerts with quick access to detailed view
- **Active Sessions**: Summary table with risk assessment
- **Multi-gradient Cards**: Each metric card uses different gradient (purple/blue/teal/pink/orange)

### Sessions Management (/sessions)
- **Live Monitoring**: Real-time VNC session tracking with detailed information
- **Session Details**: 
  - Session ID, User, Source IP, Destination IP
  - Connection time, Duration, Data transferred
  - Risk level assessment (Critical/High/Medium/Low)
  - Current status (Active/Terminated)
- **Icon-based Actions** (with tooltips):
  - View Details (FiEye - purple)
  - Block IP (FiShield - orange)
  - Terminate Session (FiX - red)
- **Confirmation Modals**: 
  - Block IP confirmation with warning type
  - Terminate session with danger confirmation
  - Success notifications with auto-close
- **Advanced Filters**: 
  - Status filter (All/Active/Terminated)
  - Risk level filter (All/Critical/High/Medium/Low)
  - Search by IP, user, or session ID
  - Gradient-themed filter section

### Alerts System (/alerts)
- **Multi-severity Management**: Critical, High, Medium, Low, Info alerts
- **Complete Lifecycle Tracking**: 
  - Open → Investigating → Resolved
  - Open → Dismissed
- **Alert Details**:
  - Alert ID, Type, Severity, Status
  - Source IP, User, Timestamp
  - Affected session information
  - Description and detection details
- **Icon-based Actions** (with tooltips):
  - View Details (FiEye - purple) - always visible
  - Investigate (FiAlertTriangle - orange) - for Open alerts
  - Resolve (FiCheckCircle - green) - for Open/In Progress
  - Dismiss (FiXCircle - gray) - for Open/In Progress
- **Smart Action Visibility**: Buttons appear/hide based on alert status
- **Confirmation Modals**:
  - Investigate confirmation with info type
  - Resolve confirmation with success type
  - Dismiss confirmation with warning type
- **Advanced Filters**:
  - Severity filter (All/Critical/High/Medium/Low/Info)
  - Status filter (All/Open/Investigating/Resolved/Dismissed)
  - Time range selection
  - Search functionality
  - Gradient-themed filter section

### Firewall Management (/firewall)
- **Dynamic Rule Management**: Create, modify, and delete firewall rules
- **Rule Details**:
  - Rule ID, Source IP, Destination IP
  - Action type (Block/Allow/Rate Limit/Monitor)
  - Protocol, Port, Priority
  - Status (Active/Inactive/Pending)
  - Created timestamp
- **Icon-based Actions** (with tooltips):
  - Toggle Status (FiToggleRight/FiToggleLeft - orange when disabling, green when enabling)
  - Delete Rule (FiTrash2 - red)
- **RBAC Integration**: Actions visible only to Admin+ roles
- **Add Rule Modal**: Comprehensive form for creating new rules
  - Source IP, Destination IP inputs
  - Action type selection
  - Protocol (TCP/UDP/ICMP/ALL)
  - Port range specification
  - Priority level
  - Optional description
- **Confirmation Modals**:
  - Toggle rule status (warning type)
  - Delete rule (danger type)
  - Success notifications for all operations
- **Advanced Filters**:
  - Status filter (All/Active/Inactive/Pending)
  - Action filter (All/Block/Allow/Rate Limit/Monitor)
  - Search by IP or rule ID
  - Gradient-themed filter section

### User Management (/users) - Super Admin Only
- **Centralized User Administration**: Manage all platform users
- **Real Clerk Integration**: 
  - Fetches users directly from Clerk via backend API
  - Displays real user avatars from Clerk profiles
  - Shows actual email addresses and user metadata
- **User Details**:
  - User ID, Name, Email
  - Current role assignment
  - Profile image from Clerk
  - Account creation timestamp
- **User Actions** (Super Admin only):
  - Edit User Role (FiEdit - purple) - Opens role assignment modal
  - Delete User (FiTrash2 - red) - Remove user from system
- **Role Assignment Modal**:
  - Dropdown to select new role (Super Admin/Admin/Analyst/Viewer)
  - Confirmation before role change
  - Success notification on update
- **Delete Confirmation**:
  - Warning modal to confirm user deletion
  - Displays user email for verification
  - Permanent action warning
- **Search & Filter**:
  - Search by name or email
  - Filter by role
  - Real-time filtering
- **API Integration**:
  - GET /api/users - List all users with JWT auth
  - PATCH /api/users/:id - Update user role
  - DELETE /api/users/:id - Delete user account
  - Token-based authentication on all requests

### Settings (/settings)
- **Comprehensive Configuration**: 9 collapsible sections for system-wide settings
- **Profile Settings** (All Users):
  - Full Name, Email (read-only from Clerk)
  - Timezone selection (UTC, EST, PST, CST, MST)
  - Language preference (English, Spanish, French, German)
- **Notifications** (All Users):
  - Email, Slack, Webhook, Desktop notification toggles
  - Alert severity preferences (Critical/High/Medium/Low)
- **Alert Configuration** (Admin+ only):
  - Notification channel settings
  - Alert retention period
  - Severity-based notification rules
- **Detection Rules** (Admin+ only):
  - Enable/disable detection types (Brute Force, Port Scan, Data Exfiltration, Anomaly)
  - Configure detection thresholds
- **Firewall Configuration** (Admin+ only):
  - Auto-block settings
  - Block duration
  - Whitelist/Blacklist management
  - Geo-blocking options
- **Integrations** (Admin+ only):
  - Slack webhook URL
  - Microsoft Teams webhook
  - Splunk host configuration
  - Azure Sentinel workspace
- **Personalization** (All Users):
  - Theme selection (Dark/Light)
  - Compact view toggle
  - Welcome message preferences
  - Default page on login
- **Security** (Super Admin only):
  - Session timeout settings
  - Two-factor authentication toggle
  - IP whitelist management
  - Password expiry policy
- **Backup & Restore** (Super Admin only):
  - Auto-backup toggle
  - Backup frequency (Hourly/Daily/Weekly)
  - Retention period
  - Content selection (Alerts/Rules/Sessions)
- **Audit Logs** (Super Admin only):
  - View system audit logs
  - Export logs to CSV/PDF
  - Filter by date range and event type
- **Collapsible UI**: Each section can be expanded/collapsed for better organization
- **Permission-Based Visibility**: Sections hidden if user lacks required permissions
- **Save Handlers**: Individual save buttons for each section with success notifications

### Common Features Across All Pages
- **Role-Based Access Control**: All actions enforce RBAC with PermissionGate components
- **Consistent Button Alignment**: Fixed-width action columns prevent layout shifts
- **Placeholder Spacing**: Hidden buttons maintain layout consistency
- **Hover Tooltips**: Clear action descriptions without cluttering interface
- **Color-coded Actions**: Visual hierarchy based on action severity
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Fade-ins, transitions, and hover effects
- **Professional UX**: Clean, modern interface matching Orca design system
- **Clerk Integration**: User profile and authentication throughout
- **Protected Routes**: Unauthorized users redirected to sign-in
- **Permission-Based Visibility**: UI elements shown/hidden based on user role

## 🔌 API Integration

### Backend Endpoints (Implemented)
```
# User Management (Super Admin only)
GET    /api/users              # List all users from Clerk
GET    /api/users/:id          # Get specific user details
PATCH  /api/users/:id          # Update user role
DELETE /api/users/:id          # Delete user account

# Authentication Middleware
- JWT token verification on all endpoints
- Clerk Backend SDK integration
- Role-based access control
```

### Backend Endpoints (Planned)
```
GET    /api/alerts              # List all alerts
POST   /api/alerts              # Create new alert
PUT    /api/alerts/:id          # Update alert
DELETE /api/alerts/:id          # Delete alert

GET    /api/sessions            # List VNC sessions
POST   /api/sessions/:id/kill   # Terminate session

GET    /api/firewall/rules      # List firewall rules
POST   /api/firewall/rules      # Create new rule
PUT    /api/firewall/rules/:id  # Update rule
DELETE /api/firewall/rules/:id  # Delete rule

GET    /api/metrics             # System metrics

GET    /api/settings            # Get user/system settings
PUT    /api/settings            # Update settings
```

### WebSocket Events
```javascript
// Client subscribes to:
- alerts:new          // New alert created
- alerts:updated      // Alert status changed
- sessions:new        // New VNC session started
- sessions:ended      // Session terminated
- firewall:updated    # Firewall rule changed
- metrics:update      // System metrics refresh
```

## ⚙️ Configuration

### Environment Variables

#### Frontend (.env in root)
```env
# Clerk Authentication
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Backend API
REACT_APP_API_URL=http://localhost:3001

# WebSocket (optional, for future use)
REACT_APP_WS_URL=http://localhost:3001
```

#### Backend (.env in vnc-dashboard-backend/)
```env
# Clerk Secret Key
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Server Configuration
PORT=3001

# CORS (optional)
ALLOWED_ORIGINS=http://localhost:3000
```

### API Client Configuration
Configuration in `src/constants/index.js`:
```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
export const WS_URL = process.env.REACT_APP_WS_URL || 'http://localhost:3001';
```

### Clerk Configuration
1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Configure authentication methods (Email/Password, OAuth providers)
3. Add user metadata fields for role management
4. Configure session settings
5. Copy API keys to environment variables

### RBAC Configuration
Role definitions in `src/utils/permissions.js`:
```javascript
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  ANALYST: 'analyst',
  VIEWER: 'viewer'
};

export const PERMISSIONS = {
  // Session permissions
  VIEW_SESSIONS: 'view_sessions',
  TERMINATE_SESSIONS: 'terminate_sessions',
  BLOCK_IPS: 'block_ips',
  
  // Alert permissions
  VIEW_ALERTS: 'view_alerts',
  INVESTIGATE_ALERTS: 'investigate_alerts',
  RESOLVE_ALERTS: 'resolve_alerts',
  DISMISS_ALERTS: 'dismiss_alerts',
  
  // Firewall permissions
  VIEW_FIREWALL_RULES: 'view_firewall_rules',
  ADD_FIREWALL_RULES: 'add_firewall_rules',
  TOGGLE_FIREWALL_RULES: 'toggle_firewall_rules',
  DELETE_FIREWALL_RULES: 'delete_firewall_rules',
  
  // Configuration permissions
  CONFIGURE_ALERTS: 'configure_alerts',
  CONFIGURE_SYSTEM: 'configure_system',
  
  // User management
  MANAGE_USERS: 'manage_users'
};
```

## 🎯 Implementation Status

### ✅ Completed Features

#### Authentication & Authorization
- ✅ Clerk authentication integration (Sign Up/Sign In)
- ✅ JWT token-based API authentication
- ✅ Protected routes with role checking
- ✅ User profile management with Clerk
- ✅ Automatic token refresh and session management
- ✅ Sign out functionality

#### Role-Based Access Control (RBAC)
- ✅ 4-tier role system (Super Admin, Admin, Analyst, Viewer)
- ✅ Permission definitions and role mappings
- ✅ PermissionGate component for UI enforcement
- ✅ usePermissions hook for permission checking
- ✅ Backend JWT verification with role extraction
- ✅ Protected API endpoints with role validation
- ✅ Unauthorized page for access denied scenarios

#### Backend API
- ✅ Express.js server with Clerk Backend SDK
- ✅ User management endpoints (GET, PATCH, DELETE)
- ✅ JWT authentication middleware
- ✅ CORS configuration for frontend communication
- ✅ Environment variable management
- ✅ Error handling and logging
- ✅ Real Clerk user data integration

#### UI/UX Components
- ✅ Dark theme with custom color palette
- ✅ Responsive sidebar navigation with role badge
- ✅ Multi-gradient metric cards (5 color variants)
- ✅ Modal system (Base, Confirm, Success)
- ✅ Icon-only action buttons with hover tooltips
- ✅ Professional table layouts with fixed-width action columns
- ✅ Gradient-themed filter sections
- ✅ Smooth animations and transitions
- ✅ Glass-morphism card effects
- ✅ User profile dropdown with avatar
- ✅ Role badge display

#### State Management
- ✅ Zustand stores for alerts, sessions, firewall, metrics
- ✅ Alert lifecycle management (Open → Investigating → Resolved/Dismissed)
- ✅ Session termination workflow
- ✅ Firewall rule CRUD operations
- ✅ Real-time metric updates
- ✅ Custom hooks (useAuth, usePermissions, useDataFetcher)

#### Pages & Features
- ✅ Dashboard with live metrics and recent activity
- ✅ Sessions page with view/block/terminate actions (RBAC enforced)
- ✅ Alerts page with complete lifecycle workflow (RBAC enforced)
- ✅ Firewall page with add/toggle/delete operations (RBAC enforced)
- ✅ User Management page with role assignment (Super Admin only)
- ✅ Comprehensive Settings page with 9 collapsible sections
- ✅ Sign In/Sign Up pages with Clerk
- ✅ Unauthorized access page
- ✅ Navigation between pages with React Router
- ✅ Confirmation modals for all destructive actions
- ✅ Success notifications with auto-close
- ✅ Advanced filtering on all pages

#### Code Quality
- ✅ Consistent button alignment across all tables
- ✅ Conditional action visibility based on role and status
- ✅ Color-coded actions for visual hierarchy
- ✅ Proper tooltip implementation
- ✅ Responsive design patterns
- ✅ Service layer abstraction for API calls
- ✅ Error boundary components
- ✅ Loading states and error handling

### 🚧 Pending Implementation

#### Backend Services (Planned)
- ⏳ Data Ingestion Service - Log file monitoring
- ⏳ UBA Service - Anomaly detection engine
- ⏳ Orchestration & Response Service - Automated actions
- ⏳ Session & Alert Service - Extended REST API endpoints
- ⏳ WebSocket Service - Real-time updates
- ⏳ Database integration (PostgreSQL/MongoDB)
- ⏳ Message broker (Kafka/RabbitMQ)
- ⏳ Settings persistence API

#### Integration Features
- ⏳ Real-time WebSocket connections for live updates
- ⏳ Live data streaming from backend services
- ⏳ Persistent data storage for alerts/sessions/rules
- ⏳ External integrations (Slack, Teams, Splunk, Sentinel)
- ⏳ Email notification service
- ⏳ Webhook delivery system

#### Advanced Features
- ⏳ Data visualization with Recharts (partially implemented)
- ⏳ Export functionality (CSV, PDF) for all data tables
- ⏳ Bulk operations for alerts and firewall rules
- ⏳ Advanced search with multiple filters
- ⏳ System-wide notification center
- ⏳ Comprehensive activity logs and audit trails
- ⏳ Dashboard customization and widget preferences
- ⏳ User preferences persistence
- ⏳ Multi-factor authentication (MFA)
- ⏳ IP whitelist management interface
- ⏳ Backup/restore functionality
- ⏳ Audit log viewer and export

### 🎨 Design Achievements
- Professional dark theme matching Orca design system
- Multi-color gradient system for visual distinction
- Icon-only buttons eliminating text wrapping issues
- Hover tooltips providing context without clutter
- Consistent spacing and alignment across all pages
- Smooth animations enhancing user experience
- Color-coded actions for intuitive interaction
- Glass-morphism effects for modern aesthetic
- Role-based UI adaptation for personalized experience
- Clerk integration with branded authentication flows

---

## 🚀 Quick Start

### Current Development Status
The platform is **fully functional** with:
- ✅ Clerk authentication (Sign Up/Sign In)
- ✅ Role-Based Access Control (4-tier system)
- ✅ Backend API for user management
- ✅ Complete UI with mock data for sessions/alerts/firewall
- ✅ Real user data from Clerk in User Management
- ✅ Comprehensive Settings page with 9 sections
- ✅ All RBAC permissions enforced across pages

### First Time Setup

1. **Create Clerk Account**:
   - Go to [clerk.com](https://clerk.com) and sign up
   - Create a new application
   - Copy your Publishable Key (pk_test_...) and Secret Key (sk_test_...)

2. **Configure Environment Variables**:
   
   Frontend `.env`:
   ```env
   REACT_APP_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
   REACT_APP_API_URL=http://localhost:3001
   ```
   
   Backend `.env` (in vnc-dashboard-backend/):
   ```env
   CLERK_SECRET_KEY=your_secret_key_here
   PORT=3001
   ```

3. **Install Dependencies**:
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd vnc-dashboard-backend
   npm install
   cd ..
   ```

4. **Start Both Servers**:
   
   Terminal 1 (Backend):
   ```bash
   cd vnc-dashboard-backend
   npm start
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm start
   ```

5. **Access the Application**:
   - Open http://localhost:3000
   - Sign up with your email
   - In Clerk Dashboard, manually set your role to `super_admin` in user metadata
   - Refresh the page to see full access

### Testing RBAC

1. **As Super Admin**:
   - Access User Management page
   - Create new users with different roles
   - Test all features across all pages

2. **As Admin**:
   - Sign in as admin user
   - Verify you can't access User Management
   - Test alert configuration and firewall management
   - Verify you can investigate/resolve alerts

3. **As Analyst**:
   - Sign in as analyst user
   - Verify you can only view and investigate alerts
   - Confirm you cannot modify firewall rules

4. **As Viewer**:
   - Sign in as viewer user
   - Verify all action buttons are hidden
   - Confirm read-only access to all pages

Visit http://localhost:3000 to see:
- Interactive dashboard with metrics
- Functional session management with RBAC enforcement
- Complete alert lifecycle with role-based actions
- Firewall rule management with permission checks
- User Management with real Clerk data (Super Admin only)
- Comprehensive Settings with 9 collapsible sections
- Professional icon-based UI with tooltips

---

## 🐛 Known Issues & Solutions

### Tailwind CSS Configuration
**Status**: ✅ **RESOLVED**

**Previous Issue**: PostCSS plugin compatibility between Tailwind CSS v4 and react-scripts 5.0.1

**Solution Implemented**: Downgraded to Tailwind CSS v3.4.0
```bash
npm install -D tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0
```

**Current Configuration** (`postcss.config.js`):
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Current Configuration** (`tailwind.config.js`):
```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
```

### Development Server
**Status**: Ready to run

**Command**:
```bash
npm start
```

**Expected**: Application should start at http://localhost:3000 with no compilation errors

## 📦 Dependencies

### Core Frontend Dependencies
- `react` (19.2.0) - UI framework with latest features
- `react-dom` (19.2.0) - React DOM rendering
- `react-router-dom` (^7.1.3) - Client-side routing with protected routes
- `@clerk/clerk-react` (^6.12.1) - Clerk authentication and user management
- `zustand` (^5.0.3) - Lightweight state management
- `react-icons` (^5.4.0) - Feather Icons and more
- `axios` (^1.7.9) - HTTP client for API calls

### Core Backend Dependencies
- `express` (^5.1.0) - Web framework for Node.js
- `@clerk/backend` (^2.18.0) - Clerk Backend SDK for authentication
- `cors` (^2.8.5) - Cross-Origin Resource Sharing middleware
- `dotenv` (^17.2.3) - Environment variable management

### Development Dependencies
- `tailwindcss` (^3.4.0) - Utility-first CSS framework
- `postcss` (^8.4.0) - CSS transformation tool
- `autoprefixer` (^10.4.0) - CSS vendor prefixes
- `@tailwindcss/postcss` - PostCSS integration
- `react-scripts` (5.0.1) - Create React App build scripts

### Optional (for future integration)
- `socket.io-client` - WebSocket real-time updates
- `recharts` - Data visualization charts (partially integrated)
- `date-fns` - Date manipulation utilities

## 🚢 Deployment

### Frontend Deployment

#### Option 1: Static Hosting (Vercel, Netlify)
```bash
# Build production version
npm run build

# The build/ folder contains static files ready for deployment
# Deploy to Vercel, Netlify, or any static host
```

#### Option 2: Docker
```dockerfile
# Dockerfile for frontend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Backend Deployment

#### Option 1: Node.js Server (Heroku, Railway, Render)
```bash
cd vnc-dashboard-backend
# Set environment variables in hosting platform
# Deploy server.js with npm start
```

#### Option 2: Docker
```dockerfile
# Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY vnc-dashboard-backend/package*.json ./
RUN npm install
COPY vnc-dashboard-backend/ .
EXPOSE 3001
CMD ["node", "server.js"]
```

#### Option 3: Serverless (AWS Lambda, Vercel Functions)
- Convert Express routes to serverless functions
- Deploy user management endpoints as separate functions
- Configure Clerk webhook handlers

### Environment Configuration

#### Production Environment Variables

Frontend:
```env
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_WS_URL=wss://your-backend-domain.com
```

Backend:
```env
CLERK_SECRET_KEY=sk_live_your_production_secret
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Pre-Deployment Checklist

- [ ] Set up production Clerk application
- [ ] Configure production environment variables
- [ ] Update CORS allowed origins
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up database (for future persistence)
- [ ] Configure logging and monitoring
- [ ] Test all RBAC scenarios in production
- [ ] Set up backup strategy
- [ ] Configure rate limiting
- [ ] Enable error tracking (Sentry, etc.)
- [ ] Set up CDN for static assets
- [ ] Configure cache headers
- [ ] Test authentication flows
- [ ] Verify JWT token expiration handling
- [ ] Document API endpoints
- [ ] Set up CI/CD pipeline

### Monitoring & Logging

**Recommended Tools:**
- **Application Monitoring**: New Relic, Datadog
- **Error Tracking**: Sentry
- **Log Management**: Loggly, Papertrail
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Analytics**: Google Analytics, Mixpanel

**Key Metrics to Monitor:**
- API response times
- Authentication success/failure rates
- Permission check failures
- User session durations
- Error rates by endpoint
- System resource usage

## 🔐 Security Considerations

- ✅ Clerk authentication with JWT tokens
- ✅ Backend JWT verification on all API endpoints
- ✅ Role-based access control (RBAC) enforcement
- ✅ Protected routes with role validation
- ✅ Environment variable protection for secrets
- ✅ CORS configuration for allowed origins
- ⏳ Rate limiting on API endpoints (planned)
- ⏳ Input validation and sanitization (planned)
- ⏳ WebSocket authentication (planned)
- ⏳ IP whitelist management (planned)
- ⏳ Two-factor authentication (planned)
- ⏳ Session timeout and auto-logout (planned)
- ⏳ Password policy enforcement (planned)
- ⏳ Audit logging for all privileged actions (planned)

### Security Best Practices Implemented

1. **Authentication**:
   - Clerk handles password hashing and storage
   - JWT tokens with expiration
   - Secure session management
   - Token refresh on expiration

2. **Authorization**:
   - Role-based permissions checked on both frontend and backend
   - API endpoints protected with JWT middleware
   - UI elements hidden/shown based on permissions
   - Unauthorized access redirects to appropriate pages

3. **API Security**:
   - All user management endpoints require authentication
   - Token verification before processing requests
   - Error messages don't leak sensitive information
   - CORS configured for specific origins

4. **Environment Security**:
   - Sensitive keys stored in .env files
   - .env files excluded from version control
   - Separate keys for frontend (publishable) and backend (secret)
   - Production keys separate from development keys

## 📈 Performance Optimization

- Code splitting with React.lazy() (planned)
- Memoization with React.memo() (planned)
- Virtual scrolling for large data tables (planned)
- Debounced search inputs (planned)
- Optimized re-renders with Zustand
- Lazy loading of dashboard components
- Efficient permission checking with memoized hooks

## 📚 Documentation

### Available Documentation Files

1. **[README.md](./README.md)** (this file)
   - Complete project overview
   - Setup and installation instructions
   - Feature descriptions and status
   - Architecture and configuration

2. **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)**
   - Comprehensive design guidelines
   - Component patterns and examples
   - Color system and gradients
   - Modal implementation guidelines
   - AI/LLM instructions for consistency

3. **[RBAC_IMPLEMENTATION.md](./RBAC_IMPLEMENTATION.md)**
   - Detailed RBAC architecture
   - Role and permission definitions
   - Implementation examples
   - Testing scenarios
   - Best practices

4. **[QUICK_START_RBAC.md](./QUICK_START_RBAC.md)**
   - Quick setup guide for RBAC
   - Step-by-step Clerk configuration
   - Testing different roles
   - Common troubleshooting

5. **[BACKEND_SETUP.md](./BACKEND_SETUP.md)**
   - Backend API setup instructions
   - Clerk Backend SDK integration
   - API endpoint documentation
   - Testing with curl/Postman
   - Deployment considerations

6. **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)**
   - Pre-deployment checklist
   - Environment configuration
   - Security considerations
   - Monitoring and logging

### Quick Reference

- **Getting Started**: See [Installation](#installation) section above
- **Understanding RBAC**: Read [QUICK_START_RBAC.md](./QUICK_START_RBAC.md)
- **Backend Setup**: Follow [BACKEND_SETUP.md](./BACKEND_SETUP.md)
- **Design Guidelines**: Consult [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Full RBAC Details**: See [RBAC_IMPLEMENTATION.md](./RBAC_IMPLEMENTATION.md)

## 🧪 Testing

### Manual Testing

#### Authentication Flow
```bash
1. Visit http://localhost:3000
2. Click "Sign Up" and create an account
3. Verify email confirmation (if enabled)
4. Sign in with credentials
5. Test sign out and sign back in
```

#### RBAC Testing
```bash
# Test as Super Admin
1. Set role to super_admin in Clerk Dashboard
2. Access all pages including User Management
3. Test user role assignment
4. Test user deletion
5. Verify all action buttons are visible

# Test as Admin
1. Change role to admin
2. Access Settings → Alert Configuration
3. Verify User Management is hidden in sidebar
4. Test firewall rule creation
5. Test alert investigation/resolution

# Test as Analyst
1. Change role to analyst
2. Verify firewall actions are hidden
3. Test alert investigation
4. Verify cannot resolve alerts
5. Confirm read-only session access

# Test as Viewer
1. Change role to viewer
2. Verify all action buttons are hidden
3. Confirm read-only access to all pages
4. Test that Settings shows only profile section
```

#### API Testing
```bash
# Get all users (requires Super Admin)
curl -X GET http://localhost:3001/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Update user role
curl -X PATCH http://localhost:3001/api/users/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"publicMetadata": {"role": "admin"}}'

# Delete user
curl -X DELETE http://localhost:3001/api/users/USER_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Automated Testing (Planned)
- Unit tests for components with Jest
- Integration tests for API endpoints
- E2E tests with Cypress
- RBAC permission tests
- Authentication flow tests

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Follow the design system guidelines in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
4. Test RBAC for all new features
5. Ensure all permission checks are in place
6. Commit changes (`git commit -m 'Add AmazingFeature'`)
7. Push to branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request with detailed description

### Code Style Guidelines

- Use functional components with hooks
- Follow existing naming conventions
- Add permission checks for all action buttons
- Include hover tooltips for icon buttons
- Test with all 4 role types
- Update documentation for new features
- Add comments for complex logic
- Keep components modular and reusable

### Adding New Features

1. **New Page**:
   - Follow [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for UI patterns
   - Wrap in `<ProtectedRoute>` with required permissions
   - Add permission checks for all actions
   - Update sidebar navigation

2. **New API Endpoint**:
   - Add to backend server.js
   - Include JWT authentication middleware
   - Add role validation if needed
   - Document in [BACKEND_SETUP.md](./BACKEND_SETUP.md)
   - Create service function in frontend

3. **New Permission**:
   - Add to `PERMISSIONS` in src/utils/permissions.js
   - Update role mappings in `ROLE_PERMISSIONS`
   - Use `<PermissionGate>` for UI enforcement
   - Update [RBAC_IMPLEMENTATION.md](./RBAC_IMPLEMENTATION.md)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team & Credits

**Built for enterprise-grade VNC security monitoring and automated response.**

### Technology Stack Credits
- **React** - Facebook Open Source
- **Clerk** - User authentication and management
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Express.js** - Backend framework
- **React Icons** - Icon library

### Design Inspiration
- Orca Security design system
- Modern SOAR platform best practices
- Material Design principles

## 📞 Support & Resources

### Getting Help

1. **Documentation**: 
   - Start with this README
   - Check specific guides in documentation files
   - Review code comments for implementation details

2. **Common Issues**:
   - **Authentication not working**: Verify Clerk keys in .env files
   - **Backend connection failed**: Ensure backend is running on port 3001
   - **Permission denied**: Check user role in Clerk Dashboard user metadata
   - **CORS errors**: Verify ALLOWED_ORIGINS in backend .env

3. **Troubleshooting**:
   - Check browser console for frontend errors
   - Check terminal output for backend errors
   - Verify environment variables are loaded
   - Ensure both frontend and backend are running
   - Clear browser cache and cookies if needed

### Useful Commands

```bash
# Frontend
npm start              # Start development server
npm run build          # Create production build
npm test               # Run tests (when implemented)

# Backend
cd vnc-dashboard-backend
npm start              # Start backend server
npm run dev            # Start with nodemon (if configured)

# Troubleshooting
npm cache clean --force  # Clear npm cache
rm -rf node_modules      # Remove dependencies
npm install              # Reinstall dependencies
```

### Contact

For issues, questions, or contributions:
- **GitHub Issues**: Open an issue in the repository
- **Pull Requests**: Submit PRs for bug fixes or features
- **Documentation**: Update relevant .md files

### Additional Resources

- **Clerk Documentation**: https://clerk.com/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Express.js**: https://expressjs.com
- **Zustand**: https://zustand-demo.pmnd.rs

---

## 🎉 What's New

### Latest Updates

**Version 2.0** - RBAC & Backend Integration
- ✅ Complete Clerk authentication integration
- ✅ 4-tier role-based access control
- ✅ Backend API with user management
- ✅ Protected routes and permission gates
- ✅ User Management page (Super Admin)
- ✅ Comprehensive Settings with 9 sections
- ✅ Real user data from Clerk
- ✅ JWT token authentication
- ✅ Role-based UI adaptation

**Version 1.0** - Initial Release
- ✅ Dashboard with metrics and charts
- ✅ Sessions management
- ✅ Alerts lifecycle management
- ✅ Firewall rule management
- ✅ Dark theme UI with gradients
- ✅ Modal system and tooltips
- ✅ Responsive design

### Coming Soon

- 🔄 Real-time WebSocket updates
- 🔄 Data persistence with database
- 🔄 External integrations (Slack, Teams, etc.)
- 🔄 Advanced analytics and reporting
- 🔄 Backup and restore functionality
- 🔄 Comprehensive audit logging
- 🔄 Multi-factor authentication
- 🔄 IP whitelist management

---

**Last Updated**: October 15, 2025  
**Version**: 2.0 (RBAC & Backend Integration)  
**Status**: Production Ready (Frontend + User Management API)

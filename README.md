# VNC Data Exfiltration SOAR Platform

A modern, real-time Security Orchestration, Automation, and Response (SOAR) platform for VNC Data Exfiltration detection. Features a polished dark-themed UI with comprehensive monitoring, automated response capabilities, and intuitive security workflows.

## 🎯 Project Overview

This platform provides enterprise-grade monitoring and automated response capabilities for VNC server security, including:

- **Real-time Monitoring**: Live VNC session tracking with risk assessment and data transfer monitoring
- **User Behavior Analytics**: Anomaly detection with risk scoring and threat classification
- **Automated Response**: Dynamic firewall rule management and instant session termination
- **Alert Management**: Multi-severity alert system with complete lifecycle tracking
- **Interactive Dashboard**: Modern dark-themed UI with gradient accents and real-time metrics
- **Professional UX**: Icon-based actions with tooltips, responsive design, and smooth transitions

## 🏗️ Architecture

### Frontend (React)
- **Framework**: React 19.2.0 with functional components and hooks
- **Routing**: React Router DOM for seamless multi-page navigation
- **State Management**: Zustand for efficient global state management
- **Styling**: Tailwind CSS v3.4.0 with custom dark theme and gradient system
- **UI Components**: Custom modal system (base, confirm, success) with animations
- **Icons**: Feather Icons (react-icons/fi) for consistent iconography
- **Design Pattern**: Card-based layouts with glass-morphism effects
- **Interactions**: Icon-only action buttons with hover tooltips
- **Animations**: Smooth transitions, fade-ins, and hover effects

### Backend (Planned Microservices)
- **Data Ingestion Service**: Log file monitoring and parsing
- **UBA Service**: Anomaly detection and behavior analysis
- **Orchestration & Response Service**: Automated action execution
- **Session & Alert Service**: REST API for data persistence
- **WebSocket Service**: Real-time updates to frontend
- **Message Broker**: Apache Kafka / RabbitMQ
- **Database**: PostgreSQL / MongoDB
- **Monitoring**: Prometheus + Grafana + ELK Stack

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vnc-dashboard
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

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
│   │   │   ├── MetricCard.js    # Gradient-themed metric cards
│   │   │   ├── Table.js
│   │   │   ├── Modal.js          # Base modal component
│   │   │   ├── ConfirmModal.js   # Confirmation dialogs
│   │   │   ├── SuccessModal.js   # Success notifications
│   │   │   └── index.js
│   │   └── dashboard/    # Dashboard-specific components
│   │       ├── RecentAlerts.js   # Recent alerts widget
│   │       └── SessionsTable.js   # Active sessions widget
│   ├── layouts/          # Page layouts
│   │   └── MainLayout.js        # Sidebar + main content
│   ├── pages/            # Main application pages
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

### Common Features Across All Pages
- **Consistent Button Alignment**: Fixed-width action columns prevent layout shifts
- **Placeholder Spacing**: Hidden buttons maintain layout consistency
- **Hover Tooltips**: Clear action descriptions without cluttering interface
- **Color-coded Actions**: Visual hierarchy based on action severity
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Fade-ins, transitions, and hover effects
- **Professional UX**: Clean, modern interface matching Orca design system

## 🔌 API Integration

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
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=http://localhost:3001
```

### API Client
Configuration in `src/constants/index.js`:
```javascript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
export const WS_URL = process.env.REACT_APP_WS_URL || 'http://localhost:3001';
```

## 🎯 Implementation Status

### ✅ Completed Features

#### UI/UX Components
- ✅ Dark theme with custom color palette
- ✅ Responsive sidebar navigation
- ✅ Multi-gradient metric cards (5 color variants)
- ✅ Modal system (Base, Confirm, Success)
- ✅ Icon-only action buttons with hover tooltips
- ✅ Professional table layouts with fixed-width action columns
- ✅ Gradient-themed filter sections
- ✅ Smooth animations and transitions
- ✅ Glass-morphism card effects

#### State Management
- ✅ Zustand stores for alerts, sessions, firewall, metrics
- ✅ Alert lifecycle management (Open → Investigating → Resolved/Dismissed)
- ✅ Session termination workflow
- ✅ Firewall rule CRUD operations
- ✅ Real-time metric updates

#### Pages & Features
- ✅ Dashboard with live metrics and recent activity
- ✅ Sessions page with view/block/terminate actions
- ✅ Alerts page with complete lifecycle workflow
- ✅ Firewall page with add/toggle/delete operations
- ✅ Navigation between pages with React Router
- ✅ Confirmation modals for all destructive actions
- ✅ Success notifications with auto-close
- ✅ Advanced filtering on all pages

#### Code Quality
- ✅ Consistent button alignment across all tables
- ✅ Conditional action visibility based on status
- ✅ Color-coded actions for visual hierarchy
- ✅ Proper tooltip implementation
- ✅ Responsive design patterns

### 🚧 Pending Implementation

#### Backend Services (Planned)
- ⏳ Data Ingestion Service - Log file monitoring
- ⏳ UBA Service - Anomaly detection engine
- ⏳ Orchestration & Response Service - Automated actions
- ⏳ Session & Alert Service - REST API endpoints
- ⏳ WebSocket Service - Real-time updates
- ⏳ Database integration (PostgreSQL/MongoDB)
- ⏳ Message broker (Kafka/RabbitMQ)

#### Integration Features
- ⏳ Real-time WebSocket connections
- ⏳ API client with authentication
- ⏳ Live data streaming from backend
- ⏳ Persistent data storage
- ⏳ User authentication and authorization
- ⏳ Rate limiting and security middleware

#### Advanced Features
- ⏳ Data visualization with Recharts
- ⏳ Export functionality (CSV, PDF)
- ⏳ Bulk operations for alerts and rules
- ⏳ Advanced search with filters
- ⏳ Notification system
- ⏳ Activity logs and audit trails
- ⏳ Dashboard customization
- ⏳ User preferences and settings

### 🎨 Design Achievements
- Professional dark theme matching Orca design system
- Multi-color gradient system for visual distinction
- Icon-only buttons eliminating text wrapping issues
- Hover tooltips providing context without clutter
- Consistent spacing and alignment across all pages
- Smooth animations enhancing user experience
- Color-coded actions for intuitive interaction
- Glass-morphism effects for modern aesthetic

---

## 🚀 Quick Start

### Current Development Status
The frontend UI is **fully functional** with mock data and complete user interactions. All pages, modals, and workflows are operational and ready for backend integration.

### Start Development Server
```bash
npm start
```

Visit http://localhost:3000 to see:
- Interactive dashboard with metrics
- Functional session management with termination
- Complete alert lifecycle (Investigate → Resolve → Dismiss)
- Firewall rule management with add/delete operations
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

### Core Dependencies
- `react` (19.2.0) - UI framework with latest features
- `react-dom` (19.2.0) - React DOM rendering
- `react-router-dom` (^7.1.3) - Client-side routing
- `zustand` (^5.0.3) - Lightweight state management
- `react-icons` (^5.4.0) - Feather Icons and more

### Development Dependencies
- `tailwindcss` (^3.4.0) - Utility-first CSS framework
- `postcss` (^8.4.0) - CSS transformation tool
- `autoprefixer` (^10.4.0) - CSS vendor prefixes
- `@tailwindcss/postcss` - PostCSS integration
- `react-scripts` (5.0.1) - Create React App build scripts

### Optional (for future integration)
- `axios` - HTTP client for API calls
- `socket.io-client` - WebSocket real-time updates
- `recharts` - Data visualization charts
- `date-fns` - Date manipulation utilities

## 🚢 Deployment

### Docker (Planned)
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

### Environment-specific Builds
- Development: `npm start`
- Production: `npm run build` + static file server (nginx/serve)

## 🔐 Security Considerations

- API authentication and authorization (JWT tokens)
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- WebSocket authentication
- Secure session management

## 📈 Performance Optimization

- Code splitting with React.lazy()
- Memoization with React.memo()
- Virtual scrolling for large data tables
- Debounced search inputs
- Optimized re-renders with Zustand

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built for enterprise-grade VNC security monitoring and automated response.

## 📞 Support

For issues and questions, please open a GitHub issue or contact the development team.

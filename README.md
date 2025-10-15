# VNC Data Exfiltration SOAR Platform

A full-stack, real-time Security Orchestration, Automation, and Response (SOAR) platform for VNC Data Exfiltration detection. Built with enterprise-grade microservices architecture for real-world data ingestion, user behavior analysis (UBA), and dynamic security responses.

## 🎯 Project Overview

This platform provides comprehensive monitoring and automated response capabilities for VNC server security, including:

- **Real-time Monitoring**: Live VNC session tracking with data exfiltration detection
- **User Behavior Analytics**: ML-powered anomaly detection and risk scoring
- **Automated Response**: Dynamic firewall rule creation and session termination
- **Alert Management**: Multi-severity alert system with status tracking
- **Interactive Dashboard**: Dark-themed UI with real-time metrics and visualization

## 🏗️ Architecture

### Frontend (React)
- **Framework**: React 19.2.0 with functional components and hooks
- **Routing**: React Router DOM for multi-page navigation
- **State Management**: Zustand for global state (alerts, sessions, firewall, metrics)
- **Styling**: Tailwind CSS with custom dark theme
- **Real-time Communication**: Socket.IO client for WebSocket connections
- **Data Visualization**: Recharts for charts and graphs
- **API Client**: Axios with interceptors

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
├── src/
│   ├── components/        # React components
│   │   ├── common/       # Reusable UI components
│   │   └── dashboard/    # Dashboard-specific components
│   ├── layouts/          # Page layouts
│   ├── pages/            # Main application pages
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API and WebSocket services
│   ├── store/            # Zustand state management
│   ├── utils/            # Utility functions
│   ├── constants/        # Configuration and constants
│   ├── App.js            # Root component with routing
│   └── index.js          # Application entry point
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Background**: `#0D0E1C` (Primary dark)
- **Surface**: `#17182F` (Card/panel background)
- **Primary Accent**: `#6351ED` (Purple)
- **Secondary Accent**: `#8884d8` (Blue)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Orange)
- **Danger**: `#ef4444` (Red)

### UI Components
- Dark theme with gradient effects
- Card-based layout with glass-morphism
- Responsive sidebar navigation
- Interactive charts and tables
- Status badges and metric cards

## 📊 Features

### Dashboard
- Real-time metrics overview (active sessions, alerts, firewall rules)
- Alert severity and status distribution charts
- Traffic volume trend analysis
- Recent alerts timeline
- Active VNC sessions summary

### Sessions Management
- Live VNC session monitoring
- Session details (source IP, destination, duration, data transferred)
- Risk level assessment
- Session termination controls
- Search and filter capabilities

### Alerts System
- Multi-severity alert management (Critical, High, Medium, Low, Info)
- Alert status tracking (Open, Investigating, Resolved, Closed)
- Bulk actions (acknowledge, resolve, delete)
- Time-based filtering
- Alert details and investigation tools

### Firewall Management
- Dynamic firewall rule creation
- Rule status management (Active, Inactive, Pending)
- Action types (Block, Allow, Rate Limit, Monitor)
- Rule modification and deletion
- Rule effectiveness tracking

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

## 🧪 Development Features

### Mock Data
Development mode includes mock data generators for:
- Sample alerts with varying severities
- Simulated VNC sessions
- Firewall rules
- System metrics

Mock data automatically loads when backend services are unavailable.

### Custom Hooks
- `useWebSocket`: Manages WebSocket connections and event handling
- `useDataFetcher`: Handles initial data loading with error handling

## 🐛 Known Issues

### Tailwind CSS Compilation
**Issue**: PostCSS plugin compatibility between Tailwind CSS v4 and react-scripts 5.0.1

**Error**: 
```
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin
```

**Temporary Solutions**:
1. **Option A**: Downgrade to Tailwind CSS v3:
   ```bash
   npm install -D tailwindcss@^3.4.0
   ```
   Update `postcss.config.js`:
   ```javascript
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

2. **Option B**: Migrate to Vite (requires project restructure)

## 📦 Dependencies

### Core
- `react` (19.2.0) - UI framework
- `react-router-dom` - Routing
- `zustand` - State management
- `axios` - HTTP client
- `socket.io-client` - WebSocket client

### UI & Styling
- `tailwindcss` - CSS framework
- `recharts` - Data visualization
- `react-icons` - Icon library
- `date-fns` - Date utilities

### Development
- `@tailwindcss/postcss` - PostCSS plugin
- `autoprefixer` - CSS vendor prefixes

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

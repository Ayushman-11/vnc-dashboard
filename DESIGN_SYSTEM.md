# VNC SOAR Dashboard - Design System

> **IMPORTANT FOR AI/LLM DEVELOPERS**: This document defines the complete design system for the VNC SOAR Dashboard. When creating new components, pages, or features, **ALWAYS follow these guidelines** to maintain visual consistency across the application.

---

## 🎨 Color System

### Core Colors
```javascript
// Background & Surfaces
const COLORS = {
  // Backgrounds
  background: '#0D0E1C',        // Primary dark background
  surface: '#17182F',            // Card/panel background
  surfaceHover: '#1F2142',       // Hover state for interactive surfaces
  
  // Borders & Dividers
  border: 'rgba(255, 255, 255, 0.1)',
  borderHover: 'rgba(255, 255, 255, 0.2)',
  
  // Text Colors
  textPrimary: '#FFFFFF',        // Primary text (white)
  textSecondary: '#9CA3AF',      // Secondary text (gray-400)
  textMuted: '#6B7280',          // Muted text (gray-500)
};
```

### Action Colors (Semantic)
```javascript
// Use these colors for specific action types
const ACTION_COLORS = {
  // View/Read Actions (Purple)
  view: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    hover: 'hover:bg-purple-500/30',
    gradient: 'from-purple-500/20 to-purple-600/20',
  },
  
  // Warning/Investigation Actions (Orange)
  warning: {
    bg: 'bg-orange-500/20',
    text: 'text-orange-400',
    hover: 'hover:bg-orange-500/30',
    gradient: 'from-orange-500/20 to-orange-600/20',
  },
  
  // Destructive/Danger Actions (Red)
  danger: {
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    hover: 'hover:bg-red-500/30',
    gradient: 'from-red-500/20 to-red-600/20',
  },
  
  // Success/Positive Actions (Green)
  success: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    hover: 'hover:bg-green-500/30',
    gradient: 'from-green-500/20 to-green-600/20',
  },
  
  // Neutral Actions (Gray)
  neutral: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-400',
    hover: 'hover:bg-gray-500/30',
    gradient: 'from-gray-500/20 to-gray-600/20',
  },
  
  // Info Actions (Blue)
  info: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    hover: 'hover:bg-blue-500/30',
    gradient: 'from-blue-500/20 to-blue-600/20',
  },
};
```

### Gradient System
```javascript
// Use different gradients for visual distinction
const GRADIENTS = {
  purple: 'bg-gradient-to-br from-purple-500/20 to-purple-600/20',
  blue: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20',
  teal: 'bg-gradient-to-br from-teal-500/20 to-teal-600/20',
  pink: 'bg-gradient-to-br from-pink-500/20 to-pink-600/20',
  orange: 'bg-gradient-to-br from-orange-500/20 to-orange-600/20',
  default: 'bg-gradient-to-br from-purple-500/10 to-blue-500/10',
};

// Apply different gradients to metric cards for visual distinction
// Example: Card 1 = purple, Card 2 = blue, Card 3 = teal, Card 4 = pink, Card 5 = orange
```

---

## 🧩 Component Patterns

### 1. Icon Action Buttons

**CRITICAL**: All action buttons in tables MUST use icon-only design with tooltips.

```jsx
// ✅ CORRECT PATTERN
<button 
  className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all group relative"
  onClick={handleAction}
  title="Action Name"
>
  <FiIcon className="text-lg" />
  <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
    Action Name
  </span>
</button>

// ❌ INCORRECT - Don't use text buttons
<Button size="sm" variant="ghost">
  Action Name
</Button>
```

**Specifications**:
- **Size**: Fixed `w-10 h-10` (40×40px)
- **Icon Size**: `text-lg` (18px)
- **Border Radius**: `rounded-lg`
- **Background**: Semi-transparent color with `/20` opacity
- **Hover**: Increase opacity to `/30`
- **Transition**: `transition-all` for smooth effects
- **Tooltip**: Absolute positioned, bottom-full, hidden by default, shown on group-hover

**Color Coding**:
```jsx
// View/Read actions
bg-purple-500/20 text-purple-400 hover:bg-purple-500/30

// Warning/Investigate actions
bg-orange-500/20 text-orange-400 hover:bg-orange-500/30

// Destructive actions (Delete, Terminate)
bg-red-500/20 text-red-400 hover:bg-red-500/30

// Positive actions (Resolve, Enable)
bg-green-500/20 text-green-400 hover:bg-green-500/30

// Neutral actions (Dismiss)
bg-gray-500/20 text-gray-400 hover:bg-gray-500/30
```

**Icon Selection** (from react-icons/fi):
```javascript
import { 
  FiEye,              // View/Details
  FiEdit,             // Edit
  FiTrash2,           // Delete
  FiX,                // Close/Terminate/Cancel
  FiCheck,            // Confirm/Accept
  FiCheckCircle,      // Resolve/Complete
  FiXCircle,          // Dismiss/Reject
  FiAlertTriangle,    // Warning/Investigate
  FiShield,           // Security/Block
  FiToggleLeft,       // Disable/Off
  FiToggleRight,      // Enable/On
  FiDownload,         // Download/Export
  FiUpload,           // Upload/Import
  FiRefreshCw,        // Refresh/Reload
  FiFilter,           // Filter
  FiSearch,           // Search
  FiPlus,             // Add/Create
} from 'react-icons/fi';
```

### 2. Action Column in Tables

```jsx
{
  header: 'Actions',
  accessor: 'actions',
  render: (row) => (
    <div className="flex items-center justify-end gap-2 min-w-[140px]">
      {/* Action buttons here */}
      {/* Use placeholder divs for hidden buttons to maintain alignment */}
      {condition ? (
        <button>...</button>
      ) : (
        <div className="w-10" /> // Placeholder
      )}
    </div>
  ),
}
```

**Specifications**:
- **Alignment**: `justify-end` (right-aligned)
- **Gap**: `gap-2` (8px between buttons)
- **Min-width**: Calculate based on number of buttons
  - 1 button: `min-w-[50px]`
  - 2 buttons: `min-w-[100px]`
  - 3 buttons: `min-w-[140px]`
  - 4 buttons: `min-w-[180px]`
- **Placeholders**: Use `<div className="w-10" />` for hidden buttons

### 3. Modal Components

#### Base Modal
```jsx
import { Modal } from '../components/common';

<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Modal Title"
  size="md" // sm, md, lg, xl
>
  {/* Modal content */}
</Modal>
```

#### Confirm Modal
```jsx
import { ConfirmModal } from '../components/common';

<ConfirmModal
  isOpen={isOpen}
  onClose={onClose}
  onConfirm={handleConfirm}
  title="Confirm Action"
  message="Are you sure you want to proceed?"
  type="warning" // warning, danger, info, success
  confirmText="Confirm"
  cancelText="Cancel"
/>
```

**Modal Types**:
- `warning`: Orange, FiAlertTriangle icon
- `danger`: Red, FiAlertTriangle icon  
- `info`: Blue, FiInfo icon
- `success`: Green, FiCheckCircle icon

#### Success Modal
```jsx
import { SuccessModal } from '../components/common';

<SuccessModal
  isOpen={isOpen}
  onClose={onClose}
  title="Success"
  message="Operation completed successfully"
/>
```

**Features**: Auto-closes after 2 seconds, large checkmark icon

### 4. Cards

#### Metric Cards
```jsx
import { MetricCard } from '../components/common';

<MetricCard
  title="Metric Name"
  value="123"
  icon={FiActivity}
  trend={{ value: 12, direction: 'up' }}
  gradient="purple" // purple, blue, teal, pink, orange
/>
```

**Gradient Usage**: Use different gradients for each metric card for visual distinction.

#### Standard Cards
```jsx
import { Card } from '../components/common';

<Card 
  title="Card Title"
  gradient="default" // optional
>
  {/* Card content */}
</Card>
```

**Card Styling**:
```jsx
className="bg-[#17182F] border border-white/10 rounded-xl p-6 backdrop-blur-sm"
```

### 5. Filter Sections

```jsx
<div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-white/10">
  <h3 className="text-sm font-semibold text-white mb-3">Advanced Filters</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Filter controls */}
  </div>
</div>
```

**Specifications**:
- **Background**: Gradient with low opacity
- **Border**: `border-white/10`
- **Padding**: `p-4`
- **Title**: `text-sm font-semibold text-white mb-3`
- **Layout**: Grid with responsive columns

### 6. Status Badges

```jsx
// Severity badges
const SEVERITY_STYLES = {
  Critical: 'bg-red-500/20 text-red-400 border-red-500/50',
  High: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  Low: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
  Info: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
};

<span className={`px-2 py-1 rounded-full text-xs border ${SEVERITY_STYLES[severity]}`}>
  {severity}
</span>
```

**Pattern**:
- Background: Color with `/20` opacity
- Text: Color at `/400` brightness
- Border: Color with `/50` opacity
- Padding: `px-2 py-1`
- Border radius: `rounded-full`
- Font size: `text-xs`

### 7. Tables

```jsx
import { Table } from '../components/common';

<Table
  columns={columns}
  data={data}
  className="custom-class"
/>
```

**Column Definition**:
```javascript
const columns = [
  {
    header: 'Column Name',
    accessor: 'dataKey',
    render: (row) => (
      // Custom render
    ),
  },
];
```

**Table Styling**:
- Header: `bg-white/5 text-gray-400 text-xs uppercase`
- Row hover: `hover:bg-white/5`
- Border: `border-b border-white/10`
- Text: `text-sm text-gray-300`

---

## 📐 Layout Patterns

### Page Structure
```jsx
<div className="p-6 space-y-6">
  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Page Title</h1>
      <p className="text-gray-400">Page description</p>
    </div>
    <div className="flex items-center gap-3">
      {/* Action buttons */}
    </div>
  </div>

  {/* Filters (optional) */}
  <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-white/10">
    {/* Filter controls */}
  </div>

  {/* Main Content */}
  <Card>
    {/* Content here */}
  </Card>
</div>
```

### Responsive Grid
```jsx
// Metrics grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Metric cards */}
</div>

// Two-column layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Content */}
</div>

// Filter grid
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Filters */}
</div>
```

---

## ✨ Animation & Transitions

### Standard Transitions
```jsx
// Button hover
className="transition-all duration-200 ease-in-out"

// Card hover
className="transition-transform duration-200 hover:scale-[1.02]"

// Fade in
className="animate-fade-in"
```

### Tailwind Config (already configured)
```javascript
// tailwind.config.js
module.exports = {
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
}
```

### Modal Animations
```jsx
// Backdrop fade
className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200"

// Modal slide + fade
className="animate-fade-in"
```

---

## 🎯 Best Practices

### 1. Consistency Rules
- ✅ **ALWAYS** use icon-only buttons in table action columns
- ✅ **ALWAYS** include hover tooltips for icon buttons
- ✅ **ALWAYS** use confirmation modals for destructive actions
- ✅ **ALWAYS** show success modals after operations complete
- ✅ **ALWAYS** use different gradients for multiple metric cards on the same page
- ✅ **ALWAYS** use placeholder divs for hidden action buttons
- ✅ **ALWAYS** right-align action columns with `justify-end`

### 2. Color Usage
- 🟣 **Purple**: View, read, details actions
- 🟠 **Orange**: Warning, investigate, caution actions
- 🔴 **Red**: Delete, terminate, destructive actions
- 🟢 **Green**: Resolve, enable, positive actions
- ⚫ **Gray**: Dismiss, neutral actions
- 🔵 **Blue**: Info, general actions

### 3. Typography
```jsx
// Page title
className="text-3xl font-bold text-white mb-2"

// Page subtitle
className="text-gray-400"

// Section heading
className="text-xl font-semibold text-white mb-4"

// Card title
className="text-lg font-semibold text-white mb-3"

// Body text
className="text-sm text-gray-300"

// Muted text
className="text-xs text-gray-500"
```

### 4. Spacing
```jsx
// Page padding
className="p-6 space-y-6"

// Section spacing
className="mb-6"

// Card padding
className="p-6"

// Button/Icon gaps
className="gap-2" // 8px
className="gap-3" // 12px
className="gap-4" // 16px
```

### 5. State Management
```javascript
// Use Zustand for global state
import { useAlertStore } from '../store/alertStore';

const { alerts, updateAlert, deleteAlert } = useAlertStore();
```

---

## 🚫 Anti-Patterns (DO NOT USE)

### ❌ Don't Use Text Buttons in Tables
```jsx
// ❌ WRONG
<Button size="sm" variant="ghost">
  View Details
</Button>

// ✅ CORRECT
<button className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all group relative">
  <FiEye className="text-lg" />
  <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
    View Details
  </span>
</button>
```

### ❌ Don't Use Different Background Colors
```jsx
// ❌ WRONG - Using white or light backgrounds
className="bg-white"
className="bg-gray-100"

// ✅ CORRECT - Use dark theme colors
className="bg-[#17182F]"
className="bg-[#0D0E1C]"
```

### ❌ Don't Skip Confirmation Modals
```jsx
// ❌ WRONG - Direct deletion
onClick={() => deleteItem(id)}

// ✅ CORRECT - Show confirmation first
onClick={() => {
  setSelectedItem(item);
  setShowDeleteModal(true);
}}
```

### ❌ Don't Use Single Gradient for All Cards
```jsx
// ❌ WRONG - Same gradient for all metric cards
<MetricCard gradient="purple" />
<MetricCard gradient="purple" />
<MetricCard gradient="purple" />

// ✅ CORRECT - Different gradients for visual distinction
<MetricCard gradient="purple" />
<MetricCard gradient="blue" />
<MetricCard gradient="teal" />
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind defaults)
```javascript
sm: '640px'   // Small devices
md: '768px'   // Medium devices (tablets)
lg: '1024px'  // Large devices (desktops)
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X Extra large devices
```

### Responsive Patterns
```jsx
// Mobile-first grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"

// Responsive text
className="text-xl md:text-2xl lg:text-3xl"

// Responsive padding
className="p-4 md:p-6 lg:p-8"

// Hide on mobile
className="hidden md:block"

// Show only on mobile
className="block md:hidden"
```

---

## 🔧 Component Imports

### Standard Imports Pattern
```javascript
import React, { useState } from 'react';
import { 
  FiEye, 
  FiEdit, 
  FiTrash2,
  // ... other icons
} from 'react-icons/fi';
import { 
  Card, 
  Table, 
  Modal, 
  ConfirmModal, 
  SuccessModal,
  MetricCard,
} from '../components/common';
import { useAlertStore } from '../store/alertStore';
```

---

## 📚 Example: Creating a New Page

```jsx
import React, { useState } from 'react';
import { FiEye, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { Card, Table, Modal, ConfirmModal, SuccessModal } from '../components/common';
import { useMyStore } from '../store/myStore';

const MyNewPage = () => {
  const { items, deleteItem } = useMyStore();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDelete = () => {
    deleteItem(selectedItem.id);
    setShowDeleteModal(false);
    setShowSuccessModal(true);
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div className="flex items-center justify-end gap-2 min-w-[140px]">
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all group relative"
            onClick={() => handleView(row)}
            title="View"
          >
            <FiEye className="text-lg" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
              View Details
            </span>
          </button>
          
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-all group relative"
            onClick={() => handleEdit(row)}
            title="Edit"
          >
            <FiEdit className="text-lg" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
              Edit
            </span>
          </button>
          
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all group relative"
            onClick={() => {
              setSelectedItem(row);
              setShowDeleteModal(true);
            }}
            title="Delete"
          >
            <FiTrash2 className="text-lg" />
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-[#1a1b35] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
              Delete
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
          <h1 className="text-3xl font-bold text-white mb-2">My New Page</h1>
          <p className="text-gray-400">Manage your items</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all">
          <FiPlus />
          Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-4 border border-white/10">
        <h3 className="text-sm font-semibold text-white mb-3">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filter controls */}
        </div>
      </div>

      {/* Table */}
      <Card>
        <Table columns={columns} data={items} />
      </Card>

      {/* Modals */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        type="danger"
        confirmText="Delete"
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success"
        message="Item deleted successfully"
      />
    </div>
  );
};

export default MyNewPage;
```

---

## 🤖 AI/LLM Guidelines

When you (AI/LLM) are asked to create or modify components:

1. **Read this document first** before generating code
2. **Follow the exact patterns** shown in the examples
3. **Use the correct color coding** for action types
4. **Always include tooltips** for icon buttons
5. **Use confirmation modals** for destructive actions
6. **Apply appropriate gradients** for visual distinction
7. **Maintain consistent spacing** and typography
8. **Use the correct imports** from established components
9. **Don't deviate from the dark theme** (no light colors)
10. **Test responsiveness** with Tailwind breakpoints

### Quick Checklist for New Features
- [ ] Uses icon-only buttons in tables
- [ ] Includes hover tooltips for all icons
- [ ] Uses confirmation modals for destructive actions
- [ ] Shows success modals after operations
- [ ] Follows color coding system (purple/orange/red/green)
- [ ] Uses gradient backgrounds appropriately
- [ ] Maintains dark theme (#0D0E1C, #17182F)
- [ ] Includes proper spacing (p-6, space-y-6)
- [ ] Has responsive grid layouts
- [ ] Uses Feather Icons (react-icons/fi)

---

**Last Updated**: October 2025  
**Version**: 1.0.0  
**Maintained By**: VNC SOAR Dashboard Team

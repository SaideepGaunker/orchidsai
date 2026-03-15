# Admin Portal - User Guide

## Overview

The Admin Portal is a comprehensive administrative interface for managing the AI Interview Coach platform. It provides role-based access control with three distinct admin roles, each with specific permissions and capabilities.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Admin Roles](#admin-roles)
3. [Features](#features)
4. [Navigation](#navigation)
5. [Responsive Design](#responsive-design)
6. [Accessibility](#accessibility)
7. [Mock Data vs Production](#mock-data-vs-production)

---

## Getting Started

### Accessing the Admin Portal

1. Navigate to `/admin-login`
2. Enter your admin credentials
3. You'll be redirected to the appropriate dashboard based on your role

### Mock Admin Accounts (Development Only)

For development and testing, use these mock accounts:

| Email | Password | Role | Access |
|-------|----------|------|--------|
| admin@orchids.ai | any | Platform Admin | Platform, Licenses, Subscriptions |
| validator@orchids.ai | any | Question Validator | Questions only |
| superadmin@orchids.ai | any | Super Admin | Full access |

**Note:** In the mock system, any password will work. In production, proper authentication is required.

---

## Admin Roles

### 1. Platform Admin (`platform_admin`)

**Access:**
- ✅ Platform Monitoring (system health, performance, bug reports, analytics)
- ✅ License Management (B2B accounts, subscriptions, payments)
- ✅ Subscription Management (B2C accounts, subscriptions, payments, refunds)
- ❌ Question Validation

**Responsibilities:**
- Monitor system health and performance
- Manage institutional (B2B) accounts and licenses
- Handle student (B2C) subscriptions and payments
- Process refunds and billing adjustments
- Review and respond to bug reports

### 2. Question Validator (`question_validator`)

**Access:**
- ❌ Platform Monitoring
- ❌ License Management
- ❌ Subscription Management
- ✅ Question Validation

**Responsibilities:**
- Review AI-generated questions
- Approve or reject questions
- Edit questions before approval
- Provide rejection reasons
- Maintain validation history

**Note:** Question validators are domain experts who focus solely on ensuring question quality.

### 3. Super Admin (`super_admin`)

**Access:**
- ✅ Full access to all sections
- ✅ Can manage admin users (future feature)
- ✅ Highest level of system access

**Responsibilities:**
- All responsibilities of Platform Admin and Question Validator
- System-wide oversight
- Admin user management (when implemented)

---

## Features

### Platform Monitoring

**System Metrics Dashboard**
- Real-time system status (operational/degraded/down)
- Performance metrics (response time, error rate, throughput)
- Active users and concurrent sessions
- Auto-refreshes every 30 seconds

**Bug Report Management**
- View all user-submitted bug reports
- Filter by status, severity, and user type
- Update bug report status
- Add notes and track resolution

**Analytics**
- User registration trends by type
- Daily and monthly active users
- Interview and exam session statistics
- Date range filtering

### License Management (B2B)

**Account Management**
- View all institutional accounts
- Search by institution name or email
- Filter by subscription status
- Suspend or reactivate accounts
- Edit account details

**Subscription Plans**
- Create and manage B2B pricing plans
- Configure features and license counts
- Activate or deactivate plans
- View plan usage statistics

**Payment Tracking**
- View payment history
- Track payment status (paid/pending/overdue)
- Record manual payments
- Generate invoices
- Monitor upcoming renewals

**Renewal Management**
- View subscriptions expiring within 30 days
- Process manual renewals
- Upgrade or downgrade plans
- Maintain subscription change history

### Subscription Management (B2C)

**Account Management**
- View all student accounts
- Search by name or email
- Filter by plan and status
- Suspend or reactivate accounts
- View account activity history

**Subscription Operations**
- Change subscription plans
- Grant promotional access
- Configure trial periods
- View subscription history

**Payment & Refunds**
- Track payment status
- Process refunds with reasons
- Adjust billing amounts
- Maintain transaction audit trail

### Question Validation

**Domain Selection**
- Choose from 6 domains:
  - Frontend Development
  - Backend Development
  - Data Science
  - System Design
  - DevOps
  - Mobile Development
- View pending question counts per domain

**Question Review**
- View questions with pagination (20 per page)
- Filter by difficulty (easy/medium/hard)
- Filter by type (technical/behavioral/system design)
- Preview question content
- Quick approve/reject actions

**Detailed Review**
- Full question display
- Edit mode for content, difficulty, type, and domain
- Approve with or without edits
- Reject with mandatory reason
- View question metadata

**Bulk Operations**
- Select multiple questions
- Bulk approve or reject
- Progress indicator during operations
- Operation summary (successful/failed counts)

**Validation History**
- Complete audit trail
- Filter by validator, action type, date range, domain
- Validation statistics (total validated, approval rate, rejection rate)

---

## Navigation

### Sidebar Navigation

The sidebar provides quick access to all sections based on your role:

- **Platform Monitor** - System health and analytics
- **License Management** - B2B accounts and subscriptions
- **Subscriptions** - B2C student accounts
- **Question Validation** - AI-generated question review

**Active Route Highlighting:**
- Current section is highlighted with amber gradient
- Amber border on the left side
- Subtle glow effect

### Keyboard Navigation

- **Tab** - Move between interactive elements
- **Enter/Space** - Activate buttons and links
- **Escape** - Close modals and dialogs
- **Arrow Keys** - Navigate within dropdowns and lists

### Skip Navigation

Press **Tab** when the page loads to reveal a "Skip to main content" link that bypasses the sidebar navigation.

---

## Responsive Design

### Minimum Requirements

- **Minimum Width:** 1280px
- **Recommended:** 1440px or wider
- **Display:** Desktop/laptop screens

### Layout

- **Sidebar:** Fixed 280px width
- **Main Content:** Fluid with max-width 1600px
- **Spacing:** Generous padding for premium feel

### Components

All components are designed to work within the minimum width constraint:

- **Metrics Grid:** 4 columns on large screens, adapts to 2 columns on smaller displays
- **Tables:** Horizontal scroll if content exceeds container width
- **Cards:** Responsive grid layout (2-3 columns based on content)
- **Modals:** Centered with appropriate max-width

---

## Accessibility

The Admin Portal is built with accessibility in mind, following WCAG 2.1 AA standards:

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Logical tab order throughout the interface
- Focus indicators with amber glow (visible on Tab key press)
- Skip navigation link for quick access to main content

### Screen Reader Support

- Semantic HTML elements (`<nav>`, `<main>`, `<article>`, etc.)
- ARIA labels on all interactive elements
- ARIA live regions for dynamic content updates
- Status announcements for loading states and errors

### Visual Accessibility

- High contrast text (21:1 ratio for white on dark backgrounds)
- Color-coded status indicators with icons (not relying on color alone)
- Minimum touch target size of 44x44px
- Focus indicators visible with 2px outline and glow effect

### Motion & Animation

- Respects `prefers-reduced-motion` setting
- Animations disabled for users who prefer reduced motion
- Loading spinners have alternative text announcements

### Error Handling

- Clear, descriptive error messages
- Field-level validation with specific error text
- Error messages persist until dismissed or corrected
- Success messages auto-dismiss after 5 seconds

---

## Mock Data vs Production

### Current Implementation (Mock Data)

The admin portal currently uses mock data stored in `src/lib/admin/mock/mockData.ts`. This allows for:

- **Frontend development** without backend dependency
- **UI/UX testing** with realistic data
- **Demo purposes** for stakeholders
- **Role-based access testing** with mock users

### Mock Data Features

- Realistic sample data for all entities
- Simulated API delays (300-600ms)
- Random error simulation (5% chance in development)
- localStorage-based session management
- Client-side logging

### Switching to Production API

When ready to integrate with a real backend, follow the **Backend Integration Guide** located at:

```
src/lib/admin/BACKEND_INTEGRATION_GUIDE.md
```

This comprehensive guide includes:

1. **API Endpoints Required** - Complete list of endpoints needed
2. **Authentication Setup** - JWT token-based authentication
3. **Database Schema** - Required tables and relationships
4. **Step-by-Step Integration** - Detailed migration instructions
5. **Security Considerations** - Production security requirements
6. **Testing Strategy** - Unit, integration, and E2E tests

### Key Files to Replace

When integrating with backend:

1. **`src/lib/admin/mock/mockApi.ts`** → Replace with real API calls
2. **`src/lib/admin/utils/logging.ts`** → Replace localStorage logging with backend logging
3. **`src/contexts/AuthContext.tsx`** → Update to use real JWT tokens
4. **Environment variables** → Add `NEXT_PUBLIC_API_URL`

### Environment Configuration

```bash
# .env.local (for production)
NEXT_PUBLIC_API_URL=https://api.yourapp.com/api
NEXT_PUBLIC_ENABLE_MOCK_API=false
```

---

## Design System

### Color Palette

**Background Gradients:**
- Primary: Deep charcoal (#0a0a0f) to midnight navy (#1a1f2e)
- Glass cards: White with 5% opacity + backdrop blur

**Accent Colors:**
- Primary: Warm amber (#fb923c) for CTAs and highlights
- Secondary: Subtle teal (#06b6d4) for secondary actions
- Success: Green (#10b981)
- Error: Red (#ef4444)
- Warning: Amber (#f59e0b)

**Text Colors:**
- Primary: White (#ffffff) for headings
- Secondary: Light gray (#9ca3af) for body text
- Tertiary: Medium gray (#6b7280) for labels

### Typography

- **Headings:** Bold, white, tracking-tight
- **Body:** Regular, gray-400, readable line-height
- **Labels:** Medium weight, gray-300

### Components

**Glass Cards:**
- Background: `bg-white/5 backdrop-blur-xl`
- Border: `border-white/10`
- Rounded: `rounded-2xl`
- Shadow: Soft glass shadow with depth

**Buttons:**
- Primary: Amber gradient with glow effect
- Secondary: Glass effect with white/5 background
- Hover: Increased glow and slight lift

**Status Badges:**
- Color-coded with glow effects
- Icons for visual clarity
- Rounded-full design

### Animations

- **Transitions:** Smooth 300ms ease-in-out
- **Hover Effects:** Subtle lift and glow increase
- **Loading States:** Shimmer animation for skeletons
- **Focus:** Amber glow with 4px spread

---

## Troubleshooting

### Common Issues

**1. "Access Denied" or Redirected to Unauthorized Page**
- Check that you're logged in with an admin account
- Verify your role has permission for the section you're trying to access
- Try logging out and logging back in

**2. Data Not Loading**
- Check browser console for errors
- Verify you're using a supported browser (Chrome, Firefox, Safari, Edge)
- Clear browser cache and reload

**3. Build Errors**
- Ensure all dependencies are installed: `npm install`
- Check that Node.js version is 18 or higher
- Try deleting `.next` folder and rebuilding

**4. Styling Issues**
- Ensure Tailwind CSS is properly configured
- Check that `globals.css` is imported in root layout
- Verify browser supports backdrop-filter (for glass effects)

### Browser Support

- **Chrome:** 90+
- **Firefox:** 88+
- **Safari:** 14+
- **Edge:** 90+

### Performance

For optimal performance:
- Use a modern browser
- Ensure stable internet connection
- Close unnecessary browser tabs
- Use hardware acceleration if available

---

## Support & Documentation

### Additional Resources

- **Design Document:** `.kiro/specs/admin-portal-system/design.md`
- **Requirements:** `.kiro/specs/admin-portal-system/requirements.md`
- **Backend Integration:** `src/lib/admin/BACKEND_INTEGRATION_GUIDE.md`
- **Authentication Guide:** `src/lib/admin/README.md`
- **Accessibility Guide:** `src/components/admin/ACCESSIBILITY.md`

### Development

For development questions:
1. Review the design and requirements documents
2. Check the mock data structure in `src/lib/admin/mock/mockData.ts`
3. Examine component implementations in `src/components/admin/`
4. Review error handling in `src/lib/admin/utils/errorHandling.ts`

---

## Future Enhancements

Planned features for future releases:

1. **Real-time Updates** - WebSocket integration for live metrics
2. **Advanced Analytics** - Custom report builder and data export
3. **Admin User Management** - Create and manage admin accounts
4. **Automated Workflows** - Scheduled tasks and notifications
5. **Mobile Support** - Responsive design for tablets and phones
6. **Dark/Light Mode Toggle** - User preference for theme
7. **Multi-language Support** - Internationalization (i18n)
8. **Advanced Search** - Full-text search across all entities

---

## Conclusion

The Admin Portal provides a powerful, user-friendly interface for managing all aspects of the AI Interview Coach platform. With its role-based access control, comprehensive features, and focus on accessibility, it enables administrators to efficiently perform their duties while maintaining security and data integrity.

For technical implementation details, refer to the design document and backend integration guide.

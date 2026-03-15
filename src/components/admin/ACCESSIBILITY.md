# Admin Portal Accessibility Features

This document outlines the accessibility features implemented in the Admin Portal System to ensure WCAG 2.1 Level AA compliance.

## Overview

The Admin Portal has been designed with accessibility as a core principle, ensuring that all users, including those using assistive technologies, can effectively navigate and use the system.

## WCAG 2.1 Level AA Compliance

### 1. Perceivable

#### 1.1 Text Alternatives (Level A)
- **1.1.1 Non-text Content**: All icons and images have `aria-hidden="true"` with accompanying text labels
- All interactive elements have descriptive `aria-label` attributes

#### 1.4 Distinguishable (Level AA)
- **1.4.3 Contrast (Minimum)**: All text meets minimum contrast ratios:
  - Primary text (white #ffffff): 21:1 contrast ratio
  - Secondary text (#d1d5db): 12:1 contrast ratio
  - Tertiary text (#9ca3af): 7:1 contrast ratio
- **1.4.11 Non-text Contrast**: Interactive elements have 3:1 contrast with amber focus indicators
- **1.4.13 Content on Hover or Focus**: Focus indicators are visible and persistent

### 2. Operable

#### 2.1 Keyboard Accessible (Level A)
- **2.1.1 Keyboard**: All functionality is available via keyboard
- **2.1.2 No Keyboard Trap**: Users can navigate away from all components using standard keyboard navigation
- Tab order follows logical reading order
- Enter and Space keys activate buttons and interactive elements

#### 2.4 Navigable (Level AA)
- **2.4.1 Bypass Blocks**: Skip navigation links provided to jump to main content and navigation
- **2.4.3 Focus Order**: Logical tab order throughout the application
- **2.4.7 Focus Visible**: Amber glow focus indicators on all interactive elements
- **2.4.11 Focus Not Obscured**: Focus indicators are never hidden by other content

#### 2.5 Input Modalities (Level AA)
- **2.5.5 Target Size**: All interactive elements meet minimum 44x44px touch target size
- **2.5.8 Target Size (Minimum)**: Spacing between interactive elements ensures easy activation

### 3. Understandable

#### 3.2 Predictable (Level AA)
- **3.2.1 On Focus**: No context changes occur on focus
- **3.2.2 On Input**: No unexpected context changes on input
- **3.2.4 Consistent Identification**: Components with same functionality are identified consistently

#### 3.3 Input Assistance (Level AA)
- **3.3.1 Error Identification**: Errors are clearly identified with descriptive messages
- **3.3.2 Labels or Instructions**: All form inputs have associated labels
- **3.3.3 Error Suggestion**: Error messages provide suggestions for correction
- **3.3.4 Error Prevention**: Confirmation dialogs for destructive actions

### 4. Robust

#### 4.1 Compatible (Level AA)
- **4.1.2 Name, Role, Value**: All UI components have appropriate ARIA attributes
- **4.1.3 Status Messages**: Live regions announce dynamic content updates

## Key Accessibility Features

### Skip Navigation Links
Located at the top of every page, visible on keyboard focus:
- Skip to main content
- Skip to navigation

```tsx
<SkipNavigation />
```

### Live Regions for Screen Readers
Dynamic content updates are announced to screen readers:

```tsx
const { announce } = useLiveRegion();

// Polite announcement (non-urgent)
announce("Data loaded successfully", "polite");

// Assertive announcement (urgent)
announce("Critical error occurred", "assertive");
```

### Focus Management
All interactive elements have visible focus indicators with amber glow:
- 2px solid outline with amber color
- 4px shadow with amber glow
- Smooth transitions

### ARIA Labels
All components include comprehensive ARIA attributes:

```tsx
// Navigation
<nav aria-label="Main navigation">
  <Link aria-current="page" aria-label="Navigate to Dashboard">
    Dashboard
  </Link>
</nav>

// Tables
<table role="table" aria-label="Data table with sortable columns">
  <th scope="col">Column Header</th>
</table>

// Buttons
<button 
  type="button"
  aria-label="Approve question"
  aria-busy={loading}
>
  Approve
</button>

// Modals
<Dialog aria-describedby="dialog-description">
  <DialogTitle>Review Question</DialogTitle>
  <p id="dialog-description" className="sr-only">
    Review and approve or reject AI-generated question
  </p>
</Dialog>
```

### Keyboard Navigation
Full keyboard support throughout the application:

| Key | Action |
|-----|--------|
| Tab | Move focus forward |
| Shift + Tab | Move focus backward |
| Enter | Activate button/link |
| Space | Activate button/checkbox |
| Escape | Close modal/dialog |
| Arrow Keys | Navigate within components |

### Screen Reader Support
Optimized for popular screen readers:
- JAWS
- NVDA
- VoiceOver
- TalkBack

Features:
- Semantic HTML structure
- Descriptive labels
- Status announcements
- Loading state indicators
- Error messages

### Color Contrast
All color combinations meet WCAG AA standards:

| Element | Foreground | Background | Ratio |
|---------|-----------|------------|-------|
| Primary text | #ffffff | #0a0a0f | 21:1 |
| Secondary text | #d1d5db | #0a0a0f | 12:1 |
| Tertiary text | #9ca3af | #0a0a0f | 7:1 |
| Amber accent | #fb923c | #0a0a0f | 8.5:1 |
| Success | #10b981 | #0a0a0f | 6.8:1 |
| Error | #ef4444 | #0a0a0f | 5.2:1 |

### Reduced Motion Support
Respects user's motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Mode
Enhanced visibility in high contrast mode:

```css
@media (prefers-contrast: high) {
  * {
    border-width: 2px;
  }
  
  *:focus-visible {
    outline-width: 3px;
  }
}
```

## Component-Specific Accessibility

### DataTable
- Sortable column headers with ARIA labels
- Row selection with keyboard support
- Pagination with descriptive labels
- Search with debouncing
- Loading states announced

### GlassCard
- Keyboard navigation when interactive
- Focus indicators
- Proper role attributes
- ARIA labels for context

### ActionButtonGroup
- Grouped buttons with role="group"
- Individual button labels
- Loading states with aria-busy
- Disabled state handling

### QuestionReviewModal
- Focus trap within modal
- Descriptive dialog title
- Form labels and validation
- Confirmation dialogs
- Keyboard shortcuts

### AdminSidebar
- Semantic navigation structure
- Active page indication
- Keyboard navigation
- User info region

## Testing Recommendations

### Manual Testing
1. **Keyboard Navigation**: Navigate entire application using only keyboard
2. **Screen Reader**: Test with NVDA/JAWS/VoiceOver
3. **Zoom**: Test at 200% zoom level
4. **Color Blindness**: Use color blindness simulators
5. **High Contrast**: Test in high contrast mode

### Automated Testing
Use tools like:
- axe DevTools
- WAVE
- Lighthouse Accessibility Audit
- Pa11y

### Browser Testing
Test in:
- Chrome with ChromeVox
- Firefox with NVDA
- Safari with VoiceOver
- Edge with Narrator

## Best Practices for Developers

### When Adding New Components

1. **Always include ARIA labels**:
```tsx
<button aria-label="Descriptive action">
  <Icon aria-hidden="true" />
  Text
</button>
```

2. **Use semantic HTML**:
```tsx
<nav>, <main>, <aside>, <header>, <footer>
```

3. **Provide keyboard support**:
```tsx
onKeyDown={(e) => {
  if (e.key === "Enter" || e.key === " ") {
    handleAction();
  }
}}
```

4. **Announce dynamic changes**:
```tsx
const { announce } = useLiveRegion();
announce("Content updated", "polite");
```

5. **Ensure focus management**:
```tsx
const buttonRef = useRef<HTMLButtonElement>(null);
useEffect(() => {
  buttonRef.current?.focus();
}, []);
```

6. **Test with keyboard only**:
- Unplug your mouse
- Navigate using Tab, Enter, Space, Escape
- Ensure all functionality is accessible

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

## Support

For accessibility issues or questions, please contact the development team or file an issue in the project repository.

## Compliance Statement

The Admin Portal System strives to meet WCAG 2.1 Level AA standards. We are committed to maintaining and improving accessibility for all users. If you encounter any accessibility barriers, please report them so we can address them promptly.

Last Updated: 2025

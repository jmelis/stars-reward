# Claude Code Spec: Children's Star Reward System

## Project Overview
Create a responsive HTML page for mobile devices that allows adults to give children stars as rewards during activities. The system uses a progress bar that fills up with each positive action, and awards a star after a configurable number of clicks.

## Technical Requirements

### Technology Stack
- **HTML5** for structure
- **CSS3** for styling and responsiveness
- **Vanilla JavaScript** (no frameworks)
- Mobile-first responsive design

### Core Functionality

#### Progress System
- Horizontal progress bar with green background
- Configurable threshold (default: 10 clicks to earn a star)
- Progress bar resets after reaching threshold
- Visual feedback on each click

#### Star System
- Maximum of 20 stars
- Stars displayed at the top of the page
- Yellow star icons
- Clear visual distinction between earned and potential stars

#### Controls
- **Plus Button**: Large, touch-friendly button to increase progress
- **Minus Button**: Smaller button to decrease stars/progress
- Both buttons should have clear visual feedback when pressed

#### State Management
- All state stored in JavaScript variables (no persistence)
- Page reload resets all progress
- Real-time updates to UI elements

## User Interface Specifications

### Mobile Responsiveness
- Design primarily for mobile devices (320px - 768px width)
- Touch-friendly button sizes (minimum 44px touch targets)
- Large, clear typography
- Adequate spacing between interactive elements

### Visual Design
- **Color Scheme**:
  - Progress bar: Green background (#4CAF50 or similar)
  - Stars: Yellow/gold (#FFD700 or similar)
  - Background: Light, child-friendly colors
  - Buttons: High contrast, accessible colors

- **Typography**:
  - Large, readable fonts
  - Child-friendly, rounded typography if possible
  - Clear labels for all interactive elements

### Layout Structure
```
┌─────────────────────────┐
│    Stars Display        │  <- Top section showing earned stars
│    ⭐⭐⭐☆☆☆...        │
├─────────────────────────┤
│                         │
│    Progress Bar         │  <- Middle section with progress
│    ████████░░░░         │
│                         │
├─────────────────────────┤
│    [+] Button           │  <- Large plus button
│                         │
│    [-] Button           │  <- Smaller minus button
└─────────────────────────┘
```

## Implementation Details

### HTML Structure
- Semantic HTML5 elements
- Proper accessibility attributes (ARIA labels, roles)
- Meta viewport tag for mobile optimization
- Title and basic meta tags

### CSS Requirements
- Mobile-first responsive design
- Flexbox or CSS Grid for layout
- Smooth transitions for progress bar updates
- Button hover/active states for desktop compatibility
- No external CSS frameworks (pure CSS)

### JavaScript Functionality

#### Variables to Track
```javascript
let currentProgress = 0;        // Current progress (0-10)
let starsEarned = 0;           // Number of stars earned
let clicksPerStar = 10;        // Configurable threshold
const maxStars = 20;           // Maximum stars possible
```

#### Key Functions
- `increaseProgress()` - Handle plus button clicks
- `decreaseProgress()` - Handle minus button clicks
- `updateProgressBar()` - Update visual progress bar
- `updateStarsDisplay()` - Update star visualization
- `awardStar()` - Award star and reset progress
- `validateInput()` - Ensure values stay within bounds

#### Event Handling
- Button click event listeners
- Prevent double-clicking/rapid clicking issues
- Visual feedback during button press

## Configuration Options
- `clicksPerStar`: Number of clicks needed to earn a star (default: 10)
- `maxStars`: Maximum number of stars (default: 20)
- Colors and styling should be easily customizable via CSS variables

## Accessibility Requirements
- Screen reader compatible
- High contrast mode support
- Keyboard navigation support
- Clear focus indicators
- Appropriate ARIA labels and roles

## File Structure
```
star-reward-system/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # Basic usage instructions
```

## Testing Considerations
- Test on various mobile devices and screen sizes
- Verify touch interactions work properly
- Test rapid clicking scenarios
- Verify reset functionality on page reload
- Check accessibility with screen readers

## Performance Requirements
- Fast loading on mobile networks
- Smooth animations and transitions
- Minimal JavaScript execution time
- No external dependencies

## Browser Compatibility
- Modern mobile browsers (iOS Safari, Chrome Mobile, Firefox Mobile)
- Basic desktop browser support for testing
- ES6+ JavaScript features are acceptable

## Success Criteria
1. Progress bar smoothly fills with each click
2. Stars appear after reaching the threshold
3. Minus button properly decreases progress/stars
4. Page is fully responsive on mobile devices
5. All interactions provide clear visual feedback
6. Code is clean, well-commented, and maintainable

## Notes for Implementation
- Focus on simplicity and reliability
- Ensure the interface is intuitive for non-technical users
- Make the system engaging and rewarding for children
- Consider adding sound effects or animations for enhanced engagement (optional)
- Keep the codebase small and self-contained

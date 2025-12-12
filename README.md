# ⚡ 3D Reaction Timer

A visually engaging reaction time game featuring dynamic 3D graphics powered by Three.js. Test your reflexes by responding to visual changes as quickly as possible!

![Game Preview](https://img.shields.io/badge/Three.js-r128-blue) ![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange) ![Status](https://img.shields.io/badge/Status-Complete-green)

## 🎮 Features

- **Immersive 3D Graphics**: Dynamic Three.js scenes with complex geometric shapes
- **Real-time Statistics**: Track attempts, average time, best time, and performance rating
- **Performance Benchmarks**: Get instant feedback on your reaction speed
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Visual State Changes**: Clear visual feedback for each game state
- **False Start Detection**: Prevents cheating by detecting early clicks

## 🚀 How to Play

1. **Start**: Click "Start Game" or click directly on the 3D canvas
2. **Wait**: Watch the 3D scene carefully - it will transform after a random delay (1-5 seconds)
3. **React**: Click anywhere on the canvas as soon as you see the shapes change
4. **Review**: Your reaction time appears instantly with a performance rating
5. **Repeat**: Try to beat your best time across multiple attempts

### Performance Ratings

- 🚀 **Superhuman**: < 150ms
- ⚡ **Excellent**: 150-200ms
- 🎯 **Great**: 200-250ms
- 👍 **Good**: 250-300ms
- ✓ **Average**: 300-350ms
- 🐌 **Slow**: > 350ms

## 🛠️ Technology Stack

- **Three.js** (r128): 3D graphics rendering
- **Vanilla JavaScript**: Game logic and state management
- **HTML5 Canvas**: Rendering surface
- **CSS3**: Modern styling with gradients and animations
- **Google Fonts**: Inter & Poppins typefaces

## 📋 Installation

### Option 1: Direct Use

Simply open the `index.html` file in any modern web browser. No build process required!

## 🎨 Game States

The game cycles through four distinct visual states:

1. **Idle** (Blue): Complex nested geometry with orbiting spheres
2. **Waiting** (Orange/Yellow): Layered wireframe structures
3. **Ready** (Multi-colored): Explosive arrangement of colorful shapes
4. **Complete**: Shows your reaction time and performance rating

## 📊 Statistics Tracking

The game tracks:

- **Attempts**: Total number of completed reactions
- **Average Time**: Mean reaction time across all attempts
- **Best Time**: Your fastest reaction time
- **Performance**: Overall rating based on average time

## 🎯 Features in Detail

### 3D Graphics Engine

- Dynamic shape generation for each game state
- Smooth animations with requestAnimationFrame
- Proper memory management with geometry/material disposal
- Responsive camera and renderer sizing
- Multi-point lighting system

### Game Logic

- State machine architecture (IDLE → WAITING → READY → COMPLETE)
- Random delay system (1-5 seconds)
- False start detection and handling
- Performance-based timing using `performance.now()`
- Comprehensive error handling

### User Interface

- Real-time statistic updates
- Color-coded visual feedback
- Disabled button states during gameplay
- Error message system
- Mobile-responsive grid layout

## 🔧 Browser Compatibility

Tested and working on:

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

Requires:

- WebGL support
- ES6 JavaScript support
- CSS Grid & Flexbox

## 📱 Responsive Design

The layout adapts to different screen sizes:

- **Desktop** (1024px+): Three-column layout with side panels
- **Tablet** (768px-1024px): Single column with reordered panels
- **Mobile** (< 768px): Compact single-column layout with reduced font sizes

## 🎓 Learning Resources

This project demonstrates:

- Three.js scene setup and management
- State machine pattern implementation
- JavaScript class-based architecture
- Responsive CSS Grid layouts
- Performance optimization techniques
- Memory management in WebGL applications

## 📝 Code Structure

```
index.html
├── Styles (embedded)
│   ├── Base styles & reset
│   ├── Layout & grid system
│   ├── Component styles
│   └── Responsive breakpoints
│
└── JavaScript (embedded)
    ├── GameState enum
    ├── ReactionGame class
    │   ├── Three.js initialization
    │   ├── Shape generation methods
    │   ├── Game logic & state management
    │   ├── Animation loop
    │   └── UI update methods
    └── Event listeners & initialization
```

## 🤝 Contributing

This is a portfolio/demonstration project, but suggestions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Improve performance
- Enhance visual effects

## 📄 License

This project is open source and available for educational and personal use.

## 🙏 Acknowledgments

- **Three.js**: Amazing 3D library
- **Google Fonts**: Beautiful typography
- Reaction time research for performance benchmarks

## 📬 Contact

Created as a portfolio project to demonstrate:

- Modern JavaScript development
- 3D graphics programming
- Interactive UI/UX design
- Responsive web design principles

---

**Enjoy testing your reflexes! 🎮⚡**

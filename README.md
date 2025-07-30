# Pegearts Portfolio Website

An interactive portfolio showcasing AI creative design, voice acting, and digital innovation work by Thanatsitt Santisamranwilai.

## 🚀 Features

- Interactive particle system background
- 3D tilt effects and magnetic animations
- Voice demo system with waveform visualization
- Responsive design with mobile optimizations
- Performance-optimized loading and animations
- Multi-language support (English, Thai)
- Dark/Light theme support
- Accessibility compliant

## 🛠️ Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- GSAP for animations
- Canvas API for particle effects
- Web Audio API for sound visualization
- Intersection Observer for lazy loading
- Service Workers for offline support

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/thepegearts.git
```

2. Navigate to the project directory:
```bash
cd thepegearts
```

3. Start a local server:
```bash
# Using Python 3
python -m http.server 8080

# Or using Node.js with live-server
npx live-server
```

4. Open in your browser:
```
http://localhost:8080
```

## 🎯 Project Structure

```
thepegearts/
├── index.html          # Main entry point
├── assets/
│   ├── audio/         # Voice demos and sound files
│   ├── images/        # Image assets
│   └── brand/         # Branding assets
├── scripts/           # JavaScript modules
└── styles/           # CSS stylesheets
```

## 💡 Usage

### Voice Demo System

The voice demo system supports:
- Multiple audio formats with fallbacks
- Waveform visualization
- Volume control
- Download functionality
- Playback progress tracking

### Particle System

Interactive background particles that:
- Respond to mouse movement
- Adjust density based on device performance
- Support reduced motion preferences

## ⚙️ Configuration

Key features can be configured in the JavaScript:

```javascript
// Audio configuration
this.audioConfig = {
    commercial: {
        urls: ['path/to/audio.mp3'],
        title: 'Commercial Demo',
        expectedDuration: 30
    }
    // ... more configurations
};

// Particle system settings
const particleConfig = {
    density: window.innerWidth < 768 ? 30 : 80,
    speed: 0.5,
    responsiveness: 0.8
};
```

## 🎨 Customization

1. Colors and themes can be modified in CSS variables
2. Particle system density and behavior can be adjusted
3. Audio player appearance can be customized
4. Animation timings and effects can be tuned

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers with fallbacks

## 🔒 Security

- Audio files protected against hotlinking
- Form submission with validation
- XSS protection implemented
- CORS policies configured

## 🚧 Development

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Thanatsitt Santisamranwilai**
- Website: [pegearts.com](https://pegearts.com)
- LinkedIn: [@thanatsitt](https://linkedin.com/in/thanatsitt)
- GitHub: [@thanattsitt](https://github.com/thanattsitt)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Check the [issues page](https://github.com/yourusername/thepegearts/issues)
2. Fork the project
3. Create your feature branch
4. Commit your changes
5. Push to the branch
6. Open a Pull Request

## ⭐️ Support

Give a ⭐️ if this project helped you!

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for details.

---
Made with ❤️ by Thanatsitt Santisamranwilai
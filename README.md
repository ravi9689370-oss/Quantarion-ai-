# 🚀 Quantarion AI - Quantum Machine Learning Platform

A production-ready hybrid quantum machine learning platform that combines simulated quantum algorithms with Google Gemini AI. Process natural language queries in Hindi and English, and get results displayed with beautiful quantum visualizations.

## ✨ Features

- **Quantum Simulation**: Amplitude Embedding, Variational Quantum Circuits, and Zero-Noise Extrapolation
- **AI Integration**: Google Gemini AI for natural language understanding and result translation
- **Bilingual Support**: Full Hindi and English interface and processing
- **Beautiful UI**: Glassmorphism design with dark purple/indigo gradient theme
- **Animations**: Rotating atom logo, floating particles, and smooth transitions
- **PWA Ready**: Install as a native app on mobile and desktop
- **Responsive Design**: Optimized for all screen sizes
- **Production Ready**: Error handling, caching, and optimized performance

## 🎯 Quick Start

### Prerequisites

- Python 3.8+
- pip (Python package manager)
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quantarion-ai.git
   cd quantarion-ai
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure API Keys**
   ```bash
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open in browser**
   ```
   http://localhost:5000
   ```

## 🏗️ Project Structure

```
quantarion-ai/
├── app.py                    # Flask backend with quantum simulation
├── requirements.txt          # Python dependencies
├── .env.example             # Environment variables template
├── README.md                # This file
├── templates/
│   └── index.html           # Main frontend HTML
└── static/
    ├── style.css            # Glassmorphism styling
    ├── script.js            # Frontend logic and API calls
    ├── manifest.json        # PWA manifest
    └── sw.js                # Service Worker for offline support
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Required
GEMINI_API_KEY=your_api_key_here

# Optional
IBM_QUANTUM_TOKEN=your_token_here
FLASK_DEBUG=False
PORT=5000
```

### Getting API Keys

1. **Google Gemini API**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy and paste into `.env`

2. **IBM Quantum (Optional)**
   - Visit [IBM Quantum](https://quantum-computing.ibm.com/)
   - Create an account and generate a token

## 🎨 Customization

### Theme Colors

Edit `static/style.css` CSS variables section:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #6366f1 100%);
    --accent-color: #6366f1;
    --bg-primary: #0f172a;
    /* ... other variables */
}
```

### Example Questions

Edit example buttons in `templates/index.html`:

```html
<button class="example-btn" data-question="Your custom question">
    <span class="example-icon">🎯</span>
    <span class="example-text">Custom Label</span>
</button>
```

## 🚀 Deployment

### Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create quantarion-ai

# Set environment variable
heroku config:set GEMINI_API_KEY=your_key_here

# Deploy
git push heroku main
```

### Railway

```bash
# Login to Railway
railway login

# Link project
railway link

# Set secrets
railway variables
# Add GEMINI_API_KEY

# Deploy
railway up
```

### Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000
CMD ["python", "app.py"]
```

```bash
docker build -t quantarion-ai .
docker run -e GEMINI_API_KEY=your_key -p 5000:5000 quantarion-ai
```

### Self-Hosted (Production)

```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 📱 PWA Installation

### Mobile (iOS)
1. Open the app in Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. Name and add

### Mobile (Android)
1. Open the app in Chrome
2. Tap menu (three dots)
3. Tap "Install app"
4. Confirm

### Desktop
1. Open the app in your browser
2. Click install icon (usually in address bar)
3. Confirm

## 🧮 API Endpoints

### GET `/`
Serves the frontend HTML.

**Response**: HTML page

### GET `/health`
System health check endpoint.

**Response**:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-01-01T12:00:00",
  "gemini_configured": true
}
```

### POST `/solve`
Main endpoint for quantum computation.

**Request**:
```json
{
  "question": "Optimize values 2, 5, 8 for maximum efficiency",
  "language": "en"
}
```

**Response**:
```json
{
  "success": true,
  "quantum_state": "|0011⟩",
  "probability": "78.5%",
  "numbers_used": [2, 5, 8],
  "explanation": "The quantum algorithm found...",
  "accuracy": "96%",
  "timestamp": "2024-01-01T12:00:00"
}
```

## 🔬 Technical Details

### Quantum Algorithms

1. **Amplitude Embedding**
   - Normalizes classical data into quantum state amplitudes
   - Maps feature vectors to quantum superposition

2. **Variational Quantum Circuit (VQC)**
   - Parameterized quantum circuit with rotation gates
   - Simulated using NumPy matrix operations
   - Adjustable parameters for optimization

3. **Zero-Noise Extrapolation (ZNE)**
   - Mitigates quantum errors through noise scaling
   - Extrapolates to zero-noise limit
   - Improves result accuracy

### AI Integration

- **Google Gemini 1.5 Flash** for fast inference
- Two-stage AI processing:
  1. Parse question to extract numerical data
  2. Translate quantum results to natural language

## 🌍 Language Support

- **English**: Full UI and processing support
- **Hindi**: Complete translation and RTL-compatible UI
- Easy to extend with more languages

## 📊 Performance

- Frontend: ~150KB total size (uncompressed)
- Backend: Processes queries in <2 seconds average
- API calls: Cached where possible
- Service Worker: Enables offline functionality

## 🐛 Troubleshooting

### Issue: "GEMINI_API_KEY not set"
**Solution**: 
1. Create `.env` file
2. Add your API key
3. Restart the application

### Issue: CORS errors
**Solution**: CORS is already enabled in Flask. If issues persist:
```python
from flask_cors import CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})
```

### Issue: Service Worker not loading
**Solution**: 
1. Check browser console for errors
2. Ensure HTTPS in production
3. Clear browser cache: DevTools → Application → Clear storage

### Issue: Slow quantum computation
**Solution**: 
- Reduce number of qubits in `app.py`
- Optimize NumPy operations
- Use GPU acceleration (requires CUDA)

## 📈 Future Enhancements

- [ ] Real IBM Quantum integration
- [ ] More quantum algorithms (QAOA, VQE, Grover)
- [ ] Advanced data visualization
- [ ] User authentication and history
- [ ] Real-time collaboration
- [ ] More language support
- [ ] GraphQL API

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: support@example.com
- Join our Discord community

## 🎓 Educational Resources

- [Quantum Computing Basics](https://quantum.ibm.com/)
- [Google Gemini API Docs](https://makersuite.google.com/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [NumPy Guide](https://numpy.org/)

## ⭐ Acknowledgments

- Google for Gemini AI API
- IBM for Quantum Framework
- Flask community
- All contributors and users

---

**Made with ❤️ by the Quantarion AI Team**

*Quantum Computing Made Accessible*

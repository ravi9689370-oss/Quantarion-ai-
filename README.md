# Quantarion AI - Quantum Machine Learning Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/flask-3.0.0-green.svg)

## Overview

**Quantarion AI** is a production-ready hybrid quantum machine learning platform that combines simulated quantum algorithms with Google Gemini AI. It processes natural language questions in Hindi and English using advanced quantum techniques and generates intelligent responses.

### Key Features

- 🚀 **Quantum Algorithms**: Amplitude Embedding, Variational Quantum Circuits (VQC), and Zero-Noise Extrapolation (ZNE)
- 🤖 **AI Integration**: Google Gemini 1.5 Flash for natural language processing
- 🌍 **Multilingual**: Full support for Hindi and English
- 🎨 **Beautiful UI**: Glassmorphism design with smooth animations
- 📱 **Fully Responsive**: Mobile-optimized and PWA-ready
- 🔧 **Production Ready**: Error handling, CORS support, and comprehensive logging
- ⚡ **Real-time Processing**: Fast quantum simulations using NumPy

## Tech Stack

### Backend
- **Framework**: Flask 3.0.0
- **AI/ML**: Google Generative AI (Gemini 1.5 Flash)
- **Quantum Simulation**: NumPy 1.26.0
- **CORS**: Flask-CORS 4.0.0
- **Environment**: Python-dotenv 1.0.0

### Frontend
- **Markup**: HTML5
- **Styling**: CSS3 (Glassmorphism, Gradients, Animations)
- **Scripting**: Vanilla JavaScript (ES6+)
- **PWA**: Service Worker + Web App Manifest

## Project Structure

```
Quantarion-ai/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── README.md             # This file
├── templates/
│   └── index.html        # Frontend HTML
└── static/
    ├── style.css         # Frontend styles
    ├── script.js         # Frontend JavaScript
    ├── manifest.json     # PWA manifest
    └── sw.js            # Service Worker
```

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Modern web browser with JavaScript enabled
- Google Gemini API key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Step 1: Clone the Repository

```bash
git clone https://github.com/ravi9689370-oss/Quantarion-ai-.git
cd Quantarion-ai-
```

### Step 2: Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your API keys
# For Windows: Use Notepad or any text editor
# For macOS/Linux: nano .env
```

Add your keys to `.env`:

```
GEMINI_API_KEY=your_api_key_here
IBM_QUANTUM_TOKEN=optional_ibm_token
FLASK_ENV=production
FLASK_DEBUG=False
```

### Step 5: Run the Application

```bash
python app.py
```

The application will start at `http://localhost:5000`

## Getting API Keys

### Google Gemini API

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key
4. Paste it in your `.env` file as `GEMINI_API_KEY`

### IBM Quantum (Optional)

1. Visit [IBM Quantum](https://quantum-computing.ibm.com/)
2. Create an account and log in
3. Navigate to your account settings
4. Copy your API token
5. Paste it in your `.env` file as `IBM_QUANTUM_TOKEN`

## Usage

### Web Interface

1. Open `http://localhost:5000` in your browser
2. Select language (English/Hindi) using the toggle
3. Enter your quantum question or choose an example
4. Click "Process" to run the quantum algorithm
5. View results including quantum state, probability, and AI-generated answer
6. Copy results to clipboard using the copy button

### API Endpoints

#### GET /
Serves the frontend application.

```bash
curl http://localhost:5000/
```

#### POST /solve
Processes a quantum question and returns results.

**Request:**
```json
{
    "question": "What is 42 + 8?",
    "language": "en"
}
```

**Response:**
```json
{
    "success": true,
    "question": "What is 42 + 8?",
    "language": "en",
    "numbers_extracted": [42, 8],
    "quantum_state": "|10⟩",
    "probability": 0.85,
    "answer": "The quantum computation suggests the result is 50 with high probability.",
    "accuracy": 85
}
```

#### GET /health
Checks system health status.

```bash
curl http://localhost:5000/health
```

**Response:**
```json
{
    "status": "healthy",
    "service": "Quantarion AI",
    "version": "1.0.0",
    "gemini_configured": true
}
```

## Quantum Algorithms

### 1. Amplitude Embedding
Normalizes input data into quantum state representation by converting classical numbers into normalized amplitudes of quantum states.

### 2. Variational Quantum Circuit (VQC)
Simulates a parameterized quantum circuit using NumPy that applies:
- Rotation gates (RY gates) to create superposition
- Entanglement operations to correlate qubits
- Iterative optimization over multiple cycles

### 3. Zero-Noise Extrapolation (ZNE)
Error mitigation technique that:
- Simulates circuits at different noise levels
- Extrapolates results to zero noise condition
- Improves accuracy of quantum computations

## Frontend Features

### Design
- **Glassmorphism**: Modern frosted glass effect cards
- **Dark Mode**: Easy on the eyes, default dark purple theme
- **Animations**: Smooth transitions and rotating atom logo
- **Particles**: Floating background particles for visual appeal

### Responsive Design
- **Desktop**: Full featured layout
- **Tablet**: Optimized grid layouts
- **Mobile**: Single column, touch-friendly buttons

### PWA Support
- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Service worker caches static assets
- **Fast Loading**: Optimized asset delivery

## Deployment

### Local Development

```bash
python app.py
```

### Production Deployment

#### Using Gunicorn

```bash
pip install gunicorn
gunicorn app:app --workers 4 --bind 0.0.0.0:5000
```

#### Using Docker

Create `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]
```

Build and run:

```bash
docker build -t quantarion-ai .
docker run -p 5000:5000 -e GEMINI_API_KEY=your_key quantarion-ai
```

#### Heroku Deployment

1. Create `Procfile`:
```
web: gunicorn app:app
```

2. Deploy:
```bash
heroku login
heroku create quantarion-ai
git push heroku main
heroku config:set GEMINI_API_KEY=your_key
```

#### Railway/Render Deployment

1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Deploy automatically on each push

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | ✓ Yes |
| `IBM_QUANTUM_TOKEN` | IBM Quantum API token | ✗ Optional |
| `FLASK_ENV` | Flask environment (development/production) | ✗ Optional |
| `FLASK_DEBUG` | Enable Flask debug mode | ✗ Optional |

### Flask Configuration

Edit `app.py` to modify:
- Port and host
- CORS allowed origins
- Quantum simulation parameters
- Gemini model selection

## Troubleshooting

### Issue: "No module named 'flask'"

**Solution**: Install dependencies
```bash
pip install -r requirements.txt
```

### Issue: "GEMINI_API_KEY not found"

**Solution**: Ensure `.env` file is created and populated
```bash
cp .env.example .env
# Edit .env with your API key
```

### Issue: "Connection refused at localhost:5000"

**Solution**: Verify Flask is running
```bash
python app.py
# Should show: Running on http://127.0.0.1:5000
```

### Issue: API returns 500 error

**Solution**: Check Flask logs for detailed error messages. Ensure:
- API key is valid
- Internet connection is available
- Request format matches the specification

## Performance Optimization

### Frontend
- **CSS**: Minified in production
- **JavaScript**: Vanilla JS (no dependencies)
- **Images**: SVG icons for scalability
- **Caching**: Service worker caches static assets

### Backend
- **NumPy**: Vectorized operations for speed
- **Quantum Simulation**: O(n²) complexity, highly optimized
- **Gemini API**: Efficient token usage
- **Connection Pooling**: Reused HTTP connections

## Security

- **CORS**: Configured for safe cross-origin requests
- **Environment Variables**: Secrets never committed to git
- **Input Validation**: All user inputs sanitized
- **Error Handling**: Detailed errors in development, generic in production
- **HTTPS**: Use in production deployment

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Google Generative AI (Gemini) for NLP capabilities
- NumPy for quantum simulation framework
- Flask for backend framework
- IBM Quantum for inspiration on quantum algorithms

## Support

For issues and questions:
- GitHub Issues: [Report a bug](https://github.com/ravi9689370-oss/Quantarion-ai-/issues)
- Discussions: [Ask a question](https://github.com/ravi9689370-oss/Quantarion-ai-/discussions)

## Roadmap

- [ ] Real IBM Quantum hardware integration
- [ ] Advanced quantum algorithms (Shor's, Grover's)
- [ ] Multi-language support (Spanish, French, Chinese)
- [ ] User authentication and history
- [ ] Advanced visualization of quantum states
- [ ] API rate limiting and analytics
- [ ] Mobile app (React Native)

## Version History

### v1.0.0 (Current)
- Initial release
- Quantum simulation with VQC and ZNE
- Gemini AI integration
- Hindi and English support
- PWA support
- Beautiful glassmorphism UI

---

**Made with ❤️ by [Ravi](https://github.com/ravi9689370-oss)**

**Last Updated**: May 2026
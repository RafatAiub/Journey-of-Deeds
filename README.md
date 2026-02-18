# 🌙 Ramadan Planner

A beautiful, privacy-first web application to track your Ramadan journey with multi-language support (Bengali & English).

## ✨ Features

- **🌍 Multi-Language Support**: Automatically detects browser language (Bengali/English)
- **🕌 Prayer Tracking**: Track 5 daily prayers + Tarawih + Tahajjud + Fasting
- **📖 Smart Quran Planner**: Auto-adjusts daily target when you miss days
- **📿 Dhikr Counters**: 4 customizable counters with beautiful UI
- **📝 Daily Reflection**: Journal your thoughts and gratitude
- **✨ Deed of the Day**: 30 unique daily Islamic deeds
- **📅 Calendar View**: Review your entire Ramadan journey
- **💾 Export/Import**: Full data backup and restore
- **🔒 Privacy-First**: All data stored locally in your browser

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## 🎨 Design

- **Modern Islamic Aesthetic**: Emerald/teal gradient theme
- **Smooth Animations**: Fade-in, slide-up, scale effects
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Glass-morphism**: Beautiful card designs with backdrop blur
- **Bengali Font Support**: Noto Sans Bengali for perfect rendering

## 📱 How to Use

1. **First Time**: Complete onboarding (select Ramadan start date and Quran goal)
2. **Daily**: Track prayers, log Quran pages, count dhikr, write reflections
3. **Review**: Check calendar to see your progress
4. **Backup**: Export your data regularly from Settings

## 🔒 Privacy

- ✅ All data stored in browser localStorage
- ✅ No backend server
- ✅ No tracking or analytics
- ✅ No ads
- ✅ Completely offline-capable

## 🛠️ Tech Stack

- **React 18**: UI framework
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **React Router**: Navigation
- **date-fns**: Date utilities
- **Lucide React**: Icons

## 📦 Project Structure

```
src/
├── components/        # React components
├── utils/            # Utility functions
│   ├── language.js   # Multi-language support
│   ├── storage.js    # localStorage utilities
│   └── quranCalculator.js  # Quran tracking logic
├── App.jsx           # Main app
├── main.jsx          # Entry point
└── index.css         # Styles
```

## 🌟 Key Features Explained

### Smart Quran Planner
Automatically calculates daily reading target based on:
- Total pages: 604 (standard Madina Mushaf)
- Remaining days
- Pages already read
- Formula: `todayTarget = ceil(remainingPages / remainingDays)`

### Multi-Language Auto-Detection
```javascript
const browserLang = navigator.language || navigator.userLanguage;
if (browserLang.startsWith('bn')) {
  return 'bn'; // Bengali
}
return 'en'; // English
```

### Progress Calculation
Daily progress based on:
- 5 Salah prayers (5 points)
- Fasting (1 point)
- Tarawih (1 point)
- Quran reading (1 point)
- Dhikr (1 point)
- Reflection (1 point)
Total: 10 points = 100%

## 🤝 Contributing

This is a personal Ramadan tracker. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use and modify

## 🤲 May Allah Accept

May Allah accept all our deeds and make this Ramadan the best one yet. Ameen.

---

**Built with ❤️ for the Muslim community**

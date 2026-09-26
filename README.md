# UNWRITTEN ✦

> *Some stories are planned. Some stories just happen. Maybe this one... is still being written.*

**UNWRITTEN** is an elegant, cinematic, intimate, and interactive website designed to capture memories, unspoken thoughts, and chapters of an unfolding story.

---

## 🌟 Features

- **Cinematic Experience**: Dark void aesthetic with ambient canvas starfield and smooth glassmorphism effects.
- **Dynamic Content Engine**: Separates data (`js/data.js`) from visual presentation (`js/app.js`), allowing instant updates without modifying HTML.
- **Interactive Memory Cards**: Grid of moments with modal lightbox viewer for expanded photos and details.
- **Unspoken Thoughts Reveal**: Elegant interactive blur-to-clear cards revealing hidden thoughts on tap/hover.
- **Ambient Soundtrack Player**: Built-in Web Audio synthesizer generating gentle soothing tone harmonies (no external copyrighted audio files required).
- **Responsive & Mobile-First**: Seamless experience across smartphones, tablets, and wide desktop displays.
- **Accessible & Performance-Minded**: Supports `prefers-reduced-motion`, keyboard navigation (`TAB` / `ENTER` / `ESC`), and zero dependencies.

---

## 🚀 How to Run Locally

Because UNWRITTEN is built using standard HTML5, CSS3, and JavaScript, no build tools or package managers are required.

### Option 1: Direct File Opening
Simply double-click `index.html` or open it directly in any modern browser (Chrome, Safari, Firefox, Edge).

### Option 2: Local Web Server (Recommended)

Using **Python** (built into macOS / Linux / Windows with Python installed):
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

Using **Node.js / npx**:
```bash
npx serve .
```

---

## 📝 How to Add a New Moment

All website content is stored in [`js/data.js`](file:///c:/Users/this/OneDrive/Desktop/Unwritten/js/data.js).

To add a new memory to **Section 4 (Moments Worth Remembering)**:

1. Open [`js/data.js`](file:///c:/Users/this/OneDrive/Desktop/Unwritten/js/data.js) in any code or text editor.
2. Locate the `moments: [...]` array.
3. Add a new object entry:

```javascript
{
  id: "moment-4",
  date: "February 14, 2025",
  title: "A Night Under Starlight",
  description: "Your full description of what happened during this special memory...",
  location: "Our Favorite Viewpoint",
  image: "assets/images/your-photo.jpg" // Or an SVG/URL
}
```

4. Save the file and refresh your browser! The website will automatically render the new card with full interactive modal viewer capabilities.

---

## 🎵 How to Edit the Soundtrack

To add or change songs in **Section 6 (Our Little Soundtrack)**:

Edit the `soundtrack: [...]` array in [`js/data.js`](file:///c:/Users/this/OneDrive/Desktop/Unwritten/js/data.js):

```javascript
{
  id: "track-4",
  title: "New Song Title",
  artist: "Artist Name",
  duration: "3:30",
  cover: "assets/images/album-cover.jpg",
  notes: [261.63, 329.63, 392.00, 523.25] // Synthesizer note frequencies in Hz
}
```

---

## 📁 Project Structure

```
Unwritten/
├── index.html              # Main HTML markup with all 8 cinematic sections
├── README.md               # Documentation & editing guide
├── css/
│   └── style.css           # Complete CSS design system, dark palette, & animations
├── js/
│   ├── data.js             # Separated JSON-like data store for easy content editing
│   └── app.js              # Canvas particle system, audio synth engine, & UI controllers
└── assets/
    └── images/             # Vector SVG illustrations & album covers
        ├── chapter1.svg
        ├── moment1.svg
        ├── moment2.svg
        ├── moment3.svg
        ├── album1.svg
        ├── album2.svg
        └── album3.svg
```

---

## 🔮 Future Architecture (V2 Upgrade Path)

The project is structured modularly so future features can be integrated seamlessly:
- **Authentication & Private Vault**: Wrap `js/data.js` fetches in API calls with auth tokens.
- **Admin Dashboard**: Build a simple editor form that saves updates directly to a database.
- **Dynamic Image Uploads**: Replace static SVG/asset paths with cloud storage URLs.

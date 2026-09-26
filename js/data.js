/**
 * UNWRITTEN — Content Data Store
 * ------------------------------------------------------------------
 * Easily add, edit, or remove chapters, moments, unsaid thoughts,
 * and soundtrack items here. Rendering logic in app.js will
 * dynamically update the UI without needing HTML changes.
 */

window.UNWRITTEN_DATA = {
  // Section 3: Chapter One
  chapterOne: {
    chapterNumber: "Chapter 01",
    subheading: "The Beginning",
    date: "A quiet night, 2026",
    title: "Where the path crossed",
    quote: "Somewhere along the way, you became someone I wanted to know a little better.",
    description: "It started quietly — no fireworks, no dramatic signals. Just a subtle feeling that conversations with you had a different kind of warmth. A realization that among all the noise, your voice stood out.",
    image: "assets/images/her1.jpg"
  },

  // Section 4: Moments Worth Remembering
  moments: [
    {
      id: "moment-1",
      date: "Sept 22, 2026 • 10:40 PM",
      title: "Our First Chat",
      description: "It started with some formal ways of getting to know each other, completely unaware of how deeply special this connection would soon become.",
      location: "Late Night Messages",
      image: "assets/images/her2.jpg"
    },
    {
      id: "moment-2",
      date: "Sept 25, 2026 • 10:33 AM",
      title: "The First Call",
      description: "She was bored of typing and decided to call. Hearing her voice for the very first time was a feeling that words simply cannot capture.",
      location: "First Phone Call",
      image: "assets/images/her3.jpg"
    },
    {
      id: "moment-3",
      date: "Sept 2026 • The Open Road",
      title: "The Unplanned Planned Trip",
      description: "We met for a bike ride, fulfilling her romantic dream of long drives, dancing together under the open sky, and creating moments worth keeping forever.",
      location: "Bike Ride & Long Drive",
      image: "assets/images/her4.jpg"
    }
  ],

  // Section 5: Things I Never Said Out Loud
  unsaidThoughts: [
    {
      id: "thought-1",
      teaser: "A subtle truth about seeing you...",
      fullText: "I actually look forward to seeing you more than I probably should."
    },
    {
      id: "thought-2",
      teaser: "About our conversations...",
      fullText: "Sometimes a random conversation with you stays in my head longer than expected."
    },
    {
      id: "thought-3",
      teaser: "Something you might not realize...",
      fullText: "You probably don't realize how easily you can make an ordinary day better."
    },
    {
      id: "thought-4",
      teaser: "A quiet observation...",
      fullText: "There is a gentle stillness whenever you are around — a feeling that everything is right where it should be."
    }
  ],

  // Section 6: Our Little Soundtrack
  soundtrack: [
    {
      id: "track-1",
      title: "Tum Hi Ho",
      artist: "Arijit Singh & Mithoon",
      duration: "4:22",
      cover: "assets/images/album1.svg",
      // Local audio track path or online audio source
      audioSrc: "assets/music/tum_hi_ho.mp3",
      notes: [415.30, 369.99, 329.63, 311.13, 277.18, 329.63, 369.99, 415.30]
    }
  ]
};

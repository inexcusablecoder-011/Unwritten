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
    date: "A quiet evening, 2024",
    title: "Where the path crossed",
    quote: "Somewhere along the way, you became someone I wanted to know a little better.",
    description: "It started quietly — no fireworks, no dramatic signals. Just a subtle feeling that conversations with you had a different kind of warmth. A realization that among all the noise, your voice stood out.",
    image: "assets/images/chapter1.svg"
  },

  // Section 4: Moments Worth Remembering
  moments: [
    {
      id: "moment-1",
      date: "October 14, 2024",
      title: "Late Night Coffee & Unplanned Laughter",
      description: "We intended to talk for fifteen minutes. Three hours later, the coffee was long cold, the street was quiet, and neither of us wanted to leave.",
      location: "The Corner Café",
      image: "assets/images/moment1.svg"
    },
    {
      id: "moment-2",
      date: "December 02, 2024",
      title: "Under the Rooftop Stars",
      description: "Freezing air, warm jackets, and a view of the city glowing beneath us. We talked about everything and nothing at all, wrapped in quiet comfort.",
      location: "Skyline Overlook",
      image: "assets/images/moment2.svg"
    },
    {
      id: "moment-3",
      date: "January 19, 2025",
      title: "The Spontaneous Road Trip",
      description: "No map, no strict destination — just good music playing through speakers and endless conversation as lights passed by in the twilight.",
      location: "Coast Highway",
      image: "assets/images/moment3.svg"
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
      title: "First Echoes",
      artist: "Ambient Dusk",
      duration: "3:42",
      cover: "assets/images/album1.svg",
      // Synthesizer notes (MIDI pitches/frequencies) for Web Audio playback
      notes: [261.63, 329.63, 392.00, 493.88, 392.00, 329.63]
    },
    {
      id: "track-2",
      title: "Midnight Conversations",
      artist: "Unwritten Echoes",
      duration: "4:15",
      cover: "assets/images/album2.svg",
      notes: [220.00, 261.63, 329.63, 440.00, 329.63, 261.63]
    },
    {
      id: "track-3",
      title: "Unwritten Horizon",
      artist: "Starlight Reverie",
      duration: "3:58",
      cover: "assets/images/album3.svg",
      notes: [196.00, 246.94, 293.66, 392.00, 293.66, 246.94]
    }
  ]
};

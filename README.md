# A Birthday Website for Mahek

## What's in here
- `index.html` — the page structure
- `style.css` — all the visual design (cinematic dark theme, gold/rose/burgundy)
- `script.js` — all the behavior (countdown, animations, gallery, letter typing, etc.)
- `data.js` — **the only file you need to edit for content**
- `images/` — your 15 photos, already placed into the right sections

## How the site is gated
The site opens straight to a **live countdown to September 13, 12:00 AM**. Everything
else — the gallery, letter, reasons, secret message, wishes, finale — is hidden until
that moment, either because the countdown hits zero while she has the page open (it
unlocks live with fireworks), or because she opens the link after her birthday has
already started (it unlocks immediately on load).

## Edit the content
Open `data.js` in any text editor (Notepad, VS Code, even a phone code editor app).
Everything visible on the site — her name, the countdown date, the letter, the
reasons, the secret password, the birthday wishes — lives in that one file as plain
readable text. Change the text between the quotes, save, refresh the page.

A few things worth doing before you send it:
- **Sign the letter** — replace `[Your name]` at the bottom of `loveLetter`.
- **Add more reasons** — there are 10 placeholders, add as many as you want.
- **Set the secret password** — currently a placeholder (`"REPLACE_WITH_HER_AGE"`).
  Set it to whatever you want her to type in (her age, a word, anything).
- **Confirm the birthday date** — currently set to `2026-09-13`.

## Where each photo landed
Ask Claude to update these once you've confirmed placement — for now:
- Hero photo (shown big right after unlock): `img01`
- Gallery: `img02, img06, img08, img12, img14, img15`
- Bonus "keepsakes" strip: `img09, img10, img11` (the illustrated/edited ones)

You can swap any image by replacing the file in `/images` (keep the same filename)
or by changing the path in `data.js`.

## Adding music (optional)
The music player is off by default because no audio files were provided, and
using music you don't own or haven't licensed isn't something I can help source.
If you have a song you own or have the rights to use:
1. Create a `/music` folder next to `index.html`.
2. Drop your `.mp3` file in there.
3. In `data.js`, set `musicEnabled: true` and add the track to `playlist`.
(This starter doesn't wire up a player UI yet — say the word and I'll build one
once you've got a track ready.)

## How to view it right now
Just double-click `index.html` — it opens in your browser and works fully offline
(everything except the two font/animation libraries loaded from a CDN, which need
an internet connection once).

## How to host it so she can open it from a link
Easiest free options:
- **Netlify Drop**: go to app.netlify.com/drop, drag this whole folder in, get a link instantly.
- **GitHub Pages**: push this folder to a GitHub repo, enable Pages in settings.
- **Vercel**: `vercel` CLI, or drag-and-drop via their dashboard.

Any of these give you a link you can send her — no coding required beyond what's already here.

## What's next
This is the core experience: intro → countdown → timeline → memories → letter →
reasons → secret message → future list → birthday finale. If you want to add more
from the original 35-feature list (interactive star map, memory quiz, guestbook,
music player, etc.), just tell me which ones and I'll build them into this same file structure.

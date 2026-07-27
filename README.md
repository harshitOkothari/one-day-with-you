# One Day With You 🧁🌙

A cozy, interactive storybook website — spend one peaceful day with Cupcake and Kido.
Built with plain HTML, CSS, and JavaScript (no build tools required).

## Play it locally

Just open `index.html` in a browser — or, better, run a tiny local server so the images load correctly:

```bash
cd one-day-with-you
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Project structure

```
one-day-with-you/
├── index.html      # page shell / UI elements
├── style.css        # cozy pixel-storybook styling
├── data.js           # the entire script: scenes, dialogue, choices, memories
├── script.js         # the game engine (dialogue, choices, clock, scrapbook)
└── assets/
    └── backgrounds/  # pixel-art scene backgrounds
```

To edit the story, you only need to touch `data.js` — every scene is a plain
JavaScript object with a background, a list of dialogue lines, and optional
choices/memories.

---

## Push it to GitHub so anyone can see it

### 1. Create a GitHub account & repository
- Go to [github.com](https://github.com) and sign in (or sign up).
- Click the **+** in the top right → **New repository**.
- Name it something like `one-day-with-you`.
- Keep it **Public** (so anyone can view the live site).
- Don't add a README/gitignore here — you already have files locally.
- Click **Create repository**.

### 2. Push your local project
Open a terminal in the `one-day-with-you` folder and run:

```bash
git init
git add .
git commit -m "Initial commit: One Day With You"
git branch -M main
git remote add origin https://github.com/<your-username>/one-day-with-you.git
git push -u origin main
```

(Replace `<your-username>` with your actual GitHub username. The first push
may ask you to sign in — GitHub now requires a Personal Access Token instead
of a password; you can create one under **Settings → Developer settings →
Personal access tokens**, or just use the GitHub Desktop app instead of the
command line if you prefer a GUI.)

### 3. Turn on GitHub Pages (free hosting)
- On your repository page, go to **Settings** → **Pages** (left sidebar).
- Under **Build and deployment → Source**, choose **Deploy from a branch**.
- Under **Branch**, choose **main** and folder **/ (root)** → **Save**.
- Wait about 1 minute, then refresh the page — GitHub will show a link like:

```
https://<your-username>.github.io/one-day-with-you/
```

That link is public — share it with anyone and they can play the story
straight from their browser, no installation needed.

### 4. Making future updates
Whenever you change the story or styling:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

GitHub Pages automatically redeploys within a minute or two of every push.

---

## Notes
- Character sprites now use your uploaded artwork (`assets/characters/boy_full.png`
  and `girl_full.png`), cropped and made transparent so they sit naturally over
  every background.
- Backgrounds are compressed JPGs to keep the repo small and pages fast to load.

## How the music works

Four tracks are already wired up in `assets/music/`, mapped to four "phases"
of the day in `data.js`:

```js
const MUSIC = {
  dawn:     MUSIC_DIR + "Before_The_Dew_Dries.mp3",    // intro + waking up
  planning: MUSIC_DIR + "Tea_In_The_Sunroom.mp3",       // indoor morning activities
  daytime:  MUSIC_DIR + "The_Window_by_the_Garden.mp3", // town, lunch, afternoon
  evening:  MUSIC_DIR + "Tea_and_Sunlight.mp3"           // movie, dinner, night, scrapbook
};
```

Every scene in `data.js` has a `music: "dawn" | "planning" | "daytime" | "evening"`
field. When the player moves into a scene whose phase differs from the one
currently playing, the engine crossfades smoothly into the new track
(`script.js` → `playMusicForScene`). Moving between scenes in the *same*
phase doesn't restart the music — it just keeps playing, so it won't feel
choppy.

**To use the same music everywhere:** point all four keys in `MUSIC` at the
same file.

**To use a different track per scene instead of per phase:** give each scene
its own unique `music` key (e.g. `"kitchen"`, `"bookstore"`) and add a
matching entry to the `MUSIC` object with that file's path — the engine
doesn't care how many distinct keys exist, it just crossfades whenever the
key changes.

**To add your own tracks:** drop the `.mp3` file into `assets/music/` and
reference it in `MUSIC` the same way.

Players can mute music or adjust the volume from the ⚙️ menu in the top-right
corner — their choice is remembered (via `localStorage`) the next time they visit.

Browsers block audio from autoplaying before a person has clicked anything
on the page — that's normal, not a bug. The very first tap ("I'm Ready" /
"Give Me One More Minute") unlocks audio, after which every future scene's
music plays automatically.

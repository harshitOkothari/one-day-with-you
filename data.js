/* ==========================================================
   ONE DAY WITH YOU — STORY DATA
   Every scene: background, music mood, time, dialogue lines,
   choices, and memory unlocks.
   ========================================================== */

const BG = "assets/backgrounds/";
const MUSIC_DIR = "assets/music/";

/* Music phases — reassign any of these to different files any time. */
const MUSIC = {
  dawn:     MUSIC_DIR + "Before_The_Dew_Dries.mp3",   // intro + waking up
  planning: MUSIC_DIR + "Tea_In_The_Sunroom.mp3",      // indoor morning activities
  daytime:  MUSIC_DIR + "The_Window_by_the_Garden.mp3", // town, lunch, afternoon
  evening:  MUSIC_DIR + "Tea_and_Sunlight.mp3"          // movie, dinner, night, scrapbook
};

// Each dialogue line: { speaker, emoji, text, narrator (bool) }
function line(speaker, emoji, text) {
  return { speaker, emoji, text, narrator: false };
}
function narr(text) {
  return { speaker: "Narrator", emoji: "🤖", text, narrator: true };
}

const SCENES = {

  // ---------------------------------------------------------
  SCENE_00: {
    id: "SCENE_00",
    music: "dawn",
    background: null,
    bgClass: "bg-intro",
    time: null,
    progressLabel: "",
    progressPct: 0,
    hideTopBar: true,
    lines: [
      narr("Hello."),
      narr("Welcome."),
      narr("Before we begin... I'd like to tell you something."),
      narr("This isn't a game you have to win. There are no perfect choices. And there are no wrong choices."),
      narr("Every decision you make... will simply become another memory."),
      narr("Some moments might make you smile. Some might make you laugh. Some... may stay with you for a very long time."),
      narr("So don't search for the \"best\" option. Choose what feels right. That's enough."),
      narr("Because... the smallest moments... usually become the biggest memories."),
      narr("Whenever you're ready... today's story can begin.")
    ],
    choices: [
      { label: "❤️ I'm Ready", next: "SCENE_01", time: "09:00 AM", progressLabel: "Morning", progressPct: 20 },
      { label: "🌙 Give Me One More Minute", next: "SCENE_00B" }
    ]
  },

  SCENE_00B: {
    id: "SCENE_00B",
    music: "dawn",
    background: null,
    bgClass: "bg-intro",
    hideTopBar: true,
    lines: [
      narr("Of course."),
      narr("Take your time."),
      narr("Good things... were never meant to be rushed."),
      narr("I'll wait.")
    ],
    choices: [
      { label: "❤️ Okay... I'm Ready.", next: "SCENE_01", time: "09:00 AM", progressLabel: "Morning", progressPct: 20 }
    ]
  },

  // ---------------------------------------------------------
  SCENE_01: {
    id: "SCENE_01",
    music: "dawn",
    background: BG + "bedroom-morning.jpg",
    time: "09:00 AM", progressLabel: "Morning", progressPct: 20,
    lines: [
      line("Cupcake","🧁","Good morning, Baby."),
      line("Cupcake","🧁","...I know you're awake."),
      line("Kido","🌙","I'm not. Mhm. I'm still sleeping."),
      line("Cupcake","🧁","Really? Because sleeping people don't usually smile."),
      line("Kido","🌙","Maybe I'm dreaming."),
      line("Cupcake","🧁","Am I in the dream?"),
      line("Kido","🌙","...Maybe."),
      line("Cupcake","🧁","Looks like today's going to be beautiful."),
      line("Kido","🌙","Mhm... it already feels nice."),
      line("Cupcake","🧁","I made coffee. Before it gets cold."),
      line("Kido","🌙","You made it... or you watched it while it was being made?"),
      line("Cupcake","🧁","I'd say... about sixty percent effort."),
      line("Kido","🌙","That's surprisingly honest."),
      line("Cupcake","🧁","You know... we don't really have any plans today. And I kind of like that."),
      line("Kido","🌙","Me too. Just... one peaceful day together."),
      narr("Morning sunlight quietly fills the room. Outside, the world is just beginning to wake up. But inside, time feels slower — as if today is waiting for them."),
      line("Cupcake","🧁","So... what should we do first?")
    ],
    choices: [
      { label: "☕ Have Coffee Together", next: "SCENE_01A" },
      { label: "🌸 Go Outside", next: "SCENE_01B" },
      { label: "😴 Five More Minutes", next: "SCENE_01C" }
    ]
  },

  SCENE_01A: {
    id: "SCENE_01A",
    music: "dawn",
    background: BG + "bedroom-morning.jpg",
    time: "09:30 AM", progressLabel: "Morning", progressPct: 30,
    lines: [
      line("Kido","🌙","Thank you. It's warm... just what I needed."),
      line("Cupcake","🧁","Coffee always tastes better when you're not drinking it alone."),
      line("Kido","🌙","Hot... too hot."),
      line("Cupcake","🧁","I literally watched you blow on it once. You really thought that was enough?"),
      line("Kido","🌙","I was optimistic."),
      line("Kido","🌙","You know... I like mornings like this."),
      line("Cupcake","🧁","Because of the coffee?"),
      line("Kido","🌙","No. Because nothing is rushing us."),
      line("Kido","🌙","Today... no checking work, no worrying about tomorrow, no thinking about everything we still have to do."),
      line("Cupcake","🧁","Deal. Today's only about making memories."),
      line("Kido","🌙","To our peaceful day?"),
      line("Cupcake","🧁","To our peaceful day."),
      narr("They gently tap their mugs together. A comfortable silence follows — the morning itself feels enough."),
      line("Kido","🌙","You missed a spot."),
      narr("Without saying anything, she gently wipes the tiny spot away with her thumb."),
      line("Kido","🌙","There. Much better."),
      narr("The first memory of the day settles quietly into place — not because something extraordinary happened, but because ordinary moments became special together."),
      line("Cupcake","🧁","Ready for the rest of the day?"),
      line("Kido","🌙","Definitely.")
    ],
    memory: { icon: "☕", name: "Morning Coffee", categories: ["Coffee","Comfort"] },
    next: "SCENE_02"
  },

  SCENE_01B: {
    id: "SCENE_01B",
    music: "dawn",
    background: BG + "porch.jpg",
    time: "09:20 AM", progressLabel: "Morning", progressPct: 25,
    lines: [
      line("Cupcake","🧁","Come on. Before the whole neighborhood wakes up."),
      line("Kido","🌙","It smells so nice."),
      line("Cupcake","🧁","Rain last night. Everything feels fresh afterwards."),
      narr("They begin walking slowly along the small garden path. No destination — just walking."),
      line("Kido","🌙","I almost forgot how peaceful mornings are."),
      line("Cupcake","🧁","Most people sleep through the best part of the day."),
      line("Kido","🌙","Including me."),
      line("Kido","🌙","Look... it's beautiful."),
      line("Cupcake","🧁","I am looking. Just... not at the butterfly."),
      line("Kido","🌙","That was smooth."),
      line("Cupcake","🧁","I've had practice."),
      line("Kido","🌙","If we ever had a tiny house... I'd want flowers like these."),
      line("Cupcake","🧁","Only flowers?"),
      line("Kido","🌙","And coffee. Lots of coffee."),
      line("Cupcake","🧁","Now that's a realistic dream."),
      narr("Cupcake gently reaches toward her hair and carefully removes a tiny leaf caught in it."),
      line("Cupcake","🧁","There. Nature was trying to keep a souvenir."),
      line("Kido","🌙","I think it liked me."),
      line("Cupcake","🧁","Can't blame it."),
      narr("Not every walk needs a destination. Sometimes, walking beside the right person is already enough."),
      line("Kido","🌙","I'm glad we came outside."),
      line("Cupcake","🧁","Me too. Feels like the day officially started.")
    ],
    memory: { icon: "🌿", name: "Fresh Morning Walk", categories: ["Nature","Comfort"] },
    next: "SCENE_02"
  },

  SCENE_01C: {
    id: "SCENE_01C",
    music: "dawn",
    background: BG + "bedroom-morning.jpg",
    time: "09:45 AM", progressLabel: "Morning", progressPct: 35,
    lines: [
      line("Cupcake","🧁","So... should we finally start the day?"),
      line("Kido","🌙","No."),
      line("Cupcake","🧁","No? That's your final answer?"),
      line("Kido","🌙","Absolutely. Five more minutes."),
      line("Cupcake","🧁","You said that... ten minutes ago."),
      line("Kido","🌙","Exactly. I'm very consistent."),
      line("Cupcake","🧁","One day those five minutes are going to become an hour."),
      line("Kido","🌙","That's future Kido's problem."),
      line("Kido","🌙","Come here. Just for a little while."),
      line("Cupcake","🧁","Hmm... we have such a busy schedule today."),
      line("Kido","🌙","We literally said we have no plans."),
      line("Cupcake","🧁","You're right. My schedule is completely free."),
      narr("Some mornings, silence says everything. No conversation is needed. Just being together feels enough."),
      line("Kido","🌙","Do you ever wish time would slow down a little?"),
      line("Cupcake","🧁","Sometimes. Especially moments like this."),
      line("Kido","🌙","Me too."),
      line("Kido","🌙","Thank you... for making ordinary mornings feel special."),
      line("Cupcake","🧁","I was about to say the same thing."),
      line("Kido","🌙","No copying."),
      line("Cupcake","🧁","Too late."),
      narr("Kido gently leans forward and gives Cupcake a soft kiss on the forehead."),
      line("Kido","🌙","Good morning. Properly this time."),
      line("Cupcake","🧁","Best way to start the day."),
      line("Kido","🌙","Now... I'm ready to get up.")
    ],
    memory: { icon: "😴", name: "Lazy Morning", categories: ["Comfort","Laughter"] },
    next: "SCENE_02"
  },

  // ---------------------------------------------------------
  SCENE_02: {
    id: "SCENE_02",
    music: "planning",
    background: BG + "bedroom-morning.jpg",
    time: null, progressLabel: "Morning", progressPct: 40,
    lines: [
      line("Kido","🌙","That was nice."),
      line("Cupcake","🧁","Best start to the day."),
      line("Cupcake","🧁","Looks like the whole town is awake now."),
      line("Kido","🌙","So... what kind of day are we having?"),
      line("Cupcake","🧁","We could stay here... or actually do something."),
      line("Kido","🌙","I vote for \"actually do something.\""),
      narr("The quiet beginning of the day is over. Now the story starts to unfold. Every choice from here will create a different memory — not better, not worse, just different."),
      line("Cupcake","🧁","So... what sounds fun?")
    ],
    choices: [
      { label: "🍳 Cook Breakfast Together", next: "SCENE_02A" },
      { label: "🚿 Get Ready Together", next: "SCENE_02B" },
      { label: "🗺️ Plan an Adventure", next: "SCENE_02C" },
      { label: "🛋️ Stay Here a Little Longer", next: "SCENE_02D" }
    ]
  },

  SCENE_02A: {
    id: "SCENE_02A",
    music: "planning",
    background: BG + "kitchen.jpg",
    time: "10:15 AM", progressLabel: "Late Morning", progressPct: 45,
    lines: [
      line("Cupcake","🧁","Yes. We're officially low on groceries."),
      line("Kido","🌙","Very useful discovery."),
      line("Cupcake","🧁","Alright... mission: make breakfast using whatever we have."),
      line("Kido","🌙","Sounds dangerous."),
      line("Cupcake","🧁","Simple breakfast?"),
      line("Kido","🌙","Simple is good. Less chance of setting the kitchen on fire."),
      line("Cupcake","🧁","That only happened once."),
      narr("They begin cooking together. Cupcake starts cutting tomatoes, Kido butters the bread. The room fills with the smell of toasted bread."),
      line("Cupcake","🧁","...Five second rule?"),
      line("Kido","🌙","Absolutely not."),
      line("Cupcake","🧁","We lost a good tomato today."),
      narr("A slice of toast pops out of the toaster unexpectedly. Kido jumps."),
      line("Kido","🌙","It attacked me!"),
      line("Cupcake","🧁","I think the toast won."),
      narr("They finally sit at the small dining table."),
      line("Cupcake","🧁","We should probably admire our work first."),
      line("Kido","🌙","You're acting like we made a five-star meal."),
      line("Cupcake","🧁","This toast has personality."),
      line("Kido","🌙","It's actually really good."),
      line("Cupcake","🧁","I knew it."),
      narr("Breakfast wasn't perfect — the tomatoes weren't evenly cut, the toast was slightly overdone. But somehow that made it feel even more special."),
      line("Cupcake","🧁","I'll do it."),
      line("Kido","🌙","We'll do it. Together."),
      narr("Some memories aren't made during big adventures. Sometimes they begin with burnt toast, and end with clean dishes.")
    ],
    memory: { icon: "🍳", name: "Chef Duo", categories: ["Teamwork","Laughter"] },
    next: "SCENE_03"
  },

  SCENE_02B: {
    id: "SCENE_02B",
    music: "planning",
    background: BG + "bathroom.jpg",
    time: "10:30 AM", progressLabel: "Late Morning", progressPct: 45,
    lines: [
      line("Cupcake","🧁","I guess... we should probably make ourselves look presentable."),
      line("Kido","🌙","You mean you should. I already look amazing."),
      line("Cupcake","🧁","Hmm... I'll allow it."),
      line("Kido","🌙","Thank you for recognizing greatness."),
      line("Cupcake","🧁","Do you think this looks alright?"),
      narr("Kido gently fixes one stubborn strand of his hair."),
      line("Kido","🌙","There. Now you're officially ready."),
      line("Cupcake","🧁","So all I needed was professional help."),
      line("Kido","🌙","Why does my hair always choose chaos?"),
      line("Cupcake","🧁","It's matching your personality. In the best way possible."),
      narr("Kido grabs a towel and playfully tosses it at him."),
      line("Kido","🌙","If today was a photo... what would you want to remember most?"),
      line("Cupcake","🧁","Not one big moment. Just... all these little ones."),
      line("Kido","🌙","I was hoping you'd say that."),
      narr("Not every memory begins with an adventure. Sometimes it begins while deciding which shirt to wear, or laughing at messy hair."),
      line("Cupcake","🧁","Ready?"),
      line("Kido","🌙","Ready."),
      line("Cupcake","🧁","Today's waiting for us.")
    ],
    memory: { icon: "🤝", name: "Ready Together", categories: ["Teamwork","Comfort"] },
    next: "SCENE_03"
  },

  SCENE_02C: {
    id: "SCENE_02C",
    music: "planning",
    background: BG + "bedroom-adventure.jpg",
    time: "09:55 AM", progressLabel: "Morning", progressPct: 40,
    lines: [
      line("Cupcake","🧁","Okay... if today could be anything... where would you go?"),
      line("Kido","🌙","Here."),
      line("Cupcake","🧁","Do you even know where \"here\" is?"),
      line("Kido","🌙","Not at all. It just looked interesting."),
      line("Cupcake","🧁","Let's make a list. No limits — just places we'd like to visit someday."),
      line("Kido","🌙","A quiet café. With huge windows. When it's raining outside."),
      line("Cupcake","🧁","Somewhere we can watch the sunset... without checking the time."),
      line("Kido","🌙","I like that one."),
      narr("Notebook: Rainy café · Sunset viewpoint · Flower garden · Bookstore · Lakeside walk · Picnic."),
      line("Kido","🌙","We're writing more places than we could visit in one day."),
      line("Cupcake","🧁","Good. That means we'll need another day."),
      line("Kido","🌙","We should take lots of pictures today."),
      line("Cupcake","🧁","Pictures are nice. But I think we'll remember today anyway."),
      line("Kido","🌙","Still... pictures help on days when memory isn't enough."),
      narr("No destination had been chosen. No tickets were booked. No schedule was made. Yet somehow, the adventure had already begun."),
      line("Cupcake","🧁","I have a feeling... today's going to be memorable."),
      line("Kido","🌙","Let's make sure it is.")
    ],
    memory: { icon: "🗺️", name: "Dreaming Together", categories: ["Adventure","Planning"] },
    next: "SCENE_03"
  },

  SCENE_02D: {
    id: "SCENE_02D",
    music: "planning",
    background: BG + "bedroom-morning.jpg",
    time: "09:50 AM", progressLabel: "Morning", progressPct: 40,
    lines: [
      line("Cupcake","🧁","You know... we don't actually have to leave right now."),
      line("Kido","🌙","I was hoping you'd say that."),
      narr("The world outside continues moving — cars pass, shops open. Inside, everything remains wonderfully slow."),
      line("Kido","🌙","I like this. Not the room. This feeling — like we don't have to hurry anywhere."),
      line("Cupcake","🧁","We spend so much time planning tomorrow... sometimes we forget today."),
      line("Kido","🌙","Today seems pretty nice."),
      line("Cupcake","🧁","We should write something. One sentence about today. Then read it again a year from now."),
      narr("Kido writes carefully and turns the notebook around. It reads: \"Today felt peaceful.\" Cupcake writes underneath: \"Let's have more days like this.\""),
      line("Kido","🌙","Promise?"),
      line("Cupcake","🧁","Promise."),
      narr("Some memories don't need photographs. Sometimes a single sentence is enough to bring a day back."),
      line("Kido","🌙","Alright... I think I'm ready now — to see what today has planned for us."),
      line("Cupcake","🧁","Shall we?")
    ],
    memory: { icon: "🛋️", name: "Quiet Morning", categories: ["Comfort","Peace"] },
    next: "SCENE_03"
  },

  // ---------------------------------------------------------
  SCENE_03: {
    id: "SCENE_03",
    music: "daytime",
    background: BG + "village-street.jpg",
    time: null, progressLabel: "Late Morning", progressPct: 55,
    lines: [
      narr("The front door closes behind them. People smile as they pass. A bakery has just opened — fresh bread fills the air."),
      narr("The town is finally awake. Shops are opening. Coffee is brewing. Today feels full of possibilities."),
      line("Kido","🌙","Everything feels different outside."),
      line("Cupcake","🧁","Funny... nothing really changed."),
      line("Kido","🌙","Maybe we did."),
      line("Kido","🌙","Can we agree on something? No checking maps, no schedules. Let's just wander."),
      line("Cupcake","🧁","Getting lost?"),
      line("Kido","🌙","Finding unexpected places."),
      narr("A flower petal lands on Kido's shoulder. Cupcake gently picks it up."),
      line("Cupcake","🧁","I think flowers keep trying to follow you."),
      line("Kido","🌙","I'm choosing to believe that's a compliment."),
      narr("The best days rarely begin with a destination. Sometimes they begin with a single step, and someone walking beside you."),
      line("Cupcake","🧁","Okay... now we actually have to decide."),
      line("Kido","🌙","Finally. A real decision.")
    ],
    choices: [
      { label: "☕ Grab a Coffee", next: "SCENE_03A" },
      { label: "📚 Visit the Bookstore", next: "SCENE_03B" },
      { label: "🌸 Visit the Flower Garden", next: "SCENE_03C" }
    ]
  },

  SCENE_03A: {
    id: "SCENE_03A",
    music: "daytime",
    background: BG + "cafe.jpg",
    time: null, progressLabel: "Late Morning", progressPct: 60,
    lines: [
      narr("The café bell rings as they walk inside."),
      line("Kido","🌙","It smells amazing in here."),
      line("Cupcake","🧁","Fresh coffee always wins. Window seat?"),
      line("Kido","🌙","Always. You get people to watch."),
      line("Cupcake","🧁","Two cappuccinos. And... that chocolate pastry."),
      line("Kido","🌙","You weren't going to ask me?"),
      line("Cupcake","🧁","I already knew the answer."),
      line("Kido","🌙","If I had my own café... I'd make everyone sit by a window. People slow down when they have something to look at."),
      line("Cupcake","🧁","You notice little things."),
      line("Kido","🌙","Someone has to."),
      narr("Outside, an old couple walks by holding hands."),
      line("Kido","🌙","I hope we're still like that one day."),
      line("Cupcake","🧁","We'll argue over which café to visit. But we'll still come together."),
      narr("Some cafés serve coffee. Others quietly become part of someone's memories.")
    ],
    memory: { icon: "☕", name: "Favorite Corner", categories: ["Comfort"] },
    next: "SCENE_03_MERGE"
  },

  SCENE_03B: {
    id: "SCENE_03B",
    music: "daytime",
    background: BG + "bookstore.jpg",
    time: null, progressLabel: "Late Morning", progressPct: 60,
    lines: [
      narr("A small bell rings above the door. The smell of paper fills the room."),
      line("Kido","🌙","I love this smell. Old books, new books, any books."),
      line("Cupcake","🧁","Careful. You might disappear in here."),
      line("Kido","🌙","Then come find me."),
      line("Cupcake","🧁","Found anything?"),
      line("Kido","🌙","Five books. I'm pretending I can afford all of them."),
      narr("Cupcake picks up a random book: \"How To Wake Up Early.\""),
      line("Cupcake","🧁","Want me to buy this?"),
      line("Kido","🌙","Very funny."),
      narr("Kido stops at a shelf of tiny handmade bookmarks — pressed flowers, stars, cats."),
      line("Kido","🌙","These are adorable."),
      narr("While she's distracted, Cupcake quietly buys one shaped like a little moon, and slips it into the novel Kido decided to buy. She doesn't notice."),
      narr("Sometimes, the smallest gifts are the ones found much later.")
    ],
    memory: { icon: "📖", name: "Lost Between Pages", categories: ["Romance"], secret: true },
    next: "SCENE_03_MERGE"
  },

  SCENE_03C: {
    id: "SCENE_03C",
    music: "daytime",
    background: BG + "flower-garden.jpg",
    time: null, progressLabel: "Late Morning", progressPct: 60,
    lines: [
      narr("They enter a peaceful public garden. Colorful flowers surround the walking path. Butterflies drift through the air."),
      line("Kido","🌙","It's beautiful."),
      line("Cupcake","🧁","I had a feeling you'd like it."),
      line("Kido","🌙","Every flower looks different."),
      line("Cupcake","🧁","Kind of like people."),
      line("Kido","🌙","Deep."),
      line("Cupcake","🧁","I surprised myself too."),
      narr("A butterfly lands nearby. Kido kneels to watch it."),
      line("Kido","🌙","Don't move. You'll scare it."),
      narr("Cupcake freezes dramatically. The butterfly flies away anyway."),
      line("Kido","🌙","Mission failed."),
      line("Cupcake","🧁","I tried."),
      narr("They sit together on a wooden bench beneath a tree. The breeze moves through the flowers."),
      line("Kido","🌙","Days like this make everything feel slower."),
      line("Cupcake","🧁","Maybe that's why they become our favorites."),
      narr("Flowers bloom quietly. Perhaps the best memories do too.")
    ],
    memory: { icon: "🌸", name: "Blooming Day", categories: ["Nature","Comfort"] },
    next: "SCENE_03_MERGE"
  },

  SCENE_03_MERGE: {
    id: "SCENE_03_MERGE",
    music: "daytime",
    background: BG + "village-street.jpg",
    time: "12:15 PM", progressLabel: "Afternoon", progressPct: 68,
    lines: [
      line("Kido","🌙","That was fun."),
      line("Cupcake","🧁","Yeah... I'm glad we came."),
      narr("A movie poster catches Kido's eye."),
      line("Kido","🌙","Cupcake... look."),
      line("Cupcake","🧁","Looks interesting."),
      line("Kido","🌙","Should we watch it tonight?"),
      line("Cupcake","🧁","Let's do it. That gives us the whole day before the show."),
      line("Kido","🌙","Perfect. Now... I'm getting hungry."),
      line("Cupcake","🧁","I was waiting for you to say that."),
      narr("With the evening's plan decided, the rest of the day felt wonderfully open. Their next stop... lunch.")
    ],
    next: "SCENE_04"
  },

  // ---------------------------------------------------------
  SCENE_04: {
    id: "SCENE_04",
    music: "daytime",
    background: BG + "restaurant-lunch.jpg",
    time: "12:30 PM", progressLabel: "Afternoon", progressPct: 72,
    lines: [
      narr("They walk into a small, cozy restaurant. A waiter leads them to a window table."),
      line("Kido","🌙","I'm starving."),
      line("Cupcake","🧁","I noticed. You've been talking about food for the last ten minutes."),
      line("Kido","🌙","Can you blame me?"),
      line("Cupcake","🧁","What are you getting?"),
      line("Cupcake","🧁","Hmm... I'm thinking pasta."),
      line("Kido","🌙","I knew it. You always end up choosing pasta."),
      line("Cupcake","🧁","I have excellent taste."),
      narr("The food arrives. They exchange a small bite from each other's plates."),
      line("Kido","🌙","Okay... your choice wins."),
      line("Cupcake","🧁","I knew it."),
      line("Kido","🌙","Don't get used to being right."),
      narr("The best meals aren't remembered because of the food. They're remembered because of the people sitting across the table."),
      line("Cupcake","🧁","We've still got a few hours before the movie."),
      line("Kido","🌙","Good. I don't want to spend the whole day indoors."),
      line("Cupcake","🧁","How about we walk around for a bit?"),
      line("Kido","🌙","Perfect. No destination. Just walking."),
      line("Cupcake","🧁","Seems to be our specialty today.")
    ],
    memory: { icon: "🍽️", name: "Shared Lunch", categories: ["Comfort","Togetherness"] },
    next: "SCENE_05"
  },

  // ---------------------------------------------------------
  SCENE_05: {
    id: "SCENE_05",
    music: "daytime",
    background: BG + "village-street.jpg",
    time: "2:00 PM", progressLabel: "Afternoon", progressPct: 80,
    lines: [
      line("Kido","🌙","Lunch was really good."),
      line("Cupcake","🧁","I knew you'd steal my fries."),
      line("Kido","🌙","Sharing is caring."),
      line("Cupcake","🧁","Convenient excuse."),
      narr("Two places appear ahead: a colorful little ice cream shop, and a small bowling alley."),
      line("Kido","🌙","Looks like we have another decision."),
      line("Cupcake","🧁","Honestly... I'm happy with either.")
    ],
    choices: [
      { label: "🍦 Get Ice Cream", next: "SCENE_05A" },
      { label: "🎳 Go Bowling", next: "SCENE_05B" }
    ]
  },

  SCENE_05A: {
    id: "SCENE_05A",
    music: "daytime",
    background: BG + "icecream-shop.jpg",
    time: "4:30 PM", progressLabel: "Afternoon", progressPct: 88,
    lines: [
      line("Kido","🌙","Okay... one rule. No judging my flavor."),
      line("Cupcake","🧁","Now I'm definitely judging."),
      line("Cupcake","🧁","Chocolate. Easy choice."),
      line("Kido","🌙","Too predictable. Cookies and cream."),
      line("Cupcake","🧁","That's also predictable."),
      line("Kido","🌙","We're both boring."),
      narr("A tiny drop of ice cream lands on Kido's nose."),
      line("Cupcake","🧁","Don't move. You've been attacked."),
      line("Kido","🌙","By what?"),
      line("Cupcake","🧁","Your own ice cream."),
      narr("Some afternoons are remembered for reasons no one expects.")
    ],
    memory: { icon: "🍦", name: "Sweet Afternoon", categories: ["Laughter"] },
    next: "SCENE_06"
  },

  SCENE_05B: {
    id: "SCENE_05B",
    music: "daytime",
    background: BG + "bowling-alley.jpg",
    time: "4:30 PM", progressLabel: "Afternoon", progressPct: 88,
    lines: [
      line("Kido","🌙","Ready to lose?"),
      line("Cupcake","🧁","Confident already?"),
      line("Kido","🌙","Very."),
      narr("Kido's first throw curves straight into the gutter. Silence."),
      line("Cupcake","🧁","Impressive."),
      line("Kido","🌙","That was a warm-up."),
      narr("Cupcake's ball also misses."),
      line("Kido","🌙","Wow. We're equally terrible."),
      narr("A few frames later, Kido bowls a strike and jumps excitedly."),
      line("Kido","🌙","YES!"),
      line("Cupcake","🧁","I regret teaching you absolutely nothing."),
      line("Kido","🌙","Skill issue."),
      narr("Winning was forgotten. Laughing wasn't.")
    ],
    memory: { icon: "🎳", name: "Friendly Competition", categories: ["Laughter"] },
    next: "SCENE_06"
  },

  // ---------------------------------------------------------
  SCENE_06: {
    id: "SCENE_06",
    music: "evening",
    background: BG + "cinema.jpg",
    time: "6:45 PM", progressLabel: "Night", progressPct: 92,
    lines: [
      narr("The sun is beginning to set, painted in shades of orange and pink. They walk toward the cinema."),
      line("Kido","🌙","We made it just in time."),
      line("Cupcake","🧁","Good. I didn't want to miss the trailers."),
      line("Kido","🌙","You like the trailers more than the movie."),
      line("Cupcake","🧁","For you."),
      line("Kido","🌙","Thank you."),
      line("Kido","🌙","Popcorn? Sweet or salty?"),
      line("Cupcake","🧁","Both."),
      // --- background swaps to the cinema interior right here ---
      narr("Lights dim. The screen lights up their faces. During a funny scene, both reach for the last handful of popcorn — their hands bump."),
      line("Kido","🌙","Looks like we had the same idea."),
      line("Cupcake","🧁","We'll share."),
      narr("The credits roll."),
      line("Kido","🌙","I liked it."),
      line("Cupcake","🧁","Me too. Although... today was still my favorite part."),
      line("Kido","🌙","Mine too.")
    ],
    bgChanges: [
      { atLine: 8, background: BG + "cinema-interior.jpg" }
    ],
    memory: { icon: "🎬", name: "Movie Night", categories: ["Romance"] },
    next: "SCENE_06B"
  },

  SCENE_06B: {
    id: "SCENE_06B",
    music: "evening",
    background: BG + "restaurant-dinner.jpg",
    time: "9:00 PM", progressLabel: "Night", progressPct: 96,
    lines: [
      narr("They leave the cinema. Streetlights glow softly. One last stop before heading home — a quiet restaurant, warm lighting, only a few tables occupied."),
      line("Kido","🌙","If you had to choose one moment from today... which would it be?"),
      line("Cupcake","🧁","Honestly... I don't think I can choose. Every little moment led to the next one. If I removed one, today wouldn't feel the same."),
      line("Kido","🌙","That's a good answer."),
      line("Kido","🌙","I think my favorite part was never where we went. It was knowing I didn't have to rush."),
      line("Cupcake","🧁","Let's promise ourselves something. No matter how busy life gets... we'll make another day like today."),
      narr("Kido reaches across the table and gently holds his hand."),
      line("Kido","🌙","Promise."),
      narr("The best promises are often the quietest ones.")
    ],
    memory: { icon: "🍽️", name: "Dinner Together", categories: ["Togetherness"] },
    next: "SCENE_06C"
  },

  SCENE_06C: {
    id: "SCENE_06C",
    music: "evening",
    background: BG + "night-street.jpg",
    time: "10:15 PM", progressLabel: "Night", progressPct: 99,
    lines: [
      narr("They walk home under a sky full of stars. Neither says much — the silence feels peaceful."),
      line("Kido","🌙","Thank you... for today."),
      line("Cupcake","🧁","Thank you... for saying yes to every little adventure."),
      narr("The day had come to an end. The coffee. The laughter. The walks. The conversations. None of them were extraordinary. Yet somehow, together, they became unforgettable.")
    ],
    next: "SCRAPBOOK"
  }
};

const SCRAPBOOK_BG = BG + "scrapbook-open.jpg";

const StoryScript = (() => {

const SCENES = {

scene1: {
  id: 'scene1',
  name: 'The Velvet Threshold',
  background: 'assets/backgrounds/mansion-entrance.png',
  dialogue: [
    { speaker: null, text: "The evening air tastes of lavender and old secrets." },
    { speaker: null, text: "I stand before the gates of the Velvet Garden Mansion, my single leather suitcase trembling in my grip — or perhaps that's just my hands." },
    { speaker: 'lunette', expression: 'neutral', position: 'center', text: "This is it, Lunette. Your new home. Your new life." },
    { speaker: null, text: "The mansion rises like something dreamed rather than built. Its towers curve in ways that shouldn't be architecturally sound, and the windows... they seem to blink. Not with light. With awareness." },
    { speaker: 'lunette', expression: 'shy', position: 'center', text: "...Is that window watching me?" },
    { speaker: null, text: "I shake my head. My pointed ears twitch with nervousness — an old habit I've never managed to break." },
    { speaker: null, text: "The garden path ahead is lined with roses that glow faintly in the twilight. Their petals drift upward instead of down, floating like tiny pink lanterns into the dusky sky." },
    { speaker: 'lunette', expression: 'neutral', position: 'center', text: "Okay. I was told this place was 'a little unusual.' I suppose floating flowers qualify." },
    { speaker: null, text: "I adjust my maid headband — freshly pressed, perfectly symmetrical. If nothing else, I will be a presentable maid. Even if my insides feel like a jar of startled butterflies." },
    { speaker: 'lunette', expression: 'shy', position: 'center', text: "Please let the lady of the house be kind. Please let her not mind that I trip over flat surfaces. Please let her not notice when I talk to the flowers..." },
    { speaker: null, text: "I knock on the grand door. Three times. My knuckles barely make a sound against the ancient dark wood." },
    { speaker: null, text: "The door swings open by itself. Not dramatically — gently, as if offering an invitation rather than a startle." },
    { speaker: null, text: "Inside, the hallway stretches impossibly long. Crystal chandeliers cast prismatic light across velvet wallpaper the color of crushed berries. The air smells of vanilla and something sweeter — sugar cookies, maybe?" },
    { speaker: 'lunette', expression: 'neutral', position: 'center', text: "Hello? I'm... I'm Lunette. The new maid? I received the letter saying to arrive by dusk..." },
    { speaker: null, text: "No response. But somewhere deeper inside the mansion, I hear humming. A soft, lilting melody that seems to curl around the corners like silk ribbon." },
    { speaker: null, text: "My ears perk up involuntarily. It's the loveliest sound I've ever heard." },
    { speaker: 'lunette', expression: 'blush', position: 'center', text: "Well... I suppose I should follow the music." },
    { speaker: null, text: "I step inside. The door closes behind me — softly, like a whispered 'welcome home.'" },
    { speaker: null, text: "And just for a moment, I swear I see tiny hearts blooming in the air around me, dissolving like morning frost before I can be sure they were ever real." },
    { speaker: 'lunette', expression: 'shy', position: 'center', text: "...I think I'm going to like it here. Or go completely mad. Possibly both.", hide: true }
  ],
  next: 'scene2'
},

scene2: {
  id: 'scene2',
  name: 'A Name Like Midnight',
  background: 'assets/backgrounds/hallway.png',
  dialogue: [
    { speaker: null, text: "I follow the humming through the winding hallway. Each step echoes softly, as if the mansion is listening to my footfalls." },
    { speaker: null, text: "The humming grows louder, sweeter. It's coming from behind a set of double doors carved with climbing roses." },
    { speaker: 'lunette', expression: 'neutral', position: 'center', text: "Excuse me? I'm looking for the lady of the—" },
    { speaker: null, text: "I push open the doors and step into the most magnificent library I've ever seen.", background: 'assets/backgrounds/library.png', hide: true },
    { speaker: null, text: "Bookshelves stretch to the vaulted ceiling, three stories high. A spiral staircase of wrought iron lace connects the levels. And there, draped across a velvet chaise like a painting come to life..." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "Oh~! You're finally here!" },
    { speaker: null, text: "She's reading a thick leather book. Upside down. Her long black hair cascades over the edge of the chaise and pools on the floor like spilled ink. Her golden amber eyes catch the lamplight and gleam with mischief." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "I've been waiting for you for hours! I even practiced my dramatic 'mysterious mistress' pose. What do you think? See?" },
    { speaker: null, text: "She gestures at herself grandly, still upside down. The book falls squarely on her face." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "...That was completely intentional. Very mysterious." },
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "A-are you alright?!" },
    { speaker: null, text: "She rights herself with surprising grace, tossing the book aside. Her oversized cream sweater slips off one shoulder as she stands, revealing the strap of a pink top underneath. She tilts her head and studies me with those luminous amber eyes, a smile curling at the corners of her lips." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "I'm Sable! Sable Véronique Nightbloom du Ciel — but just Sable is perfectly fine. Nobody uses the full name except the mailman, and I'm pretty sure he does it specifically to be mean." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "And you must be Lunette~ My new companion! My letter said 'maid,' but 'companion' sounds so much more romantic, don't you think?" },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "R-romantic isn't quite the word I'd choose for a professional employment arrangement..." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Employment! How delightfully clinical. You're adorable already and you've been here less than five minutes." },
    { speaker: null, text: "She circles me slowly, and I become acutely aware that she smells like warm honey and fresh strawberries. My ears flatten self-consciously against my head." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "An elf! A real genuine elf! I knew it from your letter but seeing you in person is just... oh, your ears are so cute when they do that twitchy thing~" },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "They're not twitching, they're... expressing concern." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Concerned ears! Even better!" },
    {
      speaker: null,
      text: "",
      choice: {
        prompt: "How do you respond?",
        options: [
          { text: "Y-you're very pretty...", affection: 1, next: 'scene2_pretty' },
          { text: "Are you the lady of the house?", affection: 0, next: 'scene2_formal' }
        ]
      }
    }
  ]
},

scene2_pretty: {
  id: 'scene2_pretty',
  name: 'A Name Like Midnight',
  background: 'assets/backgrounds/library.png',
  dialogue: [
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "Y-you're very pretty..." },
    { speaker: null, text: "The words tumble out before I can catch them. My face ignites like a furnace. My ears go completely vertical with mortification." },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "I—!" },
    { speaker: null, text: "For one glorious moment, the teasing girl is completely and utterly flustered. Her cheeks bloom crimson, and she presses both hands to her face." },
    { speaker: 'sable', expression: 'denpa-smile', position: 'right', text: "She called me pretty... Pretty... This must be fate. Destiny. I can already hear the wedding bells. A spring ceremony in the garden, petals everywhere, matching dresses with lace trim..." },
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "Um... Sable? You're murmuring out loud. Quite loudly, actually." },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "Was I?! I was absolutely NOT planning our hypothetical wedding just now! That would be completely insane! We literally just met thirty seconds ago!" },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "...But purely hypothetically, if we DID plan a wedding someday, would you prefer roses or lilies?" },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "I think I need to sit down." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Yes! Let me show you to your room! It's right next to mine. I specifically arranged that. For... purely professional reasons." },
    { speaker: null, text: "She takes my hand. Her fingers are warm and soft, and my heart does something completely inappropriate for a professional maid-employer relationship." },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "...Professional reasons." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "Absolutely professional. The most professional arrangement in the entire history of domestic employment.", hide: true }
  ],
  next: 'scene3'
},

scene2_formal: {
  id: 'scene2_formal',
  name: 'A Name Like Midnight',
  background: 'assets/backgrounds/library.png',
  dialogue: [
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "Are you the lady of the house?" },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "..." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "'Lady of the house?' How unbelievably formal~ You make me sound like I'm eighty years old and wear a monocle to dinner." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Just call me Sable! Pleeease? 'Lady of the house' makes my skin crawl. This mansion is plenty alive without us making it sound like a stuffy period drama." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "Alive...? What do you mean by that?" },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "Oh, you'll see soon enough~ Come on, let me show you around! Your room is right next to mine. The mansion arranged that itself, actually. It's terribly opinionated about room assignments." },
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "The mansion... arranged...?" },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Don't worry about it! You'll get used to the weirdness. I promise it's the cozy kind of weird, not the scary kind." },
    { speaker: null, text: "She grabs my wrist and tugs me forward with startling enthusiasm. Her grip is gentle but insistent, like a current you don't want to swim against." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "I have so many questions right now." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "And I have so many answers! Most of them are just 'the mansion does what it wants,' but still~", hide: true }
  ],
  next: 'scene3'
},

scene3: {
  id: 'scene3',
  name: 'Sugar & Flour Clouds',
  background: 'assets/backgrounds/kitchen.png',
  dialogue: [
    { speaker: null, text: "The next morning arrives in a blaze of golden sunlight through rose-tinted windows. I'm halfway through dusting the second-floor parlor when Sable materializes beside me like a pastel-colored ghost." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Lunette~! Stop dusting immediately! It's baking day!" },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "Baking day? Is that... on the official schedule?" },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "It is now! I just officially invented it right this moment. Come on, the kitchen is already warm!" },
    { speaker: null, text: "The kitchen is enormous and rustic, with copper pots hanging from ceiling racks and a hearth large enough to roast a small dragon. Sable has already laid out an army of ingredients: flour, sugar, butter, vanilla extract, two types of chocolate chips, and something sparkly that might be edible glitter." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "We're making double-chocolate sugar cookies! My grandmother's recipe. The secret ingredient is 'an unreasonable amount of love.' Also, extra butter. Always extra butter." },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "I actually love baking! I used to make lemon scones at my old position." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "Lemon scones? How terribly elegant and refined~ But the real question is... can you handle... THE MIXER?" },
    { speaker: null, text: "She holds up an ancient hand mixer like it's a legendary weapon pulled from a stone. It has dried batter on one of the beaters." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "I think I can manage a simple hand mixer—" },
    { speaker: null, text: "I cannot manage. Within three minutes, I've somehow created a flour explosion that coats the entire counter, half the ceiling, both of us, and — inexplicably — the inside of a closed cabinet." },
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "I am... so incredibly sorry..." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Ahahahaha! You look like a ghost! The cutest, most apologetic ghost in the entire world!" },
    { speaker: null, text: "She reaches out and gently brushes flour from my cheek. Her fingertips linger for just a moment too long. The kitchen goes very quiet except for the oven's soft ticking." },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "..." },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "...You have flour on your ear too. Hold still." },
    { speaker: null, text: "She carefully, tenderly dusts my left ear. The tip of my ear twitches involuntarily at her touch. I try not to shiver. I fail spectacularly." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "There! All clean. Okay! Cookies in the oven! Now we wait, and I absolutely will be stealing raw batter in the meantime." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "Sable, the raw eggs in the batter—" },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "Risk makes the batter taste exponentially better! It's science!" },
    { speaker: null, text: "Twenty minutes and one minor oven-mitt-related incident later, the kitchen smells like pure heaven. Golden-brown cookies cool on a wire rack, their chocolate chips still gloriously molten and shining." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "They're absolutely perfect! Quick, quick — taste test! This is the most critical moment!" },
    {
      speaker: null,
      text: "",
      choice: {
        prompt: "How do you share the cookies?",
        options: [
          { text: "Feed Sable a cookie directly", affection: 1, next: 'scene3_feed' },
          { text: "Hand her the plate normally", affection: 0, next: 'scene3_plate' }
        ]
      }
    }
  ]
},

scene3_feed: {
  id: 'scene3_feed',
  name: 'Sugar & Flour Clouds',
  background: 'assets/backgrounds/kitchen.png',
  dialogue: [
    { speaker: null, text: "Before my brain can intervene with something sensible, my hands act on their own. I pick up a warm cookie and hold it up to Sable's lips." },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "H-here. Say 'ahh.'" },
    { speaker: null, text: "Time stops. Sable freezes completely. Her golden eyes go impossibly wide, like two tiny suns having a simultaneous crisis. Then she leans forward and takes a small, delicate bite, her lips barely brushing my fingertips." },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "..." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "...It's the best cookie I've ever had in my entire life. In the history of all cookies ever baked by anyone anywhere." },
    { speaker: null, text: "Then something shifts behind her eyes. They get glassy and dangerously bright, and she suddenly lunges forward and wraps her arms around me with the force of a small, emotionally overwhelmed hurricane." },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "You FED me! With your own actual HANDS! Nobody's ever done that before! This is the single nicest thing anyone has EVER — Lunette, you can never leave this mansion, okay?! PROMISE ME!" },
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "S-Sable, you're crushing my ribcage—" },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "I don't care! You're warm and you smell like vanilla and you FED ME A COOKIE and I'm NEVER LETTING GO! Not ever! This is my life now!" },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "...I'm not going anywhere. But I do genuinely need to breathe to survive." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Breathing is vastly overrated! Love is what keeps you alive!" },
    { speaker: null, text: "She eventually releases me, but stays pressed close, her shoulder warm against mine as we eat cookies in comfortable silence. Her smile is so bright it could power the entire mansion." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "Tomorrow is also baking day, by the way. And the day after that. In fact, every single day is now baking day. I've officially decreed it.", hide: true }
  ],
  next: 'scene4'
},

scene3_plate: {
  id: 'scene3_plate',
  name: 'Sugar & Flour Clouds',
  background: 'assets/backgrounds/kitchen.png',
  dialogue: [
    { speaker: null, text: "I carefully arrange several cookies on a small china plate and slide it across the counter toward Sable with a small, proud smile." },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "Please, help yourself. I think they turned out rather well." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Mmm~! Oh my gosh, these are incredible! The chocolate is still all gooey and melty inside!" },
    { speaker: null, text: "She eats three cookies in rapid succession, making little delighted humming sounds that are, frankly, unreasonably endearing." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "...You know, you could've just handed me one directly. With your fingers. Like in the romantic movies." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "That seems... unsanitary, honestly." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "Romance isn't about sanitation, Lunette! It's about the GESTURE!" },
    { speaker: null, text: "She pouts dramatically, but it dissolves almost immediately into a grin as she reaches for cookie number four. We spend the rest of the golden morning eating warm cookies and talking about nothing particularly important, and somehow it's the best morning I've had in years.", hide: true }
  ],
  next: 'scene4'
},

scene4: {
  id: 'scene4',
  name: 'Petals That Remember',
  background: 'assets/backgrounds/garden.png',
  dialogue: [
    { speaker: null, text: "The afternoon sun paints everything in watercolors. Sable takes my hand at the back door and leads me through the garden's wrought-iron gate, and I completely forget how to exhale." },
    { speaker: null, text: "It's not a garden. It's an entire world. Pathways of smooth white stone wind between flower beds that shimmer with impossible colors — blues that seem to hum, reds that whisper secrets, violets that sigh contentedly when you walk past." },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "This is... Sable, this is absolutely extraordinary." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Isn't it wonderful? The garden is the mansion's heart. It feels everything the house feels — every joy, every sadness, every quiet hope." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "The mansion... feels things? Genuinely?" },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "Of course it does! Right now it's happy — see how the roses are blooming extra wide? That means it likes you. It's never bloomed this much for any of the other companions." },
    { speaker: null, text: "A single petal drifts upward past my nose. It smells like warm sugar and childhood memories." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "The garden remembers feelings, you see. Every emotion that's ever been felt within these walls... the flowers keep it safe. Joy makes them bloom brilliantly. Sadness makes them glow softly at night, like they're keeping vigil for a broken heart." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "That's simultaneously beautiful and slightly terrifying." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "That's the mansion's whole brand! 'Beautiful and slightly terrifying.' Just like me~" },
    { speaker: null, text: "We walk in comfortable silence for a while, our footsteps soft on the white stone. The petals continue their eternal upward drift around us. Then... it happens." },
    { speaker: null, text: "The world shifts. The colors become too vivid, too saturated, too alive. The flowers begin to hum — not Sable's melody, but something far older and deeper. And then I see them.", effect: 'shake' },
    { speaker: null, text: "Hearts. Translucent, shimmering hearts blooming from the soil itself, floating upward like ethereal jellyfish in an invisible ocean. They pulse with a soft pink light and I can hear them — actually hear them — singing our names in voices made of petals and starlight.", effect: 'hearts' },
    { speaker: 'lunette', expression: 'denpa-smile', position: 'left', text: "Oh... oh, they're so beautiful. The hearts are singing to me. Can you hear them, Sable? They're whispering our names together, like a prayer..." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "Lunette? Lunette, look at me. Focus on my voice." },
    { speaker: null, text: "Sable takes both my hands firmly. Her grip is warm and solid, an anchor in a swirling sea of impossible, overwhelming beauty." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "The mansion does that sometimes — it shows you things. Beautiful things, wonderful things, but things that aren't quite... here. Not yet. Just breathe slowly and focus on my hands, okay?" },
    { speaker: null, text: "I blink hard, once, twice. The translucent hearts dissolve like soap bubbles. The humming fades to silence. The garden settles back to its regular level of gentle impossibility." },
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "I'm sorry. That was... very strange. I saw these hearts, and they were..." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "You don't need to apologize! Not even a little. The mansion only shows those visions to people it truly trusts. It's actually a huge compliment." },
    {
      speaker: null,
      text: "",
      choice: {
        prompt: "Sable is still holding your hands...",
        options: [
          { text: "Squeeze Sable's hand back", affection: 1, next: 'scene4_squeeze' },
          { text: "\"I think I'm just tired...\"", affection: 0, next: 'scene4_tired' }
        ]
      }
    }
  ]
},

scene4_squeeze: {
  id: 'scene4_squeeze',
  name: 'Petals That Remember',
  background: 'assets/backgrounds/garden.png',
  dialogue: [
    { speaker: null, text: "I squeeze Sable's hands. Not because I need an anchor anymore — but because I want to hold them. Because they're warm and soft and they feel like exactly where my hands are supposed to be." },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "Thank you. For grounding me. For... being here." },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "..." },
    { speaker: null, text: "Sable stares down at our intertwined fingers. Her cheeks flush the exact same shade as the roses surrounding us. For once in her life, she appears to have absolutely no witty comeback prepared." },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "You're... you're holding my hands. Both of them." },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "I am." },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "...On purpose? Like, deliberately and intentionally?" },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "Very much on purpose." },
    { speaker: null, text: "Around us, the garden blazes into sudden, spectacular bloom. Flowers that had been mere buds burst open in cascading waves of impossible color. Petals swirl upward in great spirals of pink and gold and silver. The very air sparkles.", effect: 'hearts' },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "The... the garden approves. Oh my gosh — look! All the roses opened at once! Every single one! That's never happened before in all the years I've lived here!" },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "Maybe it's never had a good enough reason to." },
    { speaker: null, text: "We walk the rest of the winding garden path hand in hand. Neither of us lets go. Not once.", hide: true }
  ],
  next: 'scene5'
},

scene4_tired: {
  id: 'scene4_tired',
  name: 'Petals That Remember',
  background: 'assets/backgrounds/garden.png',
  dialogue: [
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "I think I'm just tired. It's been a lot of new things all at once — the mansion, the magic, everything." },
    { speaker: null, text: "I gently withdraw my hands from Sable's. Something flickers across her face — disappointment? hurt? — but she covers it instantly with a practiced, cheerful smile." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Of course! You've only been here two days. The mansion can be incredibly overwhelming at first — believe me, I remember." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "Let's head back inside. I'll make you some chamomile tea with honey. It really helps with the... visions and things." },
    { speaker: null, text: "As we walk back toward the mansion entrance, I notice the roses around us have quietly closed their petals. Just slightly. As if the garden itself is sighing with gentle disappointment." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "Sable?" },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Hmm? What is it?" },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "...Thank you for showing me the garden. It really is the most beautiful place I've ever seen." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Anytime, Lunette. Truly, anytime at all.", hide: true }
  ],
  next: 'scene5'
},

scene5: {
  id: 'scene5',
  name: 'Rain & Ribbon',
  background: 'assets/backgrounds/library.png',
  dialogue: [
    { speaker: null, text: "Rain drums against the library's tall windows like thousands of tiny, desperate fingers. Three days into my new life at the Velvet Garden Mansion, and this is the first truly grey day." },
    { speaker: null, text: "The library feels different in the rain — cozier, more intimate. The lamplight seems warmer. The books seem to lean closer together on their shelves, as if sharing secrets." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Lunette! Perfect weather for a pillow fort!" },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "A... a what, exactly?" },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "A. Pillow. Fort. You know — blankets, cushions, fairy lights, the whole architectural marvel! Don't tell me you've never built one!" },
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "I've been in domestic service since I was sixteen. Pillow fort construction wasn't exactly covered in my professional training manual." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Then today we correct a truly grave injustice against your childhood! Gather every cushion you can find — this is a MISSION!" },
    { speaker: null, text: "What follows is perhaps the most architecturally ambitious blanket construction project in the mansion's considerable history." },
    { speaker: null, text: "Sable drags in quilts and duvets from three different rooms. I contribute crucial structural support using leather-bound encyclopedias as corner pillars. She insists on a 'grand entrance' made from a silk tablecloth." },
    { speaker: null, text: "The finished result is genuinely magnificent: a velvet-draped cavern nestled in the corner of the library, lit from within by a single strand of warm fairy lights that Sable produces from seemingly nowhere, like a magician." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Behold! A castle fit for two! Complete with mood lighting!" },
    { speaker: null, text: "We crawl inside with a stack of fairy-tale books and a plate of yesterday's leftover cookies. Rain patters rhythmically on the tall windows. The fairy lights cast a warm amber glow across everything, making the inside of our fort feel like a world unto itself." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Read to me? Please?" },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "What would you like to hear?" },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "Honestly? Anything at all. I just really like the sound of your voice. It's like... warm milk and starlight." },
    { speaker: null, text: "I open a book of old fairy tales — stories about enchanted forests and sleeping princesses and girls who befriended the moon. I read softly, letting the words fill our small blanket world." },
    { speaker: null, text: "Sable listens with her eyes closed, curled up beside me like a contented cat, her breathing slow and peaceful. Halfway through a story about a girl who wove moonbeams into ribbon, I feel a gentle weight settle against my shoulder." },
    { speaker: null, text: "She's fallen asleep. Her long black hair spills across my arm like dark water. Her face, unguarded now by teasing smiles or playful bravado, is impossibly soft. Peaceful. Vulnerable." },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "..." },
    { speaker: null, text: "My heart aches in a way I wasn't prepared for. A sudden, sharp, sweet pain. And then, rising from somewhere dark and familiar inside me, an old, unwelcome whisper:" },
    { speaker: 'lunette', expression: 'menhera-cry', position: 'left', text: "...What if she doesn't actually like me? What if I'm just... convenient? A warm body to fill an empty house?" },
    { speaker: null, text: "The thought spirals downward. I'm terribly good at this — at finding reasons to doubt kindness, at convincing myself that warmth is just loneliness wearing a friendly mask." },
    { speaker: 'lunette', expression: 'menhera-cry', position: 'left', text: "Nobody genuinely wants the clumsy elf who talks to flowers and trips over flat surfaces. She'll get tired of me eventually. She'll realize I'm too much. Too needy. Too strange. Too—" },
    { speaker: null, text: "Sable shifts in her sleep. Her hand finds mine in the tangle of blankets and holds it firmly. And then, in a voice barely above a whisper, soft as moth wings:" },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "...Lunette... stay... please stay..." },
    { speaker: null, text: "She smiles in her sleep. My name on her unconscious lips, spoken like a prayer. Like a wish made on the last star of the evening." },
    { speaker: null, text: "The dark whispers shatter like thin glass. I blink back tears that appeared from absolutely nowhere.", effect: 'shake' },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "...I'm right here, Sable. I'm not going anywhere." },
    { speaker: null, text: "I lean my head against hers and close my eyes. The rain sings its patient lullabies. The blanket fort holds firm against the world." },
    { speaker: null, text: "And for the first time in a very, very long time, I feel like I truly belong somewhere.", hide: true }
  ],
  next: 'scene6'
},

scene6: {
  id: 'scene6',
  name: 'Cracked Porcelain Hearts',
  background: 'assets/backgrounds/bedroom.png',
  dialogue: [
    { speaker: null, text: "Evening. Day five. I'm carefully carrying a tray of chamomile tea up to Sable's room when I hear it — not the mansion's usual comfortable creaks and whispers, but something rawer and more human. Someone crying." },
    { speaker: null, text: "The sound leads me to Sable's bedroom door. It's slightly ajar. Through the narrow gap, I can see her sitting on the edge of her canopy bed, knees drawn tight to her chest, her long black hair curtaining her face completely." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "Sable? May I come in?" },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "...Don't. Don't look at me right now. Please." },
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "Too late. I'm already looking. And I'm coming in." },
    { speaker: null, text: "I set the tea tray down on her vanity and sit beside her on the bed. The room is dim — heavy curtains are drawn tight, and the only light comes from a delicate lamp shaped like a crescent moon on her nightstand." },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "You should go, Lunette." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "I should. But I'm not going to." },
    { speaker: null, text: "A long, trembling silence. Then it breaks like a dam." },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "This always happens. I ALWAYS ruin it. I get too close too fast and people get scared of me because I FEEL TOO MUCH and I can't stop myself and—" },
    { speaker: null, text: "Her voice cracks like thin ice. She grips the bedsheets with white-knuckled, trembling hands.", effect: 'shake' },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "Every companion the mansion sends... they stay for a few weeks, maybe a month if I'm lucky. Then they start looking at me differently. They say I'm 'too intense.' 'Too clingy.' 'Too emotional.' And then they LEAVE." },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "You'll leave too. Everyone always leaves. I'll say something too weird or hold on too tight or cry too much and you'll look at me the way they ALL did — like I'm something broken that nobody can fix." },
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "Sable, listen to me—" },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "I KNOW I'm too much! I know I'm clingy and dramatic and I fantasize about weddings on day one and I read books upside down and I cry at EVERYTHING and I get attached too fast and—" },
    { speaker: null, text: "She's sobbing now — ugly and raw and completely real, her whole body shaking with the force of it. The crescent moon lamp flickers frantically, as if the mansion itself is trembling with her.", effect: 'shake' },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "I'm so scared, Lunette. I'm so terrified you'll leave. I'm scared because I already care about you too much and it's only been FIVE DAYS. Five days and I already can't imagine waking up in this house without you here. What is WRONG with me?!" },
    {
      speaker: null,
      text: "",
      choice: {
        prompt: "Sable is breaking down...",
        options: [
          { text: "Hug Sable tightly: \"I'm not going anywhere\"", affection: 1, next: 'scene6_hug' },
          { text: "\"Everyone feels that way sometimes\"", affection: 0, next: 'scene6_comfort' }
        ]
      }
    }
  ]
},

scene6_hug: {
  id: 'scene6_hug',
  name: 'Cracked Porcelain Hearts',
  background: 'assets/backgrounds/bedroom.png',
  dialogue: [
    { speaker: null, text: "I don't think. I don't weigh options or consider professional boundaries. I just move." },
    { speaker: null, text: "I wrap my arms around Sable and pull her close — really, truly close, tight enough that she can feel my heartbeat hammering against hers.", effect: 'shake' },
    { speaker: 'lunette', expression: 'menhera-cry', position: 'left', text: "I'm not going anywhere. Do you hear me? I am NOT going anywhere." },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "You don't know that — you can't promise—" },
    { speaker: 'lunette', expression: 'menhera-cry', position: 'left', text: "I know EXACTLY that. Because I'm the same, Sable. I'm clingy and strange and I see floating hearts that aren't there and I talk to flowers and I've spent every single night in this mansion terrified that YOU would decide I was too much." },
    { speaker: null, text: "Sable goes perfectly still in my arms." },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "You're not broken. You feel things deeply and completely and without reservation. That's not a flaw, Sable — it's the bravest, most beautiful thing I've ever witnessed in anyone." },
    { speaker: null, text: "Sable buries her face in my shoulder. I feel her tears soaking through my maid uniform, warm and real. I hold on tighter. I will never let go.", showCG: 'cg-hug' },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "...Promise me? Really, truly promise?" },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "I promise. On every single floating petal in that ridiculous, impossible, beautiful garden." },
    { speaker: null, text: "She laughs — a watery, broken, absolutely beautiful laugh — and clings to me like I'm the only solid thing left in the entire universe." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "You're... you're really, truly staying? Not leaving? Not ever?" },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "Try to get rid of me. I dare you." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Never. Never ever ever. Not in a million years." },
    { speaker: null, text: "We stay like that for a very long time, holding each other in the dim glow of the crescent moon lamp. The light steadies. The mansion exhales with palpable relief. And somewhere in the garden far below, I swear I can hear roses opening, one by one, in the dark.", hide: true }
  ],
  next: 'scene7'
},

scene6_comfort: {
  id: 'scene6_comfort',
  name: 'Cracked Porcelain Hearts',
  background: 'assets/backgrounds/bedroom.png',
  dialogue: [
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "Everyone feels that way sometimes, Sable. Worrying that you're too much, that people will leave... it's more common than you might think." },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "..." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "I get overwhelmed too. By new places, new people, new feelings. It doesn't make us broken. It makes us human. Well — elven, in my case, but the principle holds." },
    { speaker: null, text: "Sable's crying gradually slows. She wipes her reddened eyes with her oversized sweater sleeve, looking small and uncertain and nothing at all like the confident, teasing girl from this morning." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "Do you actually believe that? Or are you just saying what a good, dutiful maid is supposed to say to her employer?" },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "I'm saying what a friend says. Because that's what we are. Friends." },
    { speaker: null, text: "The word 'friend' lands between us with almost physical weight. Sable nods slowly, wiping her nose. But something subtle in her amber eyes dims — a small, hopeful light quietly going out." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "...Thank you, Lunette. Really. I think... I think I'd like to be alone for a little while, if that's okay." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "Of course. I understand. Your tea is there on the nightstand — drink it while it's warm." },
    { speaker: null, text: "I leave the room quietly and close the door behind me with a soft click. In the empty hallway, I lean against the cold wall and press my hand flat against my aching chest." },
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "...Should I have done more? Should I have said more? Should I have—", hide: true }
  ],
  next: 'scene7'
},

scene7: {
  id: 'scene7',
  name: 'The Dream Between Dreams',
  background: 'assets/backgrounds/dream-void.png',
  dialogue: [
    { speaker: null, text: "I fall asleep... and the world dissolves around me like watercolors in rain.", effect: 'glitch' },
    { speaker: null, text: "There are no walls here. No floor, no ceiling. Just an endless, breathing expanse of soft violet light, punctuated by floating fragments — torn pages from ancient books, rose petals frozen mid-drift, echoes of distant laughter preserved in shimmering amber." },
    { speaker: null, text: "The mansion is dreaming. And it has pulled me down into its dream." },
    { speaker: null, text: "A voice that is not quite a voice speaks in colors rather than words. Rose-pink syllables that bloom and fade like flowers opening and closing in fast-forward:", effect: 'shake' },
    { speaker: null, text: "\"She was alone for so long. So terribly, achingly long.\"" },
    { speaker: null, text: "Images unfold around me like an origami flower opening. I see Sable — younger, smaller, her hair shorter — reading alone in the vast library. Eating dinner at a long table set for one. Walking through the garden, talking earnestly to the roses because there is nobody else to talk to." },
    { speaker: null, text: "The mansion tried. It sent companions — helpers, friends, potential kindred spirits. But they all left eventually. Too weird, too lonely, too alive — the mansion's magic scared them, or Sable's fierce emotional intensity overwhelmed them.", effect: 'glitch' },
    { speaker: null, text: "\"We kept her garden growing through every winter. We hummed her lullabies through the walls every night. But houses are not the same as hearts. Walls cannot hold you the way arms can.\"" },
    { speaker: null, text: "Another vision: Sable crying in the bedroom, the same bedroom, the same crescent moon lamp. Over and over and over, like a wound that reopens with every departure, every goodbye, every closed door." },
    { speaker: null, text: "My chest aches so fiercely I can barely breathe." },
    { speaker: null, text: "\"And then... you came.\"", effect: 'hearts' },
    { speaker: null, text: "The visions shift and warm. Now I see myself — through the mansion's ancient, watchful eyes. Arriving at the gate, trembling and determined. Laughing with Sable in clouds of flour. Holding her hand in the sunlit garden. Reading fairy tales while she sleeps on my shoulder." },
    { speaker: null, text: "The mansion watched it all. Every moment. Every touch. Every blush." },
    { speaker: null, text: "\"Your heart hums at the same frequency as hers. Did you know that? Two instruments tuned to the same impossible, beautiful key. We have never heard such music in all our centuries.\"" },
    { speaker: null, text: "I feel it then — not a vision, but a truth. A certainty settling into my bones like warmth returning to frozen hands:", effect: 'shake' },
    { speaker: null, text: "This is not a job. This was never a job. The mansion didn't hire a maid. It called a missing piece home." },
    { speaker: null, text: "The mansion speaks one final time, its words blooming as pure golden light that fills every corner of the void:" },
    { speaker: null, text: "\"Tell her. Before the last petal falls. Tell her what your heart already knows.\"", effect: 'hearts' },
    { speaker: null, text: "I wake gasping, my pillow damp with tears I don't remember crying. Dawn light slices through the bedroom curtains like a blade of gold. My heart pounds with terrible, wonderful, crystalline clarity.", effect: 'glitch' },
    { speaker: null, text: "I know what I need to do. I know what I should have done from the very first moment she smiled at me.", hide: true }
  ],
  next: 'scene8'
},

scene8: {
  id: 'scene8',
  name: 'Starlit Confession',
  background: 'assets/backgrounds/balcony-night.png',
  dialogue: [
    { speaker: null, text: "Evening. Day seven. The sun has set and the sky is a cathedral of deepening blue." },
    { speaker: null, text: "Sable takes my hand without a word and leads me through corridors I haven't seen before, up a narrow spiral staircase, through a door half-hidden behind a velvet curtain." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "Close your eyes. And keep them closed until I tell you, okay?" },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "That's... very trusting of you, assuming I won't immediately walk into a wall." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "I'll catch you if you do. I'll always catch you." },
    { speaker: null, text: "She guides me forward with gentle, sure hands. Cool night air kisses my face. The distant sound of crystal wind chimes fills the silence." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Okay... open." },
    { speaker: null, text: "I open my eyes. And the entire world is made of stars." },
    { speaker: null, text: "We're on a high balcony I didn't know existed. Below us, the garden has transformed into something from a fairy tale — hundreds upon hundreds of bioluminescent flowers, glowing in soft blues and silvers and golds. They pulse gently, rhythmically, like synchronized heartbeats, casting rippling waves of light across the ancient stone walls of the mansion." },
    { speaker: null, text: "Above, the sky is a vast cathedral of constellations, more stars than I've ever seen, so bright and close they feel like you could reach up and pluck them like fruit." },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "Sable... this is..." },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "The garden does this on the seventh night of a new moon. Only once a month. I've been waiting... I wanted to share it with you. I wanted you to be the one who sees it with me." },
    { speaker: null, text: "We stand at the stone balcony railing, shoulders touching. The glowing flowers below cast dancing, rippling shadows across Sable's face. Her amber eyes reflect the bioluminescent light like tiny captured suns." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "Lunette... there's something I really need to say to you." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "There's something I need to say too." },
    { speaker: null, text: "We look at each other. The wind chimes sing their crystalline song. The garden pulses with patient, ancient light.", effect: 'hearts' },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "You go first. No — wait, I should go first. No — should we say it together? No, that would definitely be chaos and we'd just talk over each other." },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "Sable." },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "...Yes?" },
    {
      speaker: null,
      text: "",
      choice: {
        prompt: "This is the moment...",
        options: [
          { text: "\"Sable... I love you.\"", affection: 1, next: 'scene8_confess' },
          { text: "Wait for Sable to speak first", affection: 0, next: 'scene8_wait' }
        ]
      }
    }
  ]
},

scene8_confess: {
  id: 'scene8_confess',
  name: 'Starlit Confession',
  background: 'assets/backgrounds/balcony-night.png',
  dialogue: [
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "Sable... I love you." },
    { speaker: null, text: "Three words. They hang in the still night air like the bioluminescent petals below — glowing, fragile, impossibly, recklessly brave." },
    { speaker: null, text: "The garden below erupts. Every single flower blazes with light simultaneously, a supernova of blue and gold and pink and colors that have no names. The wind chimes ring out in a crystalline chord that sounds like joy given physical form.", effect: 'hearts' },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "You—" },
    { speaker: null, text: "Tears spill down Sable's cheeks, but she's smiling — smiling so wide and so impossibly bright that she puts every star above and every glowing flower below to absolute shame." },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "You said it first. You actually, genuinely said it first. I had a whole speech prepared — I wrote it on index cards, I practiced in the mirror — and you just went and—" },
    { speaker: null, text: "She pulls a handful of crumpled, well-worn index cards from her sweater pocket. They're covered in crossed-out lines, revised drafts, and tiny doodles of hearts in the margins." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "I love you too, Lunette. I loved you from the very first moment you knocked on my door with your trembling hands and your twitching ears and your shy, beautiful smile, and I thought, 'oh no. I'm absolutely, completely, irrevocably done for.'", showCG: 'cg-confession' },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "I didn't have flour on my nose on day one, though. That was day two." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "Shh! Don't you dare ruin my romantic confession speech with chronological accuracy!" },
    { speaker: null, text: "She takes both my hands in hers. Our fingers lace together perfectly, effortlessly, like they were always meant to fit together exactly this way." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Stay with me? Not as my maid. Not as my companion. As my... my everything? My person? My—" },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "I was never really your maid, Sable. The mansion knew that from the very start. It didn't hire a maid. It called me home." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Stupid, wonderful, meddling, romantic matchmaker mansion." },
    { speaker: null, text: "Below us, the entire garden sings with light.", hide: true }
  ],
  next: 'scene9'
},

scene8_wait: {
  id: 'scene8_wait',
  name: 'Starlit Confession',
  background: 'assets/backgrounds/balcony-night.png',
  dialogue: [
    { speaker: null, text: "I hesitate. The words are right there — sitting on the tip of my tongue, burning to be spoken — but old habit and older fear make me swallow them down." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "...Okay. I'll go first. Before I completely lose my nerve and bolt." },
    { speaker: null, text: "She takes a deep, shaking breath. Then another. She pulls a handful of crumpled index cards from her sweater pocket with trembling hands." },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "Lunette. I know it's only been a week. I know that's objectively insane and way too fast. But I've felt more genuinely alive in these seven days with you than in all the years before them combined." },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "You're kind and gentle and endearingly clumsy and you read fairy tales like they're real historical documents and you talk to the flowers and they actually LISTEN to you and—" },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "I love you. I love you so much that it genuinely scares me, and I know it's too fast and too much and too intense but I CAN'T not say it anymore! I physically can't keep it inside!" },
    { speaker: null, text: "The garden below glows brighter — not the explosive supernova of a mutual confession, but a steady, warm, patient pulse. Waiting. Hoping.", effect: 'hearts' },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "Sable, I..." },
    { speaker: null, text: "I want to say it back. Every fiber of my being screams at me to say it. But something old and fearful holds my tongue — ancient doubt, deep habit, the persistent whisper that says this is too good to be real." },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "I... care about you. So, so much. More than I've ever cared about anyone. I just need..." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "...You don't have to say it back. Not right now. I just needed you to know. I needed the words to exist in the air between us." },
    { speaker: null, text: "She smiles. It's brave and gentle and doesn't quite reach the deepest part of her amber eyes. The garden's glow steadies — warm, but waiting. Patient, but aching.", hide: true }
  ],
  next: 'scene9'
},

scene9: {
  id: 'scene9',
  name: 'The Garden Remembers',
  background: 'assets/backgrounds/garden.png',
  dialogue: [
    { speaker: null, text: "The final morning dawns golden and still." },
    { speaker: null, text: "I walk into the garden alone, guided by the mansion itself — doors swinging open before I reach them, lights flickering in gentle invitation, a warm insistence rising through the very floorboards beneath my bare feet." },
    { speaker: null, text: "The garden knows. It has always known." }
  ],
  branch: true,
  next: null
},

scene10_true: {
  id: 'scene10_true',
  name: 'Eternal Garden — True Ending',
  background: 'assets/backgrounds/garden.png',
  dialogue: [
    { speaker: null, text: "The garden is utterly, breathtakingly transformed." },
    { speaker: null, text: "Every flower, every petal, every single blade of grass glows with brilliant inner light. The roses have bloomed in colors I have no names for — colors that exist only in the deepest dreams, only in the sacred space between two hearts that beat as one." },
    { speaker: null, text: "And there, standing at the very center of it all, in a clearing ringed by impossibly tall starflowers that sway like dancers, is Sable." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "The mansion woke me up by gently but firmly tipping my entire bed sideways. Very subtle approach, honestly." },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "It dumped a glass of lukewarm water directly onto my pillow. I think our house is getting genuinely impatient with us." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "Impatient matchmaker houses! The absolute worst kind of supernatural architecture." },
    { speaker: null, text: "She extends her hand toward me. The garden holds its breath. Every flower turns toward us, watching, waiting.", effect: 'hearts' },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Dance with me?" },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "I will absolutely step on your feet. Repeatedly. You know this." },
    { speaker: 'sable', expression: 'teasing', position: 'right', text: "I know. I'm counting on it. Every bruised toe will be a love letter." },
    { speaker: null, text: "I take her hand. She pulls me close — so close I can count her eyelashes, so close I can feel her heartbeat against mine." },
    { speaker: null, text: "There's no music at first. And then there is — rising from the flowers themselves, a melody woven from rustling petals and humming stems and the soft, rhythmic pulse of a thousand bioluminescent lights breathing together." },
    { speaker: null, text: "We dance. Badly and beautifully, stumbling gloriously over each other's feet and laughing until our sides ache. The garden blazes around us, responding to every shared touch, every heartbeat, every breathless laugh. Petals spiral upward in great soaring columns of pink and gold and silver.", showCG: 'cg-ending-true', effect: 'hearts' },
    { speaker: 'sable', expression: 'denpa-smile', position: 'right', text: "Lunette... I'm never letting go of you. Not ever, not for a single moment. We'll grow ancient together in this garden and the flowers will remember our love forever and ever and ever—" },
    { speaker: 'lunette', expression: 'denpa-smile', position: 'left', text: "And our love will make the roses bloom in brand new colors that nobody has ever seen before — colors that don't exist yet because they were waiting for us—" },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Yes! Exactly! Colors that don't have names yet! We'll invent the names together, you and me!" },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "This one — this exact shade right here — will be called 'Sable's Laugh.'" },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "And that one — the soft violet — that's 'Lunette's Blush.' My favorite color in all the universe." },
    { speaker: null, text: "She cups my face in her hands, so gently, like I'm something precious and irreplaceable. Her eyes are golden galaxies. The garden sings." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "I love you. Today, and tomorrow, and every single day the garden remembers — which is forever." },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "I love you too. In every color, named and unnamed. In every petal that floats upward. In every heartbeat of this impossible, wonderful house." },
    { speaker: null, text: "The mansion hums its deep, ancient approval. Every window blazes with warm, welcoming light. Every door in every hallway swings open at once, like arms thrown wide in celebration." },
    { speaker: null, text: "And the garden — the garden that remembers all feelings ever felt — blooms with something it has never, in all its centuries, experienced before: a love so complete, so mutual, so utterly fearless that every petal on every flower opens at once in a single, synchronized burst of impossible beauty.", effect: 'hearts' },
    { speaker: null, text: "Years later, travelers will speak of the Velvet Garden Mansion with wonder hushed in their voices. 'The two who live there,' they'll whisper. 'An elf and a girl, dancing in a garden that never, ever stops blooming.'" },
    { speaker: null, text: "They're right, of course. The garden never stops blooming." },
    { speaker: null, text: "And the love never stops growing." },
    { speaker: null, text: "And so the garden remembered their love — not as petals pressed flat in a dusty book, but as something alive, something growing, something eternal. Forever and always. Together." }
  ],
  ending: { type: 'true', title: 'True Ending', subtitle: '~ Eternal Garden ~', cg: 'cg-ending-true' }
},

scene10_good: {
  id: 'scene10_good',
  name: 'Morning Light — Good Ending',
  background: 'assets/backgrounds/mansion-entrance.png',
  dialogue: [
    { speaker: null, text: "I find Sable at the mansion's grand entrance, leaning against the doorframe, watching the sunrise paint the eastern sky in gentle shades of peach and gold and rose." },
    { speaker: null, text: "She's wrapped in her favorite oversized cream sweater, her long black hair still wonderfully sleep-tousled, and when she sees me approaching, she smiles — soft and uncertain and achingly beautiful." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "Couldn't sleep either, huh?" },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "The mansion physically pushed me out of my bed. Literally. I have a bruise." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "It does that when it has strong opinions about where you should be. Usually it's right." },
    { speaker: null, text: "We stand together in the doorway, watching the light slowly change. The garden below is peaceful — not the blazing supernova of deepest mutual love, but a gentle, steady, patient glow. Warm. Hopeful. Waiting." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "Lunette... I know things between us have been... complicated. I said a lot of very intense things, and I—" },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "You said beautiful things, Sable. Every single one of them." },
    { speaker: 'sable', expression: 'blush', position: 'right', text: "...Really? You thought so?" },
    { speaker: 'lunette', expression: 'blush', position: 'left', text: "Really. I'm just... I'm slow with feelings. With big, important feelings. I need time to understand what's happening in my own heart. But I know — I know with absolute certainty — that I want to be here. With you. In this ridiculous, magical, meddling house." },
    { speaker: null, text: "Sable's amber eyes glisten in the sunrise light. She nods slowly, a real smile finally reaching the depths of her gaze.", showCG: 'cg-ending-good' },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "I'll wait. As long as you need — a week, a month, a year, a decade. The mansion has all the time in the world, and so do I. We're not going anywhere." },
    { speaker: null, text: "I reach out and take her hand. She squeezes it — gently, without desperation or fear. Just warmth. Just presence. Just 'I'm here, and I'm not leaving.'" },
    { speaker: 'lunette', expression: 'happy', position: 'left', text: "Will you show me the garden again today? Properly, from the beginning? I want to learn every single flower's name." },
    { speaker: 'sable', expression: 'happy', position: 'right', text: "Every last one. We have all the time in the world." },
    { speaker: null, text: "The sunrise crests the distant hill in a blaze of gold. Warm light floods the entrance hall, turning the crystal chandeliers into prisms that scatter tiny rainbows across every surface. The mansion sighs with deep contentment." },
    { speaker: null, text: "Some stories don't need a grand finale. Sometimes, a quiet morning together — just two people, hand in hand, watching the world wake up — is ending enough." },
    { speaker: null, text: "This is a beginning. And beginnings, I'm slowly learning, are the most beautiful part of any story." }
  ],
  ending: { type: 'good', title: 'Good Ending', subtitle: '~ Morning Light ~', cg: 'cg-ending-good' }
},

scene10_bad: {
  id: 'scene10_bad',
  name: 'Fading Ribbons — Bad Ending',
  background: 'assets/backgrounds/hallway.png',
  dialogue: [
    { speaker: null, text: "My suitcase is packed. The same battered leather suitcase I arrived with, only now it somehow feels immeasurably heavier than before." },
    { speaker: null, text: "The hallway is dimmer than I remember. The crystal chandeliers flicker with something that looks unmistakably like sadness. Even the berry-colored wallpaper seems to have lost its warm luster, fading to something pale and uncertain." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "So... you're really going." },
    { speaker: null, text: "It's not a question. Her voice is quiet and flat, emptied of its usual music." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "I think it's for the best. For both of us. I'm... I'm not what you need, Sable. Not in the way you need it. Not yet. Maybe not ever." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "You don't get to decide what I need." },
    { speaker: null, text: "Her voice is quiet. Not angry. Just... hollow. Like a bell with no clapper." },
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "I know. And I'm sorry. I got scared — of the mansion, of the magic, of the feelings, of how fast and how deeply everything moved. I'm not brave enough for this place. For you." },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "You ARE brave enough. You just don't believe it yet. Why won't you believe it?" },
    { speaker: null, text: "She reaches out, and for a terrible, hopeful moment I think she's going to grab my hand, pull me back, refuse to let me leave. But she doesn't. She just touches my sleeve — lightly, barely there, like a single petal landing on cloth." },
    { speaker: 'sable', expression: 'menhera-cry', position: 'right', text: "I won't stop you. I promised myself a long time ago that I would never trap anyone in this house. No matter how much it hurts to watch them walk away." },
    { speaker: 'lunette', expression: 'shy', position: 'left', text: "Sable, I—" },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "But I want you to know something. The door is always, always open. If you ever change your mind. If you ever want to come back, even just to visit, even just for tea. The mansion will remember you. And so will I.", showCG: 'cg-ending-bad' },
    { speaker: null, text: "I walk to the entrance hall. The grand door opens — not by itself this time. I have to push it with both hands. It resists, just slightly, just enough to notice, like a hand reluctant to let go of yours." },
    { speaker: null, text: "On the stone steps outside, I turn back one last time. Sable stands alone in the dim hallway, framed by the flickering chandeliers and the faded wallpaper. She raises one small hand in a gentle wave." },
    { speaker: null, text: "The garden is perfectly still. No floating petals today. No bioluminescent glow, no singing flowers, no impossible colors. Just ordinary flowers, being ordinary flowers, in the quiet morning light." },
    { speaker: 'lunette', expression: 'neutral', position: 'left', text: "Goodbye, Sable." },
    { speaker: 'sable', expression: 'neutral', position: 'right', text: "...See you later, Lunette." },
    { speaker: null, text: "Not 'goodbye.' 'See you later.' Even now, even in this, even with tears running silently down her face, she absolutely refuses to give up hope." },
    { speaker: null, text: "I walk down the garden path toward the gate. The roses are closed. The petals don't float. The mansion behind me is silent." },
    { speaker: null, text: "Behind me, I hear the door close. Softly. Gently. Like a whispered 'come home soon.'" },
    { speaker: null, text: "The petals still float in the garden, on some days. The mansion still hums its ancient lullaby to the empty rooms. But the warmth... the warmth went with her." }
  ],
  ending: { type: 'bad', title: 'Bad Ending', subtitle: '~ Fading Ribbons ~', cg: 'cg-ending-bad' }
}

};

function getScene(id) {
  return SCENES[id] || null;
}

function getStartScene() {
  return 'scene1';
}

function getEndingRoute(affection) {
  if (affection >= 4) return 'scene10_true';
  if (affection >= 2) return 'scene10_good';
  return 'scene10_bad';
}

function getScene9Transition(affection) {
  if (affection >= 4) {
    return [
      { speaker: null, text: "The flowers sense it — the fullness, the certainty, the love that fills every last corner of my heart like sunlight flooding a dark room. They bloom in waves of radiant, impossible color, cascading outward from where I stand like ripples spreading across a pond made of pure light.", effect: 'hearts' },
      { speaker: null, text: "The garden has never been more alive. And neither have I." },
      { speaker: null, text: "I know exactly where I need to be. I know exactly who I need to be with. I've always known." }
    ];
  } else if (affection >= 2) {
    return [
      { speaker: null, text: "The flowers glow softly around me — warmly, but not urgently. A gentle encouragement rather than a celebration. As if the garden is quietly saying, 'You're so close. Don't give up now. Keep going.'" },
      { speaker: null, text: "My heart is a complicated tangle of hope and uncertainty, courage and fear. I care for Sable — deeply, truly, more than I've cared for anyone. But do I have the courage to leap across that final, terrifying gap?" },
      { speaker: null, text: "Maybe I don't need to leap. Maybe I just need to stay, and let the garden show me the way." }
    ];
  } else {
    return [
      { speaker: null, text: "The flowers are still. Not dead — just quiet. Waiting for something I'm no longer sure I can give." },
      { speaker: null, text: "The garden remembers feelings, Sable told me. Right now, it's remembering my hesitation. My distance. My fear of feeling too much." },
      { speaker: null, text: "I think about the leather suitcase in my room. Still unpacked after a full week. Still ready to go at a moment's notice, just as I always am. Always one foot out the door.", effect: 'shake' },
      { speaker: null, text: "Some decisions, it turns out, make themselves when you're not brave enough to make them on your own." }
    ];
  }
}

function getSceneNameForSave(sceneId) {
  const scene = SCENES[sceneId];
  return scene ? scene.name : 'Unknown';
}

return {
  getScene,
  getStartScene,
  getEndingRoute,
  getScene9Transition,
  getSceneNameForSave,
  SCENES
};

})();

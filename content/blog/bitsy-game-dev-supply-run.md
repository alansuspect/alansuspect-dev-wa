---
draft: false
date: 2025-04-05
title: Bitsy game dev - Supply Run
description: Talking about my recent bitsy game
tags:
  - bitsy
  - gamedev
  - retro
  - zombies
---
![](/media/Market.png)

The last couple of [bitsy](https://www.bitsy.org/) games I've made have focused more on the design and aesthetics of the game rather than the functionality and gameplay.

That was mostly due to the types of games/stories I had opted to tell; this time I had an idea that was more limited in scope but involved different mechanics.

Given the theme of 'supermarket' I instantly had the idea of running around a supermarket in a post-apocalyptic zombie situation, as I'm sure we all would.

> Side note: you can play the game direct in your browser right here: [https://alansuspect.itch.io/supply-run](https://alansuspect.itch.io/supply-run)

In my original idea I thought about the supplies randomly appearing each time the game was played, but it's either not possible in bitsy, or far beyond my abilities. I might come back to this idea in the future, maybe even on another platform.

So for this I just created several different 'supplies' (in the game dev these are listed variously as 'fruit', 'veg', 'chips', etc but not listed in the game itself), and placed them randomly around.

Due to the design of the shelves in the supermarket I had to make the tiles that the supplies sit on non-wall tiles so the character can pick them up (which also throws out the random supply placement idea).

One thing I knew I could do in bitsy was display random text each time an action happens. So each time the character walks into a zombie the sounds the zombie makes a different. After the random action I then added a quick palette-switch-and-back to a reverse palette, to give that injured red flash.

Lastly, I wanted to add some kind of message at the end rather than just have the game end. It's fairly easy to add a variable to the text so the next step was to count each time a supply is collected and each time a zombie attacks.

![](/media/End1.png)

Once the counting variable is ready I add it to the text message at the end. Easy!

Still, it's not _super_ exciting. I then decided to try out the if/then/else to display a message based on the results.

I tried writing out the logic but it doesn't look right. Basically it checks if Attacks = 0 first, and if so then if all supplies were collected you get the congrats message. If no attacks but not all supplies were collected you get a different message. Lastly (and I was running out of time) if Attacks >= 1 you get the 'bit' message, bad luck!

![](/media/If-else.png)

And I think that's about it. I enjoyed playing with bitsy's mechanics more this time - for a simple game maker it actually allows for a lot of experimentation. [Give it a go yourself!](https://www.make.bitsy.org/)
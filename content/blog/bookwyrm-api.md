---
draft: false
date: 2026-02-13
title: Bookwyrm API
description: "Bookwyrm API integration "
tags:
  - bookwyrm
  - api
  - json
  - fetch
  - eleventy
---
Recently I set up a new page on this site to list the books I've read: [https://alansuspect.dev/books/](https://alansuspect.dev/books/)

There is probably more I could do with it but getting it working in the first place was my main concern.

I started using [Bookwyrm](https://joinbookwyrm.com/) a few years ago to track my reading, and last year switched over to my own self-hosted version so I had more control over the RSS and API feeds (mainly by using the latest version).

My instance/user sits [here](https://books.alansuspect.dev/user/read) and my read list [here](https://books.alansuspect.dev/user/read/books/read). Initially I was looking at the [RSS feed](https://books.alansuspect.dev/user/read/rss) option to import into my site but then I discovered there is also a [JSON feed](https://books.alansuspect.dev/user/read.json), which I find cleaner.

The JSON feed just gives an overview though, I knew the code would need to check the pages from 'first' to 'last' to get all the books in my list.

At this point I had to I needed to enlist the help of a code AI since JS isn't my strong suit. I've made my thoughts on AI clear elsewhere but suffice it to say it does make me feel icky to use one.

My focus was:

*   Get details from JSON feed
    
*   Follow links and references in the feed to fetch further info (e.g. use the author number to fetch author details like name, etc).
    
*   Cobble it all together to display the data on the front end
    

Here's how I did it:

In fetchBooks.js in the root of my eleventy project I start by setting up my URL as a variable I can use throughout the code:

```
const baseUrl = 'https://books.alansuspect.dev/user/read/books/read';
const shelfUrl = `${baseUrl}.json`;
```

After some error checking we find how many pages we'll have to loop through:

```
const shelfData = await shelfResponse.json();
const totalPages = new URL(shelfData.last).searchParams.get('page');
const books = [];
```

Now we have a place to put our book data once we've fetched it. Then we have a for loop to loop through the pages and grab our data:

```
for (let page = 1; page <= totalPages; page++) {
```

And finally return the data with a sort of latest:

```
return books.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
```

This gets the data, but what to do with it? I then made a new file in \_data called books.js. This code takes the book data, finds the author URL in Bookwyrm and grabs the authors data.

There are a few shortcomings to Bookwyrm's API where I can only access specific data, for example I can't access my Reading Goals or get each year's worth of read books instead of just all books.

Below are the full files in case you want to try it yourself, and if you make any improvements let me know! I'd like to see if a more experienced dev can squeeze more out of it. Also I'll probably change the code over to eleventy-fetch at some point too.

### fetchBooks.js

```
import fetch from 'node-fetch';
```

### \_data/books.js

```
import fetchBooks from '../fetchBooks.js';
```
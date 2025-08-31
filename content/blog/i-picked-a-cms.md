---
title: I picked a CMS
description: I picked a CMS
date: 2025-01-23
tags:
  - pagescms
  - github
  - eleventy
  - CMS
---
I had a spare moment yesterday \[sorry, a _what_?\] so I jumped in with the most straight-forward looking option to try out - [PagesCMS.](https://pagescms.org)

> I have no affiliation with this platform so anything positive below is sincere and I will continue to review it as I use it as my CMS.

It was actually even easier than I expected to set up, although I did go with the hosted version rather than trying to host it myself since their instructions only cover Vercel and involve setting up a database, which I don't have time to manage at this point.

For those not aware - as I wasn't a few days ago - PagesCMS connects to your GitHub account and manages the flat files you have in there before they get built. It is also completely customisable in terms of what you can choose to edit since you point the CMS to the content, it doesn't take over or try to make you do things you don't want to. You can edit posts, but also any custom post types you have and single pages as well. Saving them will update your repository and in turn trigger a build of your site if you have that set up.

Once the initial account signup process is done (via GitHub) I am presented with a dashboard where I can see my current repository, add new ones, create a new project or even add another GitHub account.

The most important thing you need to do is add a [config file](https://pagescms.org/docs/configuration/). The docs are well written and even have an 11ty example config file to get you started.

My blog is based off the eleventy-base-blog-v8 so is a little out of date and honestly at some point I plan on changing it to something homemade - but that's getting off on a tangent. The downside here is that I wrote additional pieces of text content (such as the blurb on my homepage) like this:

```
module.exports = {
    description: "I'm a web developer based in Australia. I build with Wordpress, Shopify and now also Eleventy, sometimes mixing them all together.",
}
```

But in the config file it only likes JSON for this format, so 'description' doesn't auto-populate and is uneditable. I'm not sure if this was something I did for some reason, or if v8 of the blog did this and was changed for v9.

This also goes for my About page and site meta as well; it's not an issue as I'm not planning on changing these immediately, but worth noting for future reference.

Another issue I ran into was getting my post tags working. I like the way these work in Eleventy, generating a post list for each tag and wanted to be able to edit these easily in the CMS too. After searching the GitHub issues page I came across the answer, which it turned out was also in their docs all along. Here's the important part of my config file covering the posts:

```
content:
  - name: blog
    label: Blog
    type: collection
    path: 'content/blog'
    filename: "{fields.title}.md"
    view:
      fields: [ title, description, date, tags ]
    fields:
      - name: title
        label: Title
        type: string
      - name: description
        label: Description
        type: string
      - name: date
        label: Date
        type: date        
      - name: tags
        label: Tags
        type: string
        list: true
        fields:
          - name: tag
            label: Tag
            type: string   
      - name: body
        label: Body
        type: rich-text         
```

In this config I added:

*   **'filename'** - I added this in because I like to use the title as the post slug. In Obsidian I was doing this manually in the frontmatter so it's nice to automate it. You can also use variables like {year} to build a slug.
    
*   **fields > name: tags** - this got my tags in place by using the 'list' field type. It will then repeat the fields within for each entry, so here I just have a single text field for each tag.
    

However, although this creates a nice interface for adding new tags and correctly adds the tags frontmatter to my post, the build fails each time and I cannot figure out why.

This is how the tags selection should look in the CMS, but unfortunately when I add any tags it breaks the build:

![](/media/pagescms-tags.png)

If I can get this working it will mean I can keep adding tags, the only downside is I can't see tags I've already added to reuse but I tend to write them off the cuff anyway. Also in the config you can have min/max settings to limit these options as well.

This is my first post written using PagesCMS (and that above is my first embedded image in the entire blog so fingers crossed) so we'll see how it goes, but I would like to get my tags working.

I mentioned earlier about changing my blog theme and having a functional CMS has made me think about how I want to redo that as well, but I also need to figure out what I want from this blog too.

If you are currently manually editing your markdown files for your Eleventy blog and want an easier way to handle things, give it a shot. I'll try and keep updates on using it and any issues I may run into.
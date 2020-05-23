---
title: "Getting started with turtles"
date: 2020-07-01 00:00:00
teaser_image: "/media/turtle4.jpg"
tags:
  - turtles
---
Welcome to your first turtles post. Glad you could join us in the turtle-verse. Turtles is a very simple yet powerful static site builder. Although it's main purpose is to build static webpages, theorically, you could build images, source code, ASCI art from it.

<!-- more -->

<div class="text-center">
	<img class="w-full" src="/media/turtle4.jpg">
	<span>Photo by <a href="https://unsplash.com/@cedric_frixon?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Cédric Frixon</a> on <a href="/s/photos/turtle?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>	
</div>


The basic idea is that you have markdown/frontmatter content which gets rendered down into a database.js file. Other files are simply left unprocessed and copied to your site. The generated database.js is a flat json file. The database.js is read and used in conjunction with your template to generate your static site.


## Structure

	- content/
	- site/
	- template/
	- turtles/
	- database.js
	- config.js


### content/

This is content that you add for your site. Any markdown files in here will get parsed, along with frontmatter (see example posts/my-first-post.md). All front matter and markdown files will re-generate a file called `database.js` which houses all your content in a json format. Any static files placed in here are ignored and simply copied over to your final `site/` directory. Any markdown files in `content/static` will not be added to the `database.js`. Out of the box, turtles offers `posts` but you are not limited to this. You can create your own collection types by creating a new directory, e.g. `projects/`, `blogs/`, `authors`, `pets` and then placing mardown files in that directory. It will start to show up in your database.js and you can access it anywhere in your template in a very similar fashion to the provided posts out of the box examples.


### site/

This is where your final product site ends up. If you're using Github (gh-pages) to host static sites, then you can pull in your repository and switch to that gh-page branch. This site is in the `.gitignore` for that very reason as you may not want to commit it to this repositories branch. If that isn't the case for you, then go remove site/ from `.gitignore` file.

### template/

This your site's template. Have fun with it. Out of the box, you can use ejs script anywhere. Directories can be made dynamically using paths found in your database.js. Out of the box, we use `content/posts` to generate a collection of posts into our database.js. Also notice the directory `template/{posts[].year}`. This will yield you a directory for each post year in your `site/` once the build is completed.

### turtles/

This houses some build scripts that come out of the box. You don't have to worry too much about this, but go check out schema.posts.js to get an example of how you can create additional computed fields in addition to your frontmatter. Feel free to get creative here, but it's not necessary to touch any of these files if you don't need to.

### database.js

This is a dynamically generated json file created from your `content/`

#### config.js

Lets you configure options for the build scripts behind turtles. Take a peek inside.

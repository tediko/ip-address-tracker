# Frontend Mentor - IP address tracker

![Design preview for the IP address tracker coding challenge](./design/desktop-preview.jpg)

## Table of contents

- [Overview](#overview)
  - [Intro](#intro)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Features](#features)
  - [Useful resources](#useful-resources)

## Overview

### Intro
Hello! This is my solution to [IP address tracker - Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Im surprised how much I learned from a seemingly easy challenge. I ran into problems with CORS on firefox and lost a lot of time trying to figure it out. For the first time I used webpack, environment variables and object literals. 

### The challenge

>Your challenge is to build out this IP Address Tracker app >and get it looking as close to the design as possible. To >get the IP Address locations, you'll be using the [IP >Geolocation API by IPify](https://geo.ipify.org/). To >generate the map, we recommend using [LeafletJS](https://>leafletjs.com/).
>
>You can use any tools you like to help you complete the >challenge. So if you've got something you'd like to >practice, feel free to give it a go.
>
>Your users should be able to:
>
>- View the optimal layout for each page depending on their device's screen size
>- See hover states for all interactive elements on the page
>- See their own IP address on the map on the initial page load
>- Search for any IP addresses or domains and see the key information and location

### Links

[LIVE PREVIEW](https://iptracker-tediko.netlify.app/)

[Frontend Mentor](https://www.frontendmentor.io) challenges allow you to improve your skills in a real-life workflow.

## My process

### Built with

 - Flexbox
 - SCSS
 - Javascript
 - Mobile first
 - Semantic HTML5 markup
 - Webpack

### Features

- This is first time I used webpack. More specifically i used `laravel mix` which is a wrapper for webpack and targets the 80% usecase. I didn't realize how powerful tool it is.
- Implement an `environment variable` for my *API_KEY*. This is a variable whose value is set outside the program to secure our sensitive data. I did it with serverless `Lambda functions` on netlify, so my *API_KEY* never shows up in my code and no one will steal it. 
- This is first time I used `object literals` instead of `if statement` in *Tracker.changeContent* function.  Shortly, we have an object where the keys are the conditions and the values are the responses. Then we can use the square bracket notation to select the correct value of the object from the argument passed in. This looks clean and I will definitely continue to use this.
- Added `aria-live="polite"` and `aria-atomic="true"` to my `.tracker__results-wrapper` element to expose dynamic content changes in a way that can be announced by assistive technologies after my results inner elements change content.
- I didn't like that results container with address informations cover the map and user can't do anything with that. Added button to hide that container. More useful on mobile tho.
- Implement `prefers-reduced-motion` CSS media feature which is used to detect if the user has requested that the system minimize the amount of non-essential motion it uses. Prevent animations in brief.

### Useful resources
 
- [LINK - webpack](https://laravel-mix.com/docs/6.0/what-is-mix)
- [LINK - environment variables](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa)
- [DOCS - Lambda function](https://docs.netlify.com/functions/build-with-javascript/)
- [VIDEO - How To hide API keys using netlify](https://www.youtube.com/watch?v=m2Dr4L_Ab14)
- [LINK - Object literals](https://betterprogramming.pub/dont-use-if-else-and-switch-in-javascript-use-object-literals-c54578566ba0) 
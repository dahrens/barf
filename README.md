# B.A.R.F

[![Build Status](https://travis-ci.org/dahrens/barf.svg?branch=master)](https://travis-ci.org/dahrens/barf)

This app should assist you when creating a raw feeding plan for your dog.

Have a look at the [Online Demo](https://barf.part-of.me).

It is made using [vue.js](https://vuejs.org/) and [bulma](http://bulma.io/). Thanks for this awesome tools!

![alt text](https://raw.githubusercontent.com/dahrens/barf/master/.github/screenshot-plan.png)

## Features

* Calculate the daily requirement of food based on the dogs weight, the activity
* Based on food categories.
  * `animal`
    * meat
    * stomach
    * entrails
    * bones
  * `vegetarian`
    * grains
    * fruits
    * vegetables
* Calculate the amounts for each of them per week
* Define how much you want to feed ingredients of which category in percent.
* Break down the overall amounts for the week into a plan for each day.
* Separated to the theoretic plan you can create a plan including real ingredients.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e test
npm run e2e

# run unit tests
npm run unit

# run all tests
npm test
```

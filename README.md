# FermentationTracker

When COVID-19 forced everyone into lockdown, I began to search for new hobbies that would keep me indoors. I eventually fell into the world of fermentation and created this tool to assist me in keeping track of each project I have in the works.

If you're completely unfamilar with loacto-fermentation, it involves adding salt what you want to ferment, removing air from the environment around the ferment, and then waiting for a period of time. The salt kills off harmful bacteria while the lack of oxygen creates a healthy environment for lactobacillus to grow. The lactobacillus then convert the sugars of the ferment into lactic acid, which in turn preserves the ferment. A common example of a lacto-fermented food are pickles of any type! If any part of that explanation was even mildly interesting, I highly recommend picking up "The Noma Guide to Fermentation" for further reading.

This the purpose of this app is two-fold:

Firstly, it automatically calculates the amount of salt I need to add to vegtable or fruit that is about about to be fermented, based off of the weight of the ferment and the percentage of salt desired. The percentage of salt is typically anywhere from 1.5% to 3% of weight.

Secondly, this app allows me to keep track of each project I'm currently working on as well archiving projects that have been previously completed, allowing for quick and easy reference.

## This project is hosted on Google Cloud!

You can navigate to the following link to preview the project! 

https://ferment.akennedy.info/

## Installation

In the root directory:

### `npm install`

### `npm start`

The server will start on port 5000.

Navigate to http://localhost:5000 to view in browser.

The project will load with two active projects and one archived project in the db as examples.

## Info

### Front-end

    React
    React-Boostrap
    React Router
    React-Toastify
    Date-Fns
    Font Awesome

### Back-end

    Node
    Express
    NeDB
    Axios

# myFlix-client
Client side of myFlix movie lookup app.

This **single page app** lets YOU look up movies, get the most in demand information, save your favorites, and keep coming back for more.

This is the client side of a full stack **MERN** project.

The back end for this project can be found at [flix-lookup-app](https://github.com/mrumiker/flix-lookup-app).

## Essential Features

### Main view
* Returns a list of ALL movies to the user (each listed item with an image, title, and description)
* Sorting and filtering
* Ability to select a movie for more details
### Single movie view
* Returns data (description, genre, director, image) about a single movie to the user
* Allows users to add or delete a movie from their list of favorites
### Login view
* Allows users to log in with a username and password
* Registration view
* Allows new users to register (username, password, email, birthday)
### Genre view
* Returns data about a genre, with a name and description
* Displays example movies
### Director view
* Returns data about a director (name, bio, birth year, death year)
* Displays example movies
### Profile view
* Allows users to update their user info (username, password, email, date of birth)
* Allows existing users to deregister
* Displays favorite movies
* Allows users to remove a movie from their list of favorites

## Built with:
* React
* React Redux
* Bootstrap

## Try it out
### Install Dependencies
```npm install```
### Build app
You will need to [install parcel-bundler](https://parceljs.org/getting_started.html) first.
```parcel [path to index.html]```
### Run on your Web Browser
```http://localhost:1234```

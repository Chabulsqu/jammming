# Jammming App 
<font size="3"> **Search for all kinds of songs and save your favourite ones directly into playlists without actually opening Spotify** </font>



## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the Project](#running-the-project)
- [Usage](#usage)
- [Contributing](#contributing)
  - [Issues](#issues)
  - [Additional Features](#additional-features)

## Introduction

The purpose of this App is to exercise several JavaScript skills while also learning Authentication, the original project (from Codecademy) used a simpler, unsafer method to authenticate the user to Spotify (Implicit Grant) while I used an also client-sided but more recommended method to do so (Authorization Code PKCE). The user needs to grant permission to modify private playlists in his Spotify account so the songs can be saved automatically. While this application is pretty useless (unless Spotify Web works slow for you) it's a pretty complete way to use the API's GET and POST requests.

## Features

1. The user can search for any song he wants, and the Spotify API will give him different results depending on his taste.
2. The user can add songs from the Search Bar to his playlists.
3. The user can also name his playlist whatever he wants.
4. The user can save the playlists he created to his Spotify account.

## Getting Started

If you want to have a quick glimpse at the site you can check its [production version on Netlify](https://jammming-fain.netlify.app). However, if you wish to run it on your machine, follow these instructions.

### Prerequisites
You need to have [Node](https://nodejs.org/en) installed on your computer, I recommend installing the LTS or current packages. Once you install Node you will be able to use [NPM](https://www.npmjs.com) (Node Package Manager), if you wish to ensure you have successfully installed NPM, run the `npm -v` command in your terminal and it should tell you which version of NPM you are using, you can also update to a newer version of NPM using the command `npm install npm -g`. To execute any of these commands use your OS terminal (in Linux and macOS) or try with any Text Editor terminal (like the VS Code one).

### Running the project
If you are using NPM run the command `npm install` or `npm i` while when using Yarn (anything below version 2) you can just use `yarn`. 
\
You can use the command `npm run dev` to run the developer version of the project or use `npm run build` to create a production version of the project in the /dist folder and access it with `npm run preview`; when using Yarn the commands are the same but with prefix changes (`yarn run dev`, `yarn run build`, `yarn run preview`). You can tweak the Vite settings (on vite.config.js) as much as you like, but be sure to leave the react and mkcert plugins for the project to work correctly. \
**Important Note:** As one of the Window methods used in the project requires a safe environment, be sure to be in https://localhost:\<port> and not in http://localhost, or else it won't work.

## Usage

The project was made using the following libraries (among others):
* React v18: The entire project is built on top of it, not much to say.
* CSS inline styling: Aside from src/index.css, all the rest of the styles are applied via specific CSS rules applied to each element using their `style`property.
* Vite: This project has been one of the first ones I made with Vite and I feel it is a way more compelling tool than other tools like CRA (Create React App). It also allows for the use of plugins like Vite, which has helped me a lot during the realization of this project, when needing to run `window.crypto.subtle.digest` on a secure Localhost environment (HTTPS).


### Testing
Currently, the project should test for the following files and components, **these tests haven't been implemented on Jest yet due to vulnerabilities linked to the package**:

**Spotify.js**
1. The Spotify API correctly authorizes the user if he doesn't have the necessary code verifier. This is done with the authenticate function from Spotify.js.
2. The Spotify API correctly authorizes the user if he doesn't have the necessary access token. This is done with the authenticate and getAccessToken functions from Spotify.js.
3. If the accessToken is expired it should correctly re-authenticate the user.

**Playlist**
1. The Playlist component should re-render every time `setPlaylistTracks` is called and render the `playlistTracks` under one `Tracklist` component.
2. If the user already has a token, Playlist should call the searchTracks function in Spotify.js with `accessToken`, `inputValue`, `playlistTracks` as its parameters.
3. When calling the handleSave event handler, the borders should turn red and show an error message when no tracks are given.
4. When calling the handleSave event handler with 1 or more tracks it should reset the `inputValue` and `playlistTracks`.
5. When calling the handleSave event handler, the "Save To Spotify" button should be unfocused.

**SearchBar**
1. If the user already has a token, the handleSubmit event handler should call the searchTracks function in Spotify.js with its state's `searchValue` as the only parameter. If the response is successful it should call setError(false).
2. If the handleSubmit event handler us is called with only whitespace and/or quotes, it should show an error message and the `<input>` should turn red.
3. If the handleSubmit event handler receives an invalid response from searchTracks it should call setError([true, errorMessage]).

**SearchResults**
1. The SearchResults component should re-render every time `setTracks` is called and render the `tracks` under one `Tracklist` component.

**Tracklist**
1. The Tracklist component should render tracks or playlistTracks depending on the icon it is given as a prop.

**Track**
1. The track component should render a `<img>` tag with a `src` property depending on the icon prop it is given.
2. The track component should render the appropriate song data given its different props.
3. When the handleClick event handler is triggered in a SearchResults grandchild, it should add that track to playlistTracks.
4. When the handleClick event handler is triggered in a Playlist grandchild, it should remove that song from playlistTracks.

## Contributing

Although the project works well, it has some bugs and/or details that could be added and I'd be glad for anyone that wants to work on it and improve its functionality past the project requirements given by Codecademy.

### Issues
* Refreshing Token: When sending a POST request to Spotify to refresh the token, I need to use the Client Secret in the "Authorization" header of the request (which I won't expose on a public app) so even when I used client-side authenticating for the rest of the app I will probably need something else to work on that bug.
* Playlist description error: The playlist description ("Made using Jammming App by Mateo Fain.") sometimes won't update correctly on Spotify. I was not able to identify the cause of this bug and anyone that wants to help with it will be gladly received.

### Additional Features

Although the original project doesn't require them, there are a couple of features it would be nice for the project to have, here you can find each one of them and their technical documents and how I implemented them. If you want to contribute to adding new features, feel free to do so via pull requests (see how to write a good pull request [here](https://www.danijelavrzan.com/posts/2023/02/create-pull-request/)).

* **Error Messages:** Provide feedback for errors committed by the user as well as a fallback for API errors. Its technical document contains its description, background, technical design and caveats.
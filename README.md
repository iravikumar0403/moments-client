# moments

<h3>A social media web app.</h3>

[![Netlify Status](https://api.netlify.com/api/v1/badges/1c0e597a-b181-41c7-b966-683c9ad7e897/deploy-status)](https://app.netlify.com/sites/moments-social/deploys)


## Table of Contents

- [Getting Started](#getting-started)
- [Live link](#live-link)
- [About](#about)
- [Technologies used](#-technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Connect with me](#-connect-with-me)

## Getting Started

- Clone the repository on your local machine with the command below in your terminal, and cd into the **moments-client** folder

```sh
https://github.com/ravikumar0403/moments-client.git

cd moments-client
```

- Install dependencies (if you are using **yarn** then do with that)

```sh
npm install
```

- Create a `.env` file in the root directory (at the level of `package.json`) and create a environment variables

```
REACT_APP_API_URL = <BACKEND_ENDPOINT>
REACT_APP_CLOUD_NAME = <YOUR_CLOUD_NAME_FROM_CLOUDINARY>
REACT_APP_UPLOAD_PRESET = <YOUR_UPLOAD_PRESET>
```

- Start the server

```
npm start
```

## Live link

https://moments-social.netlify.app/

## About

- moments is a social media web app for people to connect with each other.
- Users can share pictures and GIFs with others, upload, like, comment, and bookmark the posts. Follow each other and be connected.

## 🛠 Technologies used

#### Frontend
- ReactJS
- Redux Toolkit
- React Router
- Tailwind

#### [Backend](https://github.com/ravikumar0403/moments-api/tree/alpha-v1)
- Node.js
- Express
- MongoDB
- Mongoose

Backend Repository: https://github.com/ravikumar0403/moments-api/tree/alpha-v1

## Features

**User/Home Feed**:

- User will able to see all his posts and post of the people he/she follow.
- Feed can be sort based on `latest first`, `oldest first` and `trending` posts.
- User/Home feed has `infinite scroll`.

**Explore Feed**

- All the new users posts will be shown over here.
- Explore feed has `infinite scroll`

**Post**

- User can `create`, `like/unlike` `edit`, `delete`, and `bookmark` a post.
- Each post can be viewed on single page where user can add a `comment`.
- Post can consist of text, image or gifs.

**Profile**

- User can view their profile or any other users profile.
- Each user can edit their profile.
- User can follow someone by visiting their profile.

**Authentication**

- moments has login, signup and logout feature.
- A new user can also login using test credentials.
- For Signup and login, form validation is done for all the fields.

**Dark mode**

- Has light and dark mode.

## Screenshots


## 👨‍💻 Connect with me

<a href="https://twitter.com/ravikumar0403"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"/></a>
<a href="https://www.linkedin.com/in/ravikumar0403/"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/></a>

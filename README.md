# VideoApp
The VideoApp - an application that helps you with creating and storing your personal video list

## About
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.  
License: [ISC](https://choosealicense.com/licenses/isc/).  
It uses local storage, YouTube API and Vimeo API.  
Demo -> [VideoApp](https://zibih.github.io/VideoApp/#/)

## Run Locally
1) **Clone the project**

```bash
  git clone https://github.com/ZibiH/VideoApp.git
```

or fork it and then use your own link

2) **Go to the project directory**

```bash
  cd video-app
```

3) **Install dependencies**

```bash
  npm install
```

4) **Environment Variables**

To make the most of this project, you will need to replace the following environment variables in `src/environments/environment.ts` file:

- YOUTUBE_API_KEY
- VIMEO_CLIENT_ID
- VIMEO_CLIENT_SECRET

  with your own credentials.

More informations about how to get these credentials you can find here:

- [YOUTUBE API](https://developers.google.com/youtube/v3/getting-started)
- [VIMEO API](https://developer.vimeo.com/api/guides/start#generate-access-token)

Without providing credentials the use of the VideoApp is limited and alows you to upload and work with the default video list - check the [Features](#features) section

5) **Start the server**

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

You can also run a local server. Run `npm run server` and navigate to `http://localhost:5000/videos` to check the default video list.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Features
- Add video to list by url or id - works with public YouTube and Vimeo videos

  ![imgur](https://i.imgur.com/v4DXy2s.png)

- Sort the video list by: view count, like count, add to base date

  ![Imgur](https://i.imgur.com/EAojpoU.png)

- Add to favorites and show favorites only

  ![Imgur](https://i.imgur.com/nkk29jk.png)

- Change display style: list or tiles

  ![Imgur](https://i.imgur.com/dZQ4aVe.png)

- Delete video from list
- Delete all videos

  ![Imgur](https://i.imgur.com/ENh1dkE.png)

- Upload demo (the default video list) - only available when the video list is empty

  ![Imgur](https://i.imgur.com/xW4C4hI.png)

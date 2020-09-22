# Express Boilerplate

This is some boilerplate code that'll be used for starting new express projects

## Set-up

Complete these steps to configure your "new proj"

1. clone this repo to your machine with `git clone BOILERPLATE-URL NEW-PROJECT-NAME`
2. `cd` into the cloned repo
3. make a fresh start of the git history `rm -rf .git && git init`
4. install your node dependencies with `npm install`
5. move the example environment file to `.env` that'll get .gitignored and read by the express server `mv example.env .env`
6. edit the contents of `package.json` to use your NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

start with `npm start`

start nodemon for the app with `npm run dev`

run your tests with `npm test`

## Deploying

when you're ready to deploy, add a new Heroku application with `heroku create`.  This will make a new git remote called "heroku" and you can then `npm run deploy` to push to this remote's master branch.
# Tweetrics

Gain insights on individual twitter accounts using lexical analysis.

## Team

  - Guillaume Choupeaux
  - Jonathan Kim
  - Matthew Palamos
  - Yessengerey Bolatov

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
    1. [Developer Requirements](#developer-requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

## Usage

Checkout the app at https://tweetrics.herokuapp.com

Input a Twitter username of a person on whom you'd like to gain some insight. The app will retrieve some information about that Twitter account such as tweets, friends, mentions and etc using Twitter API and then perform a lexical analysis of tweets using Google Cloud Natural Language API. Based on the analysis of tweets and analysis of friends performed by our app, the app will estimate how influenced the given person is by the two political parties: Democrat and Republican.

## Requirements

### Developer Requirements

config.js file with:

- Twitter API key
- Google Cloud Natural Language API key
- MongoDB uri
- Heroku Account

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
npm run react-dev (webpack -d --watch)
npm run server-dev (nodemon server/server.js)
```

### Roadmap

View the project roadmap [here](https://docs.google.com/spreadsheets/d/1DDk2VbJyoYA3AtEJKZARK62inANgrycThp2gscf3SHY/edit?usp=sharing)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

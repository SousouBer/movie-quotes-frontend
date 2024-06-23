<div>
	<h1 align="center">Movie Quotes</h1>
</div>

Welcome to Movie Quotes!

This application allows you to manage a collection of your favorite movies and their memorable quotes.

You can register, log in, and explore the app. Additionally, you have the option to log in using your Google account through Laravel Socialite. The application also supports password resets and email verification to ensure secure access to your account. Once logged in, you will be redirected to the news feed page. Here, you can view all the quotes shared by other users, along with their details, images, and comments. You can see the number of likes and comments each quote has received. What's more, you can like, unlike, or comment on any quote, with real-time notifications informing users when their quotes receive interactions.

You can add information about movies, including details and images, and attach quotes to them. These will then be visible on the news feed for others to enjoy. Additionally, you can edit and delete both movies and quotes, giving you full control over your contributions.

The application is bilingual, supporting both English and Georgian, so you can use it in the language you prefer.

Users can also edit their profile details, such as their image, username, and password. The user-friendly interface ensures a smooth experience as you personalize your profile and engage with the community.

We are confident that you will have a good time using Movie Quotes and make meaningful connections along the way. Dive in and start sharing your favorite movie moments with others!

#

### Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Resources](#resources)

#

### Prerequisites

- _npm@10 and up_
- _NodeJS@18 and up_

#

### Tech Stack

- [Vue@3](https://vuejs.org/) - Front-end Framework.
- [Pinia@2.1.7](https://pinia.vuejs.org/) - Package for store management.
- [Tailwind@3.4.3](https://tailwindcss.com/) - CSS Framework for styles.
- [Vue i18n](https://vue-i18n.intlify.dev/) - Vue.js plugin for localization.
- [Laravel Echo](https://laravel.com/docs/10.x/broadcasting#client-side-installation) - Javascript package for real-time notifications.

#

### Getting Started

1\. At first, you need to clone Front-end Movie Quotes Application repository from github:

```sh
git clone git@github.com:RedberryInternship/movie-quotes-front-soso-beriashvili.git
```

2\. Having done that, run _npm install_ in order to install all the JavaScript dependencies:

```sh
npm install
```

and then:

```sh
npm run dev
```

in order to build your JS/CS resources.

3\. Now set your env file. Go to the root of your project and execute the following command.

```sh
cp .env.example .env
```

And add the following lines of code in your .env, depending on your environment and pusher account details:

> VITE_API_BASE_URL=

> VITE_API_GOOGLE_AUTH=

> VIE_API_SESSION_DOMAIN=

> VITE_APP_PUSHER_APP_KEY

> VITE_APP_PUSHER_APP_CLUSTER=

### Development

And finally, to run the development server, run the following command:

```sh
  npm run dev
```

### And that is it for setting up the Front-end part of the Movie Quotes' application!

#

### Resources

- [Detailed description of the project](https://redberry.gitbook.io/assignment-v-movie-quotes-upgraded/platpormis-gverdebi/pilmebi/pilmebis-sia)
- [Figma design of the project](https://www.figma.com/file/5uMXCg3itJwpzh9cVIK3hA/Movie-Quotes-Bootcamp-assignment?node-id=0%3A1)

Sanity + Vue.js frontend example
=== 

This is an example [Sanity](https://www.sanity.io) powered frontend for the movie dataset using [Vue.js](https://vuejs.org/).

## Prerequisites
You will need [Node.js](https://nodejs.org) version 6.0 or greater installed on your system.

## Setup

Get the code by either cloning this repository using git

    > git clone https://github.com/sanity-io/example-frontend-vue-js.git

... or [downloading source code](https://github.com/sanity-io/example-frontend-vue-js/archive/master.zip) code as a zip archive.

Once downloaded, open the terminal in the project directory, and continue with:

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Configuring Sanity
If you're running your own Sanity project with the example movie dataset and feel like running this example with your own data, go to `src/sanity.js` and change the following two lines:

```
projectId: 'YOUR_PROJECT_ID',
dataset: 'YOUR_DATASET_NAME' <-- 'production' if you just went with the default
```

You can locate the ID of your project in the header of the [management page for your project](https://manage.sanity.io/).
You also need to enable `localhost:8080` in your CORS Origins settings! Either through the [management page](https://manage.sanity.io/) under `settings` or by running this in the project folder you set up with `sanity init`:

  > sanity cors add http://localhost:8080

For a more detailed explanation on how this example works, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

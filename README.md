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

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

If you're running your own Sanity project with the example movie dataset and want to run this example against your own data, go to `src/sanity.js` and change the following lines:

```
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'NAME_OF_YOUR_DATASET' <-- 'production' if you just went with the default
```

You can locate the ID of your project in the header of the [management page for your project](https://manage.sanity.io/)

Also – remember to enable `localhost:3000` in your CORS Origins settings, just run this in the folder you set up with `sanity init`:

    > sanity cors add http://localhost:3000

For a more detailed explanation on how this example works, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

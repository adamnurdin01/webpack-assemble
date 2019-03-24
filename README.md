# Webpack Assemble Starter Kit

Customize from [wbkd](https://github.com/wbkd/webpack-starter) and [assemble-webpack-loader](https://github.com/conechan/assemble-webpack-loader) 


### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build
```

### Features:

* ES6 Support via [babel](https://babeljs.io/) (v7)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)
* Webpack Assemble [assemble-webpack-loader](https://github.com/conechan/assemble-webpack-loader)

When you run `npm run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.

### How to add pages:
* Open webpack/webpack.common.js
* Add page list in array "['index','about','pagename']"
* Add hbs file in "src/html/pages/pagename.hbs"
* Add json file in "src/json/pagename.json"


### Credit:
* Webpack Starter Kit [wbkd](https://github.com/wbkd/webpack-starter)
* Webpack Assemble [assemble-webpack-loader](https://github.com/conechan/assemble-webpack-loader)
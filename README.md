# React microfrontends in single-spa

## What is this?
This is an example demo application that serves to demonstrate building microfrontend applications using [single-spa](https://single-spa.js.org/) framework.

## Quick start

```bash
git clone https://github.com/SzymonMakula/microfront-react-demo.git
cd microfrontend-react-demo/package/shell
npm i
npm start
navigate to http://localhost:9000
```

# How does it work?

I won't go over the low level details of how such application works, but I will provide explanations of project's structure and it's general functionality.
For more thorough explanation, please consult [singla-spa-documentation](https://single-spa.js.org/docs/getting-started-overview).

**In general, this project consists of 6 different applications:**
- 4 microfrontend React applications
- Shell application - container and entry point for all other applications.
- Styleguide - application that exports css files, react components, styled components and other style-related objects to all other microfrontends

## Shell

Shell serves as the main container for all other microfrontend applications. Inside it, there's a single `.ejs` file, that serves as a `html` file for
the entire application. At the beginning of the file we find this line:

```html
  <script type="systemjs-importmap" src="./import-map.js"></script>
```
Since we're referencing file from a local repository, this is equivalent to:

```html
  <script type="systemjs-importmap">
    {
    "imports": {
        "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js",
        "react": "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js",
        "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js",
        "react-is": "https://unpkg.com/react-is@16.13.1/umd/react-is.production.min.js",
        "styled-components": "https://unpkg.com/styled-components@5.3.5/dist/styled-components.min.js",
        "@mb/navbar": "//localhost:9000/cdn_mock/navbar/mb-navbar.js",
        "@mb/pokemons": "//localhost:9000/cdn_mock/pokemons/mb-pokemons.js",
        "@mb/cats": "//localhost:9000/cdn_mock/cats/mb-cats.js",
        "@mb/dad_jokes": "//localhost:9000/cdn_mock/dad_jokes/mb-dad_jokes.js",
        "@mb/styleguide": "//localhost:9000/cdn_mock/styleguide/mb-styleguide.js"
    }
}
</script>
```
This is what's called an `import map`. This is a new js feature and it is yet not supported by any major browser. The **single-spa** uses **systemjs**
as a polyfill. What import map does, is that it maps imported module names, represented as keys, to a an URL, represented as value, that contains
given module. This let's us declare shared modules across the entire application. For that matter, `react`, `react-dom`, `styled-components` for example,
can be referrenced by any application running inside this container, and those applications don't have to, for example, declare `styled-components` inside
their `package.json` to be able to use them.

Please note that those modules are what's called a browser module and is different from a build time module. If one would like to use build-time modules,
`module-federation` can be combined with `single-spa` for that purpose.

Normally, all the `microfrontend applications`, `styleguides` and `import-map` are hosted at some CDN or other known source. For simnplicity, 
this project has them in `shell`'s public folder, so that they might be referrenced locally.

Usually, one would develop only one microfrontend at the time, and for that reason, `local importmap override` was provided:
```html
 <% if (isLocal) { %>
  <script type="systemjs-importmap">
    {
      "imports": {
        "@single-spa/welcome": "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js",
        "@mb/root-config": "//localhost:9000/mb-root-config.js",
        "@mb/navbar": "//localhost:8080/mb-navbar.js",
      }
    }
  </script>
  <% } %>
```
We can declare which import map should be overriden, and we override that with localy hosted microfrontend's URL. All the other microfrontends
are then still downloaded from some remote production source, letting use develop particular microfrontend in isolation.

Another important file is `microfrontend-layout.html`:

```html
<single-spa-router>
      <div id="root">
      <nav class="main-navbar">
        <application name="@mb/navbar"></application>
      </nav>
      <main>
        <route default>
        <application name="@mb/pokemons"></application>
        <application name="@mb/cats"></application>
      </route>
      <route path="dad_jokes">
        <application name="@mb/dad_jokes"></application>
      </route>
      </main>
  </div>
  </route>
</single-spa-router>
```
This file works similar to `react-router`, letting us map various routes to different applications. Note that the applications' names correspond
to import names in `import map`. You can even use DOM elements here, and they will either belong to particular path, or serve as a wrapper around them.
Those routes are then constructed and help register applications in `mb-root-config.ts`. 

```js
//mb-root-config.ts
const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });
```
## Styleguide
This is a utlity application. It let's you declare shared `.css` files, `react-components` and `themes`. For example, we can create a react button:

```js
//button.tsx
export default function Button(props) {
    const {children, className = "", disabled = false, ...rest} = props
  return (
    <StyledButton className={className} disabled={disabled} {...rest}>{children}</StyledButton>
  )
}
```
And then, inside root file `mb-styleguide.tsx` (file, that will be served for `@mb/styleguide` in `importmap`), we get:
```js
//mb-styleguide.tsx
export {default as Button} from "./components/button"
```
We just exported a react-component! Then, in microfrontend application, we can do:
```js
// front-cats/src/root-component.tsx
import {Loader, Button, InvertedButton} from "@mb/styleguide"

// snip snip

return  (
    <div className="container h-full w-screen flex flex-col items-center justify-start">
      <div className="flex flex-row my-16">
        <Button onClick={fetchACat} className="w-80 text-2xl my-16 mx-4" >Fetch a cat</Button>
        <InvertedButton onClick={clear} className="w-80 text-2xl my-16" >Clear</InvertedButton>
        
// snip snip
```
And use it as a normal react component! Note that in this scenario, you will need to have `shell` application running, as otherwise, you will be unable
to resolve `@mb/styleguide`. Either that, or somehow get a copy of `styleguide` for local development. And that leaves us with..

## React microfrontends

Now those applications are pretty similar to applications made with `create-react-app`, with the difference being not having an an `index.html` file
and application entry point looking like this:
```js
// front-cats/src/mb-cats.tsx

import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
```
This kind of application may be run with `npm start`, which would start serving a javascript file at URL like `localhost:8080/mb-cats.js`.
Inside `shell`, we can then go to local `import-map` and override `@mb/cats`URL with our local `localhost:8080/mb-cats.js`. Now `shell` application
will use that local version of out microfrontend at specified path.

One last thing to cover is shared dependencies. In this repository, `react` and `react-dom` are already a shared dependency. Notice that `styled-components`
are also a shared dependency. We can see benefit of that in `front-pokemons` and `front-navbar` repositories. Inside them, as you'll observe,
`node_modules` and `package.json` are devoid of `styled-components`. Instead, inside `webpack.config.js` we declare `styled-components` as external
dependency:
```js
// webpack.config.js

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mb",
    projectName: "navbar",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: ["styled-components"],
    // modify the webpack config however you'd like to by adding to this object
  });
};
```
This way, webpack doesn't search for `styled-components` inside our `node_modules` at build time, trusting us that this package will be already
available to the client.





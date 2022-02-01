## Run dev server
```bash
npm run dev
```

## Style flickers (ServerStyleSheet)
When the styles are only rendered client-side, you first see the content without style before it flickers to style.
In Next.js you need to hook the `ServerStyleSheet` up to the `getInitialProps` hook.
That will wait until that method has been resolved before it sends the data off from the server to the browser.

Put it at the top of `_document.js`:
```js
static getInitialProps({ renderPage }) {
const sheet = new ServerStyleSheet();
const page = renderPage(
  (App) => (props) => sheet.collectStyles(<App {...props} />)
);
const styleTags = sheet.getStyleElement();
return { ...page, styleTags };
}
```

## Progress bar
Show progress bar at top of the screen when clicking a link.
Use `NProgress`, see top part of `_app.js`.

## Errors

#### Server / client mismatch
Something is different between the server and the client
```
Warning: ... did not match. Server: ... Client: ...
```
In the case of `className did not match`, you should probably implement the style flickers solution written above.
Remove the `.next` (cache) folder if there are no changes.

## Apollo
A `provider` in React is a component that usually lives very high in your application.
It allows components that are several levels deep to access data.
The Apollo client is at an application level, so that anywhere you can fetch data from it.

In `_app.js` we wrap the whole application in the `ApolloProvider`.

// 6:22
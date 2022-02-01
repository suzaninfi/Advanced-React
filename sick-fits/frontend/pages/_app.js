import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

// unfortunately kinda boilerplatey
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  // withData gives the initial props to the components
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // allows us to get any query variables available at a page level
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);

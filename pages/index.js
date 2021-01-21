import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

// For our static site generation, we do this:
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };

  // Note: instead of the file system, we could fetch post data from an external
  // API endpoint
  // count res = await fetch('..url..')
  // return res.json();

  // We could also query the database directly:
  // at the top: import someDatabaseSDK from 'someDatabaseSDK';
  // at the top: const databaseClient = someDatabaseSDK.createClient(...)
  // in here:
  // return databaseClient.query('SELECT posts...')''

  // This is possible because getStaticProps only runs on the server-side.

  // Development vs Production: In development (npm run dev or yarn dev),
  // `getStaticProps` runs on every request. In production, `getStaticProps`
  // runs at build time. However, this behavior can be enhanced using the
  // fallback key returned by `getStaticPaths`. Because it’s meant to be run at
  // build time, you won’t be able to use data that’s only available during
  // request time, such as query parameters or HTTP headers.
}

// For server-side rendering, where data is fetched and the page is generated at
// request time, we would do this:
/*
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
*/
// Because `getServerSideProps` is called at request time, its parameter
// (`context`) contains request specific parameters.

// You should use `getServerSideProps` only if you need to pre-render a page
// whose data must be fetched at request time. Time to first byte (TTFB) will
// be slower than `getStaticProps` because the server must compute the result on
// every request, and the result cannot be cached by a CDN without extra
// configuration.

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      {/* Picture and description */}
      <section className={utilStyles.headingMd}>
        <p>I like to run around learning things.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      {/* List of posts */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

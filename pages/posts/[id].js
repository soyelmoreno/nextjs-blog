import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

/**
 * Fetch necessary data (and return it as props) to render the post with the
 * given id.
 */
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  };
}

/** Return the list of file names (excluding .md) in the posts directory */
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>
          {postData.title} | {siteTitle}
        </title>
      </Head>
      <h1>{postData.title}</h1>
      <h2>
        {postData.id} - {postData.date}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { Head } from 'next/document';
import Link from 'next/link';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  console.log(postsPagination);

  return (
    <>
      {/* <Head>Teste</Head> */}
      <main>
        <div>
          {postsPagination.results.map(post => (
            <Link href={`/post/${post.uid}`}>
              <a key={post.uid}>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <div>
                  <time>{post.first_publication_date}</time>
                  <p>{post.data.author}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts');

  // console.log(postsResponse);

  return {
    props: {
      postsPagination: postsResponse,
    },
  };
};

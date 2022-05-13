/* eslint-disable react/no-danger */
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: {
        text: string;
      }[];
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Carregando...</h1>;
  }

  const formattedDate = format(
    new Date(post.first_publication_date),
    'dd MMM yyyy',
    {
      locale: ptBR,
    }
  );

  return (
    <>
      <div className={styles.banner}>
        <img src={post.data.banner.url} alt="Banner" />
      </div>
      <main className={styles.container}>
        <div className={styles.post}>
          <h1>{post.data.title}</h1>
          <div className={styles.bottomInfo}>
            <time>
              <FiCalendar size={20} />
              {formattedDate}
            </time>
            <p>
              <FiUser size={20} />
              {post.data.author}
            </p>
            <p>
              <FiClock size={20} /> 4 min
            </p>
          </div>

          {post.data.content.map(content => (
            <article key={content.heading} className={styles.postContent}>
              <h2>{content.heading.map(heading => heading.text)}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body.map(body => body)),
                }}
              />
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});
  const { slug } = params;
  const response = await prismic.getByUID('posts', String(slug));

  return {
    props: {
      post: response,
    },
  };
};

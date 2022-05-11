import { AppProps } from 'next/app';
import Link from 'next/link';
import { PrismicProvider } from '@prismicio/react';
import { PrismicPreview } from '@prismicio/next';
import { linkResolver, repoName } from '../../prismicio.js';

import '../styles/globals.scss';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repoName}>
        <Header />
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  );
}

export default MyApp;

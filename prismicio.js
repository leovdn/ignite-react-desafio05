/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

import sm from './sm.json';

export const endpoint = sm.apiEndpoint;
export const repoName = prismic.getRepositoryName(endpoint);

export function linkResolver(doc) {
  switch (doc.type) {
    case 'homepage':
      return '/';
    case 'page':
      return `/${doc.uid}`;
    default:
      return null;
  }
}

export function createClient(config = {}) {
  const client = prismic.createClient(endpoint, {
    ...config,
  });

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
}

/**
 * Asynchronously loads the component for NotFoundPage
 */
import loadable from '@loadable/component';

import LoadingIndicator from '../../components/LoadingIndicator';

export default loadable(() => import('./index'), {
  fallback: LoadingIndicator,
  ssr: false,
});

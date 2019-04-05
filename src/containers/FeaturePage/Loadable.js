/**
 * Asynchronously loads the component for FeaturePage
 */
import loadable from '@loadable/component';

import LoadingIndicator from '../../components/LoadingIndicator';

export default loadable(() => import('./index'), {
  fallback: LoadingIndicator,
  ssr: false,
});

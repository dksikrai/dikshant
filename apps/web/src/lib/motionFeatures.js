// Framer Motion's feature set, loaded asynchronously by <LazyMotion> in App.jsx so it stays
// off the critical path. domMax = animations + gestures + layout (layoutId) animations.
import { domMax } from 'framer-motion';

export default domMax;

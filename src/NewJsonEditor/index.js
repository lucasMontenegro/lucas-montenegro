import { combineReducers } from 'redux';
import { reducer as canvasRdr } from './Canvas';
import { reducer as importModalRdr } from './ImportModal';
import Window from './Window';

const reducer = combineReducers({
  canvas: canvasRdr,
  importModal: importModalRdr
});

export { Window as default, reducer };

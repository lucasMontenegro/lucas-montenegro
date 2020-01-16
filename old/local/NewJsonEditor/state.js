import { combineReducers } from 'redux';
import { reducer as canvasRdr } from './Canvas/state';
import { reducer as importModalRdr } from './ImportModal/state';

const reducer = combineReducers({
  canvas: canvasRdr,
  importModal: importModalRdr
});

export { reducer };

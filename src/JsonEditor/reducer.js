import {
  UPDATE_NUMBER,
  UPDATE_STRING
} from './actions';
import { normalize } from './normalize-json';
import data from './normalize-json/data.json';

function jsonEditorRdr (state, action) {
  state || (state = initState());
  return {
    ...state,
    byID: elementsByID(state.byID, action)
  };
}

const initState = () => normalize(data);

function elementsByID (state, action) {
  switch (action.type) {

    case UPDATE_NUMBER: {
      const { id, value } = action;
      const elem = state[id];
      return {
        ...state,
        [id]: { ...elem, value: value.replace(/[^0-9]/gm, '') }
      };
    }

    case UPDATE_STRING: {
      const { id, value } = action;
      const elem = state[id];
      return {
        ...state,
        [id]: {
          ...elem,
          value
        }
      };
    }

    default:
    return state;
  }
}

export default jsonEditorRdr;
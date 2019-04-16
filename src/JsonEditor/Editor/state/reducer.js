import { clone } from 'lodash';
import {
  UPDATE_NUMBER,
  UPDATE_STRING,
  EDIT_OBJECT_KEY,
  UPDATE_KEY,
  SAVE_KEY,
  CLOSE_KEY_EDITOR
} from './actions';
import { normalize } from './normalize-json';
import data from './normalize-json/data.json';

const initState = () => {
  const state = normalize(data);
  state.keyEditor = {};
  return state;
}

function reducer (state, action) {
  state || (state = initState());
  switch (action.type) {
    case UPDATE_NUMBER: {
      const { id, value } = action;
      const { byID } = state;
      const elem = byID[id];
      return {
        ...state,
        byID: {
          ...byID,
          [id]: {
            ...elem,
            value: value.replace(/[^0-9]/gm, '')
          }
        }
      };
    }

    case UPDATE_STRING: {
      const { id, value } = action;
      const { byID } = state;
      const elem = byID[id];
      return {
        ...state,
        byID: {
          ...byID,
          [id]: {
            ...elem,
            value
          }
        }
      };
    }

    case EDIT_OBJECT_KEY: {
      const { byID } = state;
      const { id, key } = action;
      const elem = byID[id];
      if (!elem || elem.type !== 'object') return state;

      return {
        ...state,
        keyEditor: { id, key, oldKey: key, unique: true }
      };
    }

    case UPDATE_KEY: {
      const { byID, keyEditor } = state;
      const { id, oldKey } = keyEditor;
      if (!id) return state;

      const elem = byID[id];
      if (!elem) return { ...state, keyEditor: {} };

      const { key } = action;
      const unique = key === oldKey || !elem.kids[key];
      return { ...state, keyEditor: { ...keyEditor, key, unique } };
    }

    case SAVE_KEY: {
      const { byID, keyEditor } = state;
      const { id, key, oldKey, unique } = keyEditor;
      if (!id || !unique) return state;

      const elem = byID[id];
      if (!elem || (!unique && elem.kids[key])) return state;

      const kids = clone(elem.kids);
      kids[key] = kids[oldKey];
      delete kids[oldKey];

      return {
        ...state,
        keyEditor: {},
        byID: {
          ...byID,
          [id]: {
            ...elem,
            kids
          }
        }
      };
    }

    case CLOSE_KEY_EDITOR: {
      return { ...state, keyEditor: {} };
    }

    default:
    return state;
  }
}

export default reducer;

import { clone } from 'lodash';
import {
  UPDATE_NUMBER,
  UPDATE_STRING,
  EDIT_OBJECT_KEY,
  UPDATE_KEY,
  SAVE_KEY
} from './actions';
import { normalize } from './normalize-json';
import data from './normalize-json/data.json';

const initState = () => {
  const state = normalize(data);
  state.keyEditor = {};
  return state;
}

function jsonEditorRdr (state, action) {
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
      const { id, key } = action;
      return {
        ...state,
        keyEditor: { id, key, oldKey: key }
      };
    }

    case UPDATE_KEY: {
      const { byID, keyEditor } = state;
      const { id, oldKey } = keyEditor;
      if (!id) return state;

      const elem = byID[id];
      if (!elem || elem.type !== 'object') return { ...state, keyEditor: {} };

      const { key } = action;
      if (key !== oldKey && elem.kids[key]) return state;

      return { ...state, keyEditor: { ...keyEditor, key } };
    }

    case SAVE_KEY: {
      const { byID, keyEditor } = state;
      const { id, key, oldKey } = keyEditor;
      if (!id) return state;

      const elem = byID[id];
      const kidID = elem.kids[key];
      if (!elem || kidID) return state;

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

    default:
    return state;
  }
}

export default jsonEditorRdr;

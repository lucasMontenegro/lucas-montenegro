import importJson from './importJson';
import {
  IMPORT_RAW,
  UPDATE_CURSOR,
  TOGGLE_ELEMENT_COLLAPSE,
  UPDATE_NUMBER,
  UPDATE_STRING,
  TOGGLE_BOOLEAN
} from './actions';

export default (state, action) => {
  if (typeof state === 'undefined') {
    state = {
      rootID: null,
      cutoutID: null,
      cursorID: null,
      byID: {}
    };
  }
  switch (action.type) {
    case IMPORT_RAW: {
      const { parsed } = action;
      const byID = { ...state.byID };
      const rootID = importJson(parsed, byID, null);
      return {
        ...state,
        rootID,
        cursorID: rootID,
        byID
      };
    }
    case UPDATE_CURSOR:
    return {
      ...state,
      cursorID: action.id
    };
    case TOGGLE_ELEMENT_COLLAPSE: {
      const { id } = action;
      const { byID } = state;
      const elem = byID[id];
      return {
        ...state,
        byID: {
          ...byID,
          [id]: {
            ...elem,
            collapsed: !elem.collapsed
          }
        }
      };
    }
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
    case TOGGLE_BOOLEAN: {
      const { id } = action;
      const { byID } = state;
      const elem = byID[id];
      return {
        ...state,
        byID: {
          ...byID,
          [id]: {
            ...elem,
            value: !elem.value
          }
        }
      };
    }
    default:
    return state;
  }
}

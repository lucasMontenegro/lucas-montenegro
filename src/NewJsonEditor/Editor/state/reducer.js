import {
  UPDATE_CURSOR_ID,
  OPEN_IMPORT_MODAL,
  CLOSE_IMPORT_MODAL,
  UPDATE_RAW_JSON,
  SAVE_RAW_JSON
} from './actions';

const initState = () => ({
  rootID: null,
  byID: {},
  raw: {
    content: null
  },
  objectKeyEditor: {
    id: null
  },
  cursor: {
    id: null
  }
});

export default (state, action) => {
  state || (state = initState());
  switch (action.type) {
    case UPDATE_CURSOR_ID: {
      return {
        ...state,
        cursor: {
          ...state.cursor,
          id: action.id
        }
      };
    }
    case OPEN_IMPORT_MODAL: {
      return {
        ...state,
        raw: {
          content: '',
          invalid: false
        }
      };
    }
    case CLOSE_IMPORT_MODAL: {
      return {
        ...state,
        raw: {
          content: null
        }
      };
    }
    case UPDATE_RAW_JSON: {
      if (state.raw.content === null) return state;
      const { content } = action;
      try {
        return {
          ...state,
          raw: {
            obj: JSON.parse(content),
            invalid: false,
            content
          }
        }
      } catch (e) {
        return {
          ...state,
          raw: {
            obj: null,
            invalid: true,
            content
          }
        }
      }
    }
    case SAVE_RAW_JSON: {
      console.log('SAVE_RAW_JSON content:', state.raw.content);
      console.log('SAVE_RAW_JSON obj:', state.raw.obj);
      return {
        ...state,
        raw: {
          content: null
        }
      };
    }
    default:
    return state;
  }
}

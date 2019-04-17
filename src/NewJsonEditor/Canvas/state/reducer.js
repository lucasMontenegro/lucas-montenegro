import {
  IMPORT_RAW,
  UPDATE_CURSOR
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
      console.log(`${IMPORT_RAW} - Parsed JSON:`);
      console.log(action.parsed);
      return state;
    }
    case UPDATE_CURSOR:
    return {
      ...state,
      cursorID: action.id
    };
    default:
    return state;
  }
}

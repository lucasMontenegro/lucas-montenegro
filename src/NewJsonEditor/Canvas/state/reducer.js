import importJson from './importJson';
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
      const { parsed } = action;
      console.log(`${IMPORT_RAW} - Parsed JSON:`);
      console.log(parsed);

      const byID = { ...state.byID };
      const rootID = importJson(parsed, byID, null);
      console.log(`${IMPORT_RAW} - Normalized JSON:`);
      console.log(byID);
      return {
        ...state,
        rootID,
        byID
      };
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

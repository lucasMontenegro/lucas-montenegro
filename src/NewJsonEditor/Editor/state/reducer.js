import {
  UPDATE_CURSOR_ID
} from './actions';

const initState = () => ({
  rootID: null,
  byID: {},
  raw: {
    content: ''
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

    default:
    return state;
  }
}

import { SET_TITLE } from './actions';

const initialState = {
  title: '',
};

export default function (state=initialState, action) {
  switch (action.type) {
    case SET_TITLE: {
      return { ...state, title: action.str };
    }
    default:
    return state;
  }
}

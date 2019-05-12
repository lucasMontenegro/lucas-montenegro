import {
  SET_TITLE,
  UPDATE_LANG_SELECTION,
} from './actions';

const initialState = {
  title: '',
};

export default function (state=initialState, action) {
  switch (action.type) {
    case SET_TITLE:
    return { ...state, title: action.str };

    case UPDATE_LANG_SELECTION:
    return { ...state, langSelection: action.str };

    default:
    return state;
  }
}

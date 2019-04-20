import {
  OPEN,
  CLOSE,
  UPDATE
} from './actions';

export default (state={ content: null }, action) => {
  switch (action.type) {
    case OPEN: {
      return { content: '' };
    }
    case CLOSE: {
      return { content: null };
    }
    case UPDATE: {
      if (state.content === null) return state;
      const { content } = action;
      try {
        return {
          content,
          parsed: JSON.parse(content.replace(/\n/gm, '\\n'))
        };
      } catch (e) {
        return { content };
      }
    }
    default:
    return state;
  }
}

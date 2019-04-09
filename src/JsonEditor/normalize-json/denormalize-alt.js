// Alternative implementation
function createState (byID, id) {
  const elem = byID[id];
  const state = { elem };
  switch (elem.type) {
    case 'string':
    state.result = elem.value;
    break

    case 'number':
    state.result = JSON.parse(elem.value);
    break

    case 'boolean':
    state.result = elem.value === 'true' ? true : false;
    break

    case 'object':
    state.isObject = true;
    state.result = {};
    state.order = elem.order.reverse();
    break

    case 'array':
    state.isObject = true;
    state.isArray = true;
    state.result = [];
    state.kids = elem.kids.reverse();
    break

    case 'null':
    state.result = null;
    break

    default:
    if (process.env.NODE_ENV !== 'production') {
      throw TypeError('Unexpected JSON store item while denormalizing');
    }
    state.result = null;
  }
  return state;
}
export default function denormalize (input) {
  const { byID, id } = input;
  let state = createState(byID, id);
  if (!state.isObject) return state.result;

  const stack = [state];
  while (stack.length > 0) {
    let childState;
    const { result, elem: { order, kids } } = state;
    if (state.isArray) {
      if (kids.length > 0) {
        childState = createState(byID, kids.pop());
        result.push(childState.result);
      }
    } else {
      if (order.length > 0) {
        const key = order.pop();
        childState = createState(byID, kids[key]);
        result[key] = childState.result;
      }
    }
    if (!childState) {
      state = stack.pop();
    } else if (childState.isObject) {
      stack.push(state);
      state = childState;
    }
  }
  return state.result;
}

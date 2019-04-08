/**
export default function denormalize (input, elem) {
  const { byID, id } = input;
  elem || (elem = byID[id]);
  switch (elem.type) {
    case 'string':
    return elem.value;

    case 'number':
    return JSON.parse(elem.value);

    case 'object':
    const obj = {};
    for (const key of elem.order) {
      obj[key] = denormalize(input, byID[elem.kids[key]]);
    }
    return obj;

    case 'array':
    const arr = [];
    for (const id of elem.kids) {
      arr.push(denormalize(input, byID[id]));
    }
    return arr;

    default:
    return null;
  }
}
/**/

// Alternative implementation
/**/
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
/**/

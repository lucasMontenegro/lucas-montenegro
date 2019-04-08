import createID from './create-id';

/**/
export default function normalize (raw, byID={}, parentID=null) {
  const id = createID();
  const res = byID[id] = { id, parentID };

  let type = typeof raw;
  switch (type) {
    case 'object':
    if (raw instanceof Array) {
      type = 'array';
      res.kids = raw.map((item, i) => normalize(item, byID, id, i));
    } else if (raw === null) {
      type = 'null';
    } else {
      const order = res.order = Object.keys(raw);
      const kids = res.kids = {};
      order.forEach(key => kids[key] = normalize(raw[key], byID, id));
    }
    break

    case 'number':
    res.value = JSON.stringify(raw);
    break

    case 'string':
    res.value = raw;
    break

    default:
    type = 'string';
    res.value = '"JSON Error: Unexpected Datatype"';
  }
  res.type = type;
  if (parentID === null) return { id, byID };
  return id;
}
/**/

// Alternative implementation
/**
function createState (raw, byID, parentID=null) {
  const id = createID();
  const result = byID[id] = { id, parentID };
  const state = { id, result, raw };
  let type = typeof raw;
  switch (type) {
    case 'object':
    if (raw instanceof Array) {
      state.isObject = true;
      state.isArray = true;
      type = 'array';
      raw.reverse();
      result.kids = [];
    } else if (raw === null) {
      type = 'null';
    } else {
      state.isObject = true;
      state.keys = Object.keys(raw).reverse();
      result.order = [];
      result.kids = {};
    }
    break

    case 'number':
    result.value = JSON.stringify(raw);
    break

    case 'string':
    result.value = raw;
    break

    default:
    type = 'string';
    result.value = '"JSON Error: Unexpected Datatype"';
  }
  result.type = type;
  return state;
}
export default function normalize (raw) {
  const byID = {};
  const normalized = { byID };

  let state = createState(raw, byID);
  normalized.id = state.id;
  if (!state.isObject) return normalized;

  const stack = [null];
  while (state) {
    let childState;
    const { raw, id, result, keys } = state;
    if (state.isArray) {
      if (raw.length > 0) {
        childState = createState(raw.pop(), byID, id);
        result.kids.push(childState.id);
      }
    } else if (keys.length > 0) {
      const key = keys.pop();
      childState = createState(raw[key], byID, id);
      delete raw[key];
      result.kids[key] = childState.id;
      result.order.push(key);
    }
    if (!childState) {
      state = stack.pop();
    } else if (childState.isObject) {
      stack.push(state);
      state = childState;
    }
  }
  return normalized;
}
/**/
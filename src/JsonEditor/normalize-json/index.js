import data from './data.json';
import * as stringifyObject from 'stringify-object';

export const createID = (i => () => (i++).toString())(0);



/*
export function normalize (raw, byID={}, parentID=null) {
  const id = createID();
  const res = byID[id] = { id, parentID };

  let type = typeof raw;
  if (type === 'object') {
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
  } else {
    res.value = raw;
  }
  res.type = type;
  if (parentID === null) return { id, byID };
  return id;
}
/**/


// Alternative implementation
/**/
export const normalize = (() => {
  function createState (raw, byID, parentID=null) {
    const id = createID();
    const result = byID[id] = { id, parentID };
    const state = { id, result, raw };
    let type = typeof raw;
    if (type === 'object') {
      if (raw instanceof Array) {
        state.isObject = true;
        state.isArray = true;
        type = 'array';
        result.kids = [];
      } else if (raw === null) {
        type = 'null';
      } else {
        state.isObject = true;
        state.keys = Object.keys(raw).reverse();
        result.order = [];
        result.kids = {};
      }
    }
    result.type = type;
    return state;
  }

  return function normalize (raw) {
    const byID = {};
    const normalized = { byID };

    let state = createState(raw, byID);
    const stack = [state];
    normalized.id = state.id;

    do {
      if (state.isObject) {
        if (state.isArray) {
          const { raw, id, result } = state;
          if (raw.length > 0) {
            stack.push(state);
            state = createState(raw.pop(), byID, id, raw.length);
            result.kids.unshift(state.id);
          } else {
            state = stack.pop();
          }
        } else {
          const { raw, keys, id, result } = state;
          if (keys.length > 0) {
            stack.push(state);
            const key = keys.pop();
            state = createState(raw[key], byID, id);
            delete raw[key];
            result.kids[key] = state.id;
            result.order.push(key);
          } else {
            state = stack.pop();
          }
        }
      } else {
        state.result.value = state.raw;
        state = stack.pop();
      }
    } while (stack.length > 0);
    return normalized;
  }
})();
/**/



/*
export function denormalize (input, elem) {
  const { byID, id } = input;
  elem || (elem = byID[id]);
  switch (elem.type) {
    case 'string':
    case 'number':
    return elem.value;

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
export const denormalize = (() => {
  function createState (byID, id) {
    const elem = byID[id];
    const state = { elem };
    switch (elem.type) {
      case 'string':
      case 'number':
      state.result = elem.value;
      break

      case 'object':
      state.isObject = true;
      state.result = {};
      state.order = elem.order.reverse();
      break

      case 'array':
      state.isArray = true;
      state.result = [];
      state.kids = elem.kids.reverse();
      break

      default:
      state.result = null;
    }
    return state;
  }
  return function denormalize (input) {
    const { byID, id } = input;
    let state = createState(byID, id);
    const stack = [];

    while (true) {
      if (state.isObject) {
        const { order } = state
        if (order.length > 0) {
          stack.push(state);
          const key = state.key = order.pop();
          state = createState(byID, state.elem.kids[key]);
          continue
        }
      } else if (state.isArray) {
        const { kids } = state.elem
        if (kids.length > 0) {
          stack.push(state);
          state = createState(byID, kids.pop());
          continue
        }
      }
      if (stack.length === 0) break;
      const { result } = state;
      state = stack.pop();
      if (state.isObject) {
        state.result[state.key] = result;
      } else {
        state.result.push(result);
      }
    }
    return state.result;
  }
})();
/**/



/**/
const stringifyOptions = {
  indent: '  ',
  singleQuotes: false
};

console.log('Raw Data:');
console.log(stringifyObject(data, stringifyOptions));
console.log();
console.log('Processed Data:');
console.log(stringifyObject(denormalize(normalize(data)), stringifyOptions));
console.log();
/**/

import { cloneDeep } from 'lodash';
import createID from './create-id';

// Alternative implementation
function createState (raw, byID, parentID=null) {
  const id = createID();
  const result = byID[id] = { id, parentID };
  const state = { result };
  let type = typeof raw;
  switch (type) {
    case 'object':
    if (raw === null) {
      type = 'null';
    } else {
      state.isObject = true;
      state.index = 0;
      result.kids = raw;
      if (raw instanceof Array) {
        state.isArray = true;
        type = 'array';
      } else {
        state.keys = Object.keys(raw);
      }
    }
    break

    case 'number':
    result.value = JSON.stringify(raw);
    break

    case 'string':
    result.value = raw;
    break

    case 'boolean':
    result.value = raw ? 'true' : 'false';
    break

    default:
    type = 'string';
    result.value = '"JSON Error: Unexpected Datatype"';
  }
  result.type = type;
  return state;
}
export default function normalize (raw) {
  raw = cloneDeep(raw);
  const byID = {};
  const normalized = { byID };

  let state = createState(raw, byID);
  normalized.id = state.result.id;
  if (!state.isObject) return normalized;

  const stack = [null];
  while (state) {
    let childState;
    const { result: { id, kids }, index } = state;
    if (state.isArray) {
      if (index < kids.length) {
        childState = createState(kids[index], byID, id);
        kids[index] = childState.result.id;
        state.index++;
      }
    } else {
      const { keys } = state;
      if (index < keys.length) {
        const key = keys[index];
        childState = createState(kids[key], byID, id);
        kids[key] = childState.result.id;
        state.index++;
      }
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
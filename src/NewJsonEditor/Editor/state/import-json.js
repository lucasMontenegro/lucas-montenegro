import createID from './create-id';

export default const importJson = (raw, byID, parentID) => {
  const id = createID();
  const result = byID[id] = { id, parentID };

  let type = typeof raw;
  switch (type) {
    case 'object':
    if (raw instanceof Array) {
      type = 'array';
      result.kids = raw.map(item => importJson(item, byID, id));
    } else if (raw === null) {
      type = 'null';
    } else {
      const kids = result.kids = {};
      for (const key in raw) {
        kids[key] = importJson(raw[key], byID, id);
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
  return id;
}

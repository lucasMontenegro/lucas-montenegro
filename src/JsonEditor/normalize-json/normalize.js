import createID from './create-id';

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
      const kids = res.kids = {};
      for (const key in raw) {
        kids[key] = normalize(raw[key], byID, id);
      }
    }
    break

    case 'number':
    res.value = JSON.stringify(raw);
    break

    case 'string':
    res.value = raw;
    break

    case 'boolean':
    res.value = raw ? 'true' : 'false';
    break

    default:
    type = 'string';
    res.value = '"JSON Error: Unexpected Datatype"';
  }
  res.type = type;
  if (parentID === null) return { id, byID };
  return id;
}

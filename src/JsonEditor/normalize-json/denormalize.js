export default function denormalize (input, elem) {
  const { byID, id } = input;
  elem || (elem = byID[id]);
  switch (elem.type) {
    case 'string':
    return elem.value;

    case 'number':
    return JSON.parse(elem.value);

    case 'boolean':
    return elem.value === 'true' ? true : false;

    case 'object':
    const obj = {};
    const { kids } = elem;
    for (const key in kids) {
      const id = kids[key];
      if (!id) continue;
      obj[key] = denormalize(input, byID[id]);
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

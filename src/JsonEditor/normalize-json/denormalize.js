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
    break

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

export const UPDATE_NUMBER = 'UPDATE_NUMBER';
export const updateNumber = (id, value) => ({
  type: UPDATE_NUMBER,
  id,
  value
});

export const UPDATE_STRING = 'UPDATE_STRING';
export const updateString = (id, value) => ({
  type: UPDATE_STRING,
  id,
  value
});
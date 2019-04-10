export const UPDATE_NUMBER = 'jsonEditor/UPDATE_NUMBER';
export const updateNumber = (id, value) => ({
  type: UPDATE_NUMBER,
  id,
  value
});

export const UPDATE_STRING = 'jsonEditor/UPDATE_STRING';
export const updateString = (id, value) => ({
  type: UPDATE_STRING,
  id,
  value
});

export const EDIT_OBJECT_KEY = 'jsonEditor/EDIT_OBJECT_KEY';
export const editObjectKey = (id, key) => ({
  type: EDIT_OBJECT_KEY,
  id,
  key
});

export const UPDATE_KEY = 'jsonEditor/UPDATE_KEY';
export const updateKey = key => ({
  type: UPDATE_KEY,
  key
});

export const SAVE_KEY = 'jsonEditor/SAVE_KEY';
export const saveKey = () => ({
  type: SAVE_KEY
});

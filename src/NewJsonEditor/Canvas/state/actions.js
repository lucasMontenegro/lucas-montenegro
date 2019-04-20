export const IMPORT_RAW = 'jsonEditor/canvas/IMPORT_RAW';
export const importRaw = parsed => ({
  type: IMPORT_RAW,
  parsed
});

export const UPDATE_CURSOR = 'jsonEditor/canvas/UPDATE_CURSOR';
export const updateCursor = id => ({
  type: UPDATE_CURSOR,
  id
});

export const TOGGLE_ELEMENT_COLLAPSE = 'jsonEditor/canvas/'
  + 'TOGGLE_ELEMENT_COLLAPSE';
export const toggleElementCollapse = id => ({
  type: TOGGLE_ELEMENT_COLLAPSE,
  id
});

export const UPDATE_NUMBER = 'jsonEditor/canvas/UPDATE_NUMBER';
export const updateNumber = (id, value) => ({
  type: UPDATE_NUMBER,
  id,
  value
});

export const UPDATE_STRING = 'jsonEditor/canvas/UPDATE_STRING';
export const updateString = (id, value) => ({
  type: UPDATE_STRING,
  id,
  value
});

export const TOGGLE_BOOLEAN = 'jsonEditor/canvas/TOGGLE_BOOLEAN';
export const toggleBoolean = id => ({
  type: TOGGLE_BOOLEAN,
  id
});

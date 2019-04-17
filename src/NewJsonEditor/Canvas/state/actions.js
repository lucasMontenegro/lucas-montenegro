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

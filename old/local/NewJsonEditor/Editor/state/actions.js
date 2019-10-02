export const UPDATE_CURSOR_ID = 'jsonEditor/UPDATE_CURSOR_ID';
export const updateCursorID = id => ({
  type: UPDATE_CURSOR_ID,
  id
});

export const OPEN_IMPORT_MODAL = 'jsonEditor/OPEN_IMPORT_MODAL';
export const openImportModal = () => ({
  type: OPEN_IMPORT_MODAL
});

export const CLOSE_IMPORT_MODAL = 'jsonEditor/CLOSE_IMPORT_MODAL';
export const closeImportModal = () => ({
  type: CLOSE_IMPORT_MODAL
});

export const UPDATE_RAW_JSON = 'jsonEditor/UPDATE_RAW_JSON';
export const updateRawJson = content => ({
  type: UPDATE_RAW_JSON,
  content
});

export const SAVE_RAW_JSON = 'jsonEditor/SAVE_RAW_JSON';
export const saveRawJson = () => ({
  type: SAVE_RAW_JSON
});

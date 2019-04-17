export const OPEN = 'jsonEditor/importModal/OPEN';
export const open = () => ({
  type: OPEN
});

export const CLOSE = 'jsonEditor/importModal/CLOSE';
export const close = () => ({
  type: CLOSE
});

export const UPDATE = 'jsonEditor/importModal/UPDATE';
export const update = content => ({
  type: UPDATE,
  content
});

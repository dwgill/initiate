import get from 'lodash/fp/get';

function getActiveId(state) {
  const activePos = get(['order', 'active'], state);
  return get(['order', 'ids', activePos], state);
}

export default getActiveId;
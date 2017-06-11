import cloneDeep from 'lodash/cloneDeep';
import shuffle from 'lodash/shuffle';

export default (array, maxCount = null) => {
  array = shuffle(cloneDeep(array));

  if (maxCount === null) {
    return array;
  }

  if (array.length <= maxCount) {
    return array;
  }

  return array.slice(0, maxCount);
}

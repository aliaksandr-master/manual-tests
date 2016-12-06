import cloneDeep from 'lodash/cloneDeep';
import shuffle from 'lodash/shuffle';

export default (array, maxCount) => {
  array = shuffle(cloneDeep(array));

  if (array.length <= maxCount) {
    return array;
  }

  return array.slice(0, maxCount);
}

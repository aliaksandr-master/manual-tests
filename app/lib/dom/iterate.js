'use strict';

export default (element, processor) => {
  if (!element) {
    return 0;
  }

  if (element.length == null) {
    const result = processor(element, 0);

    return result || result == null ? 1 : 0;
  }

  let processed = 0;

  for (let i = 0; i < element.length; i++) {
    if (element[i]) {
      const result = processor(element[i], processed);

      if (result || result == null) {
        processed++;
      }
    }
  }

  return processed;
};

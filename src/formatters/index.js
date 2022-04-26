import stylish from './stylish.js';
import plain from './plain.js';

const getFormattedDiff = (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      return 'Oops! Unknown format';
  }
};

export default getFormattedDiff;

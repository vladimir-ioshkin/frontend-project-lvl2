import stylish from './stylish.js';
import plain from './plain.js';

const getFormattedDiff = (diff, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error('Unknown format');
  }
};

export default getFormattedDiff;

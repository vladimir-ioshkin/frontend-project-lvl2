import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return (diff) => JSON.stringify(diff);
    default:
      throw new Error('Unnknown format');
  }
};

export default getFormatter;

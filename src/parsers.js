import yaml from 'js-yaml';

const parse = (data, path) => {
  const splittedPath = path.split('.');
  const extension = splittedPath[splittedPath.length - 1];

  switch (extension) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error('Data has incorrect extension');
  }
};

export default parse;

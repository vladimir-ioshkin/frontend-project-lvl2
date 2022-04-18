import yaml from 'js-yaml';

const isJSON = (path) => path.includes('.json');
const isYAML = (path) => path.includes('.yaml') || path.includes('.yml');

const parse = (file, path) => {
  if (isJSON(path)) {
    return JSON.parse(file);
  }

  if (isYAML(path)) {
    return yaml.load(file);
  }

  throw new Error('File has incorrect extension');
};

export default parse;

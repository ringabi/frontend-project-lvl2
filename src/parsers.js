import yaml from 'js-yaml';

export default (file, filepath) => {
  if (filepath.endsWith('yml')) {
    return yaml.load(file);
  }
  return JSON.parse(file);
};

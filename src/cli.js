import { Command } from 'commander';
import genDiff from '../index.js';

const programParse = () => {
  const program = new Command();

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2));
    });

  program.parse();
};

export default programParse;

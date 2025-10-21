import chalk from 'chalk';

export const logger = {
  info: (msg) => console.log(chalk.cyan('ℹ️ ' + msg)),
  success: (msg) => console.log(chalk.green('✅ ' + msg)),
  warning: (msg) => console.log(chalk.yellow('⚠️ ' + msg)),
  error: (msg) => console.log(chalk.red('❌ ' + msg)),
  titulo: (msg) => console.log(chalk.bold.bgBlue.white(`\n${msg}\n`)),
};
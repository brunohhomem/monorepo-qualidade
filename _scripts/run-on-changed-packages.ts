import { execSync } from 'child_process'

const diffChangedFiles = execSync('git diff --name-only HEAD^..HEAD', {
  encoding: 'utf-8'
}).split('\n')

const changedPackageNames = ['frontend', 'backend']
const workspacesFlags = changedPackageNames
  .map(packageNames => {
    return `--workspace=${packageNames}`
  })
  .join(' ')

if (workspacesFlags) {
  const command = process.argv.at(-1)
  const commandToRun = `${command} ${workspacesFlags}`

  execSync(commandToRun, {
    stdio: 'inherit'
  })
} else {
  console.log(
    `Nenhum pacote mudou. Execute o comando "npm run dev" para iniciar os serviços.`
  )
}

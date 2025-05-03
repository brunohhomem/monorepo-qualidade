import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// 1. Função mais robusta para obter arquivos alterados
function getChangedFiles(): string[] {
  try {
    // Alternativa mais confiável para obter o commit anterior
    const output = execSync('git diff --name-only HEAD~1..HEAD', {
      encoding: 'utf-8',
      stdio: 'pipe'
    })

    return output
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
  } catch (error) {
    console.error('Error getting changed files:', error)
    return []
  }
}

// 2. Obter arquivos alterados
const changedFiles = getChangedFiles()
console.log('Changed files:', changedFiles)

if (changedFiles.length === 0) {
  console.log('Nothing has changed!')
  process.exit(0)
}

// 3. Extrair pacotes alterados
const changedPackages = new Set<string>()

for (const filePath of changedFiles) {
  const parts = filePath.split('/')

  // Só processamos arquivos dentro de apps/ ou commons/
  if (parts.length < 2 || (parts[0] !== 'apps' && parts[0] !== 'commons')) {
    continue
  }

  const packageDir = path.join(parts[0], parts[1])
  const packageJsonPath = path.join(packageDir, 'package.json')

  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
      changedPackages.add(packageJson.name)
    } catch (error) {
      console.error(`Error reading ${packageJsonPath}:`, error)
    }
  }
}

console.log('Changed packages:', Array.from(changedPackages))

if (changedPackages.size > 0) {
  const workspacesFlags = Array.from(changedPackages)
    .map(pkg => `--workspace=${pkg}`)
    .join(' ')

  const command = process.argv[2] || 'test' // Padrão para 'test' se não especificado
  const fullCommand = `${command} ${workspacesFlags}`

  console.log('Executing:', fullCommand)
  execSync(fullCommand, { stdio: 'inherit' })
} else {
  console.log('No relevant packages changed!')
}

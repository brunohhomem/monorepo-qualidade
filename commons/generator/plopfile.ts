import { NodePlopAPI } from 'plop'
import path from 'path'

const ROOT = path.resolve('..', '..')

export default function (plop: NodePlopAPI) {
  // create your generators here
  plop.setGenerator('basics', {
    description: 'this is a skeleton plopfile',
    prompts: [], // array of inquirer prompts
    actions: [] // array of actions
  })

  commonPackage(plop)
}

function commonPackage(plop: NodePlopAPI) {
  plop.setGenerator('common-package', {
    description: 'Create a new common package inside `./commons` folder',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: 'What is the name of your package?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: path.resolve(
          ROOT,
          'commons',
          '{{ lowerCase packageName }}',
          'package.json'
        ),
        templateFile: 'templates/common-package/package.json.hbs'
      }
    ]
  })
}

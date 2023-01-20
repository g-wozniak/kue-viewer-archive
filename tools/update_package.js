const fs = require('fs')

const package = require('../dist/.build/package.json')

package.devDependencies = {}
package.scripts = {
    "deploy": "yarn publish --access restricted"
}
package.main = 'viewer.js'
package.types = 'viewer.d.ts'

try {
    fs.writeFileSync('./dist/.build/package.json', JSON.stringify(package, null, 2))
} catch (err) {
    console.error(err)
}
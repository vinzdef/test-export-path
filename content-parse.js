import fs from 'fs'
import glob from 'glob'

const parseFile = (filepath) => {
    const content = fs.readFileSync(filepath, {encoding: 'utf-8'})
    return JSON.parse(content)
}

async function getRoutes() {
    return new Promise((res, rej) => {
        glob('content/**/*.json', {}, (err, files) => {
          if (err) {
            rej(err)
          } else {
            res(files.reduce((routes, filepath) => {
              const data = parseFile(filepath)
              const URL = data.customURL || filepath.replace('content', '')
              return {
                ...routes,
                [URL]: data
              }
            }, {}))
          }
        })
    })
}


let routes
export async function getPageData(URL) {
    if (!routes) {
        routes = await getRoutes()
    }

    return routes[URL]
}
/** @type {import('next').NextConfig} */
const fs = require('fs')
const glob = require('glob')

const parseFile = (filepath) => {
  const content = fs.readFileSync(filepath, {encoding: 'utf-8'})
  return JSON.parse(content)
}

const getRoutes = () => {
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
            [URL]: {
              page: `/${data.template}`
            }
          }
        }, {}))
      }
    })
  })
}
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false
    }
    return config
  },
  exportPathMap: async function exportPathMap() {
    return await getRoutes()
  }
}

module.exports = nextConfig

const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.transformer.unstable_allowRequireContext = true
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const isBlob = context.originModulePath.includes('@vercel/blob')
  if (isBlob && moduleName === 'stream') {
    const lookup = context.fileSystemLookup('./node_modules/@vercel/blob/dist/stream-browser.js')
    return { type: 'sourceFile', filePath: lookup.realPath }
  }
  if (isBlob && moduleName === 'undici') {
    const lookup = context.fileSystemLookup('./node_modules/@vercel/blob/dist/undici-browser.js')
    return { type: 'sourceFile', filePath: lookup.realPath }
  }
  if (isBlob && moduleName === 'crypto') {
    const lookup = context.fileSystemLookup('./node_modules/@vercel/blob/dist/crypto-browser.js')
    return { type: 'sourceFile', filePath: lookup.realPath }
  }
  if (moduleName.startsWith('@vercel/blob')) return context.resolveRequest({ ...context, unstable_enablePackageExports: true }, moduleName, platform)
  return context.resolveRequest(context, moduleName, platform)
}

module.exports = config

import type { Plugin } from 'vite'
import type { OutputBundle } from 'rollup'

interface BundleAsset {
  type: string
  code?: string
  length?: number
}

const formatSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`
}

export const bundleSizePlugin = (): Plugin => {
  let totalSize = 0
  let totalGzipSize = 0

  return {
    name: 'bundle-size',
    closeBundle() {
      setTimeout(() => {
        console.log('\n\x1b[36m%s\x1b[0m', `Общий размер: ${formatSize(totalSize)} (gzip: ${formatSize(totalGzipSize)})`)
      }, 100)
    },
    generateBundle(options, bundle: OutputBundle) {
      const assets = Object.values(bundle)
      totalSize = 0
      totalGzipSize = 0

      assets.forEach((asset: BundleAsset) => {
        if (asset.type === 'chunk' || asset.type === 'asset') {
          totalSize += asset.code?.length || 0
          totalGzipSize += Math.floor((asset.code?.length || 0) * 0.3)
        }
      })
    }
  }
}

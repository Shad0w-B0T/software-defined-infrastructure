import fs from 'fs'
import path from 'path'

export default function CodeImportPlugin() {
    return {
        name: 'vitepress-plugin-code-import',
        enforce: 'pre',
        transform(code, id) {
            if (!id.endsWith('.md')) return

            const fileImportRegex = /```file\s+([^\s]+)\s+([^\s]+)\s*\n```/g

            return {
                code: code.replace(fileImportRegex, (_, filePath, lang) => {
                    console.log("[CodeImportPlugin] Run", filePath)
                    const absPath = path.resolve(process.cwd(), filePath)

                    if (!fs.existsSync(absPath)) {
                        return `**${filePath}**\n\n\`\`\`${lang}\n// ⚠ File not found: ${filePath}\n\`\`\``
                    }

                    const fileContent = fs.readFileSync(absPath, 'utf-8')

                    return `## \`${filePath}\`\n\n\`\`\`${lang}\n${fileContent.trim()}\n\`\`\``
                })
            }
        }
    }
}

// @ts-ignore
import Container from 'markdown-it-container'

const codeRE = /^code\s+(.*)$/

export function useCode(md: any) {
    md.use(Container, 'code', {
        validate: (params: string) => params.trim().match(codeRE),
        render: (tokens: any[], idx: number) => {
            const m = tokens[idx].info.trim().match(codeRE)
            if (tokens[idx].nesting === 1)
                return `<div class="code"><d-code class="code-file">${m[1]}</d-code>`
            else return '</div>\n'
        }
    })
}

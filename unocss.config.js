import { defineConfig, transformerDirectives } from 'unocss'

export default defineConfig({
  rules: [],
  shortcuts: {
    'flex-center': 'flex items-center',
    'flex-between': 'flex items-center justify-between',
    'flex-end': 'flex items-center justify-end',
  },
  theme: {
    colors: {
      primary: '#0052d9',
      success: '#2ba471',
      info: '#909399',
      warning: '#e37318',
      danger: '#d54941'
    }
  },
  transformers: [
    transformerDirectives()
  ]
})

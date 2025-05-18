import DefaultTheme from 'vitepress/theme'
import ImageWithCaption from './components/ImageWithCaption.vue'
import ButtonLink from './components/ButtonLink.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('ImageWithCaption', ImageWithCaption)
    app.component('ButtonLink', ButtonLink)
  }
}
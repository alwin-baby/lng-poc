import Lightning from '@lightningjs/sdk/src/Lightning'
import CardTemplateSpec, { item } from '../temlate_specs/cardTemplateSpec'
import Router from '@lightningjs/sdk/src/Router'

class Card
  extends Lightning.Component<CardTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<CardTemplateSpec>
{
  data: item = {} as item
  index: number | null = null
  srcx = ''
  title = ''
  description = ''
  bannerUrl = ''

  static override _template() {
    return {
      w: 173,
      h: 258,
      color: 0xbbffffff,
      y: 35,
      rect: true,
      shader: { type: Lightning.shaders.RoundedRectangle, radius: 15 },
    }
  }

  set props(obj: { data: { src: string; bannerUrl: string; title: string; description: string } }) {
    const { data } = obj
    const { src, bannerUrl, title, description } = data
    this.srcx = src
    this.bannerUrl = bannerUrl
    this.title = title
    this.description = description
    this.patch({
      src: src,
      scale: 1,
    })
  }

  override _handleEnter() {
    const data = {
      title: this.title,
      description: this.description,
      bannerUrl: this.bannerUrl,
    }
    Router.navigate('details', { data })
  }

  override _focus() {
    const data = {
      title: this.title,
      description: this.description,
      bannerUrl: this.bannerUrl,
    }
    this.fireAncestors('$updateBigImage' as any, data)
    this.patch({
      scale: 1.15,
    })
  }

  override _unfocus() {
    this.patch({
      scale: 1,
    })
  }
}

export default Card

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

  set props(obj: { src: string; i: number; bannerUrl: string }) {
    const { src, i, bannerUrl } = obj
    this.index = i
    this.srcx = src
    this.bannerUrl = bannerUrl
    this.patch({
      src: src,
      scale: 1,
    })
  }

  override _handleEnter() {
    Router.navigate('details', { src: this.bannerUrl, ind: this.index })
  }

  override _focus() {
    this.fireAncestors('$updateBigImage' as any, this.bannerUrl)
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

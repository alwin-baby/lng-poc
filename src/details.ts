import { Lightning, Utils, Router } from '@lightningjs/sdk'

interface DetailsTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: {
    RailWrapper: object
  }
  BigImage: object
}

export class Details
  extends Lightning.Component<DetailsTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<DetailsTemplateSpec>
{
  readonly BigImage = this.tag('BigImage' as any)!

  srcx = ''

  static override _template(): Lightning.Component.Template<DetailsTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
      },
      BigImage: {
        w: 576,
        h: 432,
        rect: true,
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 15 },
        x: 1000,
        y: 100,
      },
    }
  }

  anmInBigImage = this.BigImage.animation({
    duration: 0.5,
    repeat: 0,
    actions: [{ p: 'scale', v: { 0: 1, 1: 1.3 } }],
  })

  anmOutBigImage = this.BigImage.animation({
    duration: 0.5,
    repeat: 0,
    actions: [{ p: 'scale', v: { 0: 1.3, 1: 1 } }],
  })

  override _enable() {
    this.BigImage.on('txLoaded', () => {
      this.anmInBigImage.start()
    })
  }

  override _handleBack() {
    this.anmOutBigImage.start()
    Router.back()
  }

  override pageTransition() {
    return 'crossFade'
  }

  override set params(obj: { src: string; bannerUrl: string }) {
    const { src } = obj
    this.BigImage.patch({
      src: src,
    })
  }
}

import { Lightning, Utils, Router } from '@lightningjs/sdk'

interface DetailsTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: {
    RailWrapper: object
  }
  BigImage: object
  Details: {
    Title: object
    Description: object
  }
  IsPage: true
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
      Details: {
        Title: {
          x: 40,
          y: 185,
          shader: null,
          text: {
            text: 'regreg',
            fontSize: 80,
          },
          color: 0xfffbb03b,
        },
        Description: {
          x: 40,
          y: 290,
          w: 900,
          shader: null,
          text: {
            wordWrap: true,
            maxLines: 3,
            text: 'rgdrgerg',
            maxLinesSuffix: '...',
            fontSize: 30,
          },
          color: 0xfffbb03b,
        },
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
      const widgets = this.widgets as any
      if (widgets) {
        const videoWidget = widgets.videowidget
        const widgetBackground = videoWidget.tag('Background' as any)
        widgetBackground.patch({
          color: 0xff3af91d,
          alpha: 0.5,
        })
        const anmInWidget = widgetBackground.animation({
          duration: 0.5,
          repeat: 0,
          actions: [{ p: 'scale', v: { 0: 1, 1: 1.3 } }],
        })
        anmInWidget.start()
      }
    })
  }

  override _handleLeft() {
    this.anmOutBigImage.start()
    const widgets = this.widgets as any
    if (widgets) {
      const videoWidget = widgets.videowidget
      const widgetBackground = videoWidget.tag('Background' as any)
      widgetBackground.patch({
        color: 0xbbffffff,
        alpha: 0.5,
      })
      const anmOutWidget = widgetBackground.animation({
        duration: 0.5,
        repeat: 0,
        actions: [{ p: 'scale', v: { 0: 1.3, 1: 1 } }],
      })
      anmOutWidget.start()
    }
    Router.back()
  }

  // override _handleEnter() {
  //   const w = this.widgets as any
  //   const vw = w.videowidget
  //   const widgetBackground = vw.tag('Background' as any)
  //   widgetBackground.patch({
  //     w: 1000,
  //   })
  //   console.log(widgetBackground)
  // }

  override pageTransition() {
    return 'crossFade' as any
  }

  override set params(obj: { data: { bannerUrl: string; title: string; description: string } }) {
    const { data } = obj
    const { bannerUrl, title, description } = data
    this.BigImage.patch({
      src: bannerUrl,
    })
    this.tag('Details.Title' as any).text.patch({
      text: title,
    })
    this.tag('Details.Description' as any).text.patch({
      text: description,
    })
  }
}

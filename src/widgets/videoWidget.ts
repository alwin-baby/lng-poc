import { Lightning, Router } from '@lightningjs/sdk'

interface VideoWidgetTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: object
}

export class VideoWidget
  extends Lightning.Component<VideoWidgetTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<VideoWidgetTemplateSpec>
{
  txt = 'Alwin'

  static override _template(): Lightning.Component.Template<VideoWidgetTemplateSpec> {
    return {
      x: 200,
      y: 100,
      Background: {
        w: 576,
        h: 432,
        rect: true,
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 15 },
        x: 800,
        color: 0xbbffffff,
      },
    }
  }

  logg = (a: string) => console.log(a)

  override _enable() {
    setTimeout(() => {
      this.txt = 'Baby'
      Router.getActivePage()?._setState('FirstState')
    }, 2000)
  }
}

/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2022 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Lightning, Utils } from '@lightningjs/sdk'
import axios from 'axios'
import { item } from './temlate_specs/cardTemplateSpec'
import Card from './components/card'

interface HomeTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: {
    RailWrapper: object
  }
  BigImage: object
  Details: {
    Title: object
    Description: object
  }
}

export class Home
  extends Lightning.Component<HomeTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<HomeTemplateSpec>
{
  /*
   * The following properties exist to make it more convenient to access elements
   * below in a type-safe way. They are optional.
   *
   * See https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/TemplateSpecs?id=using-a-template-spec
   * for more information.
   */

  data: item[] = [] as item[]
  cardData: item = {} as item
  index = 0
  wrapperMarginFromLeft = 40
  cardWidthIncludingMargin = 200

  readonly Background = this.getByRef('Background')!
  readonly RailWrapper = this.tag('RailWrapper' as any)!
  readonly BigImage = this.tag('BigImage' as any)!

  static override _template(): Lightning.Component.Template<HomeTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
        RailWrapper: {
          y: 650,
          w: 1800,
          h: 500,
          color: 0xbbffffff,
        },
      },
      Details: {
        Title: {
          x: 40,
          y: 185,
          shader: null,
          text: {
            text: '',
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
            text: '',
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

  override _init() {
    this.getRails()
    this.stage.transitions.defaultTransitionSettings.duration = 3
    this.Background.animation({
      duration: 15,
      repeat: -1,
      delay: 1,
      actions: [
        {
          p: 'color',
          v: {
            0: { v: 0xfffbb03b },
            0.5: { v: 0xfff46730 },
            0.8: { v: 0xfffbb03b },
          },
        },
      ],
    }).start()
    this.RailWrapper.patch({
      x: this.wrapperMarginFromLeft,
    })
  }

  getRails() {
    axios
      .get(
        'https://api-entertainment.enlight.diagnal.com/v1b3/content/filters/dgnlsl30-movies-action?page=1&language=en&size=50',
      )
      .then((res) => {
        const rail: {
          type: typeof Card
          x: number
          props: { data: { src: string; bannerUrl: string; title: string; description: string } }
        }[] = []
        this.data = res.data.content
        this.data.map((cardItem, i) => {
          const url = cardItem.images.find((img) => img.width === 288)?.url || ''
          const bannerUrl = cardItem.images.find((img) => img.type === 'landscape')?.url || ''
          rail.push({
            type: Card,
            x: i * this.cardWidthIncludingMargin,
            props: {
              data: {
                src: url,
                bannerUrl: bannerUrl,
                title: cardItem.title,
                description: cardItem.description,
              },
            },
          })
        })
        this.RailWrapper.children = rail
        this._setState('a')
      })
      .catch((err) => console.log('err', err))
  }

  $updateBigImage(data: { bannerUrl: string; title: string; description: string }) {
    const { title, description, bannerUrl } = data
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

  handleTranslate() {
    if (this.index > 3) {
      this.RailWrapper.setSmooth(
        'x',
        -this.cardWidthIncludingMargin * (this.index - 4) + this.wrapperMarginFromLeft,
        {
          duration: 0.3,
        },
      )
    }
  }

  override pageTransition() {
    return 'crossFade'
  }

  override _handleEnter() {
    console.log('aaa')
  }

  override _handleLeft() {
    if (this.index > 0) {
      this.index -= 1
      this.handleTranslate()
    }
  }

  override _handleRight() {
    if (this.index < this.data.length) {
      this.index += 1
      this.handleTranslate()
    }
  }

  override _getFocused(): any {
    return this.RailWrapper.children[this.index]
  }
}

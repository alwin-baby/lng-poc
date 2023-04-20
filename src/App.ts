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
import { Lightning, Utils, Log } from '@lightningjs/sdk'
import axios from 'axios'
import Card from './components/card'

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: {
    RailWrapper: object
  }
}

export class App
  extends Lightning.Component<AppTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  /*
   * The following properties exist to make it more convenient to access elements
   * below in a type-safe way. They are optional.
   *
   * See https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/TemplateSpecs?id=using-a-template-spec
   * for more information.
   */
  readonly Background = this.getByRef('Background')!

  static override _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
        RailWrapper: {
          alpha: 0.2,
          x: 60,
          y: 700,
          color: 0xbbffffff,
          rect: true,
          w: 1800,
          h: 300,
        },
      },
    }
  }

  static getFonts() {
    return [
      {
        family: 'Regular',
        url: Utils.asset('fonts/Roboto-Regular.ttf'),
      },
    ]
  }

  async getRails() {
    await axios
      .get(
        'https://api-entertainment.enlight.diagnal.com/v1b3/content/filters/dgnlsl30-movies-action?page=1&language=en&size=50',
        // 'https://api-entertainment.enlight.diagnal.com/v1b3/content/filter',
      )
      .then((res) => {
        Log.info('res', res.data)
      })
      .catch((err) => console.log('err', err))
  }

  override _handleEnter() {
    console.log('aaa')
  }

  override _init() {
    const rail: [] = []
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
  }
}

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
import { Lightning, Router } from '@lightningjs/sdk'
import routes from './routes'
import { VideoWidget } from './widgets/videoWidget'
import { Home } from './home'
import { Details } from './details'

interface AppTemplateSpec extends Lightning.Component.TemplateSpec {
  Background: {
    RailWrapper: object
  }
  BigImage: object
}

export class App
  extends Router.App
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec>
{
  static override _template() {
    return {
      Pages: {
        Home: {
          type: Home,
        },
        Details: {
          type: Details,
        },
      },
      Widgets: {
        // this hosts all the widgets
        VideoWidget: {
          type: VideoWidget,
        },
      },
    }
  }

  // setting up the router for the application
  override _setup() {
    Router.startRouter(routes, this)
  }
}

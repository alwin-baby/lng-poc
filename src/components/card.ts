import Lightning from '@lightningjs/sdk/src/Lightning'
import CardTemplateSpec, { item } from '../temlate_specs/cardTemplateSpec'

class Card
  extends Lightning.Component<CardTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<CardTemplateSpec>
{
  data: item = {} as item
}

export default Card

import Lightning from '@lightningjs/sdk/src/Lightning'

export interface item {
  actor: object[]
  availableDays: any
  availableOn: number
  categoryId: string[]
  contentGuid: string
  countries: string[]
  description: string
  director: object[]
  displayDuration: number
  downloadUrl: string
  episodeNumber: string | number
  genre: string[]
  images: object[]
  isCastable: boolean
  isCcAvailable: boolean
  isDownloadable: boolean
  maxQualityAvailable: string
  mediaGuid: string
  parentalControl: object[]
  purchaseMode: string
  releaseYear: number
  seasonUid: string
  streams: string
  studio: string[]
  title: string
  trailers: object[]
  type: string
  uid: string
}

interface CardTemplateSpec extends Lightning.Component.TemplateSpec {
  // Image: object
  // Label: object
  data: item
}

export default CardTemplateSpec

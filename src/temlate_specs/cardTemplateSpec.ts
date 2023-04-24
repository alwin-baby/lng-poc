import Lightning from '@lightningjs/sdk/src/Lightning'

interface imageItems {
  height: number
  type: string
  url: string
  width: number
}

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
  images: imageItems[]
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

export interface railData {
  apiMapping: object[]
  content: item[]
  totalElements: number
  totalPages: number
}

export interface responseData {
  config: object
  data: railData
  headers: object
  request: object
  status: number
  statusText: string
}

interface CardTemplateSpec extends Lightning.Component.TemplateSpec {
  // Image: object
  // Label: object
  data: item
}

export default CardTemplateSpec

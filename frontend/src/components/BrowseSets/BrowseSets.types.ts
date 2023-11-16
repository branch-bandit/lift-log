import { SetType } from '../../utils/common.types'

export type BrowseSetsFormParams = {
  exerciseType?: SetType
  date?: string
  queryType: GetSetsQueryTypes
}

export enum GetSetsQueryTypes {
  ALL = 'ALL',
  BY_DATE = 'BY_DATE',
  BY_SET_TYPE = 'BY_SET_TYPE',
}

export enum GetSetsQueryTypeTitles {
  ALL = 'Get all sets',
  BY_DATE = 'By date',
  BY_SET_TYPE = 'By exercise type',
}

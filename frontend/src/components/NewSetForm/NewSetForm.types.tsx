import { SetType } from '../../utils/common.types'

export type CreateSetFormParams = {
  // todo: add "export enum exerciseType"
  exerciseType?: SetType
  reps?: number
  weight?: number
  wasFailure: boolean
  failureRep?: number
}

export enum SetTypeTitles {
  PULL_UP = 'Pull up',
  CHIN_UP = 'Chin up',
  PUSH_UP = 'Push up',
  DIP = 'Dip',
  BARBELL_SQUAT = 'Barbell squat',
  BARBELL_ROW = 'Barbell row',
  LAT_RAISE = 'Lat raise',
  BARBELL_BENCH_PRESS = 'Barbell bench press',
  DUMBELL_INCLINE_PRESS = 'Dumbell incline press',
}

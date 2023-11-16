export type CreateSetApiReqParams = {
  set_type: SetType
  reps: number
  weight: number
  failure_at?: number
}

export type GetSetsApiReqParams = {
  set_type?: SetType
  date?: string
}

// todo - create common folder for shared types across backend and frontend
export enum SetType {
  PULL_UP = 'PULL_UP',
  CHIN_UP = 'CHIN_UP',
  PUSH_UP = 'PUSH_UP',
  DIP = 'DIP',
  BARBELL_SQUAT = 'BARBELL_SQUAT',
  BARBELL_ROW = 'BARBELL_ROW',
  LAT_RAISE = 'LAT_RAISE',
  BARBELL_BENCH_PRESS = 'BARBELL_BENCH_PRESS',
  DUMBELL_INCLINE_PRESS = 'DUMBELL_INCLINE_PRESS',
}

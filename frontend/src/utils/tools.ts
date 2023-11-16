import axios from 'axios'
import { CreateSetApiReqParams, SetType } from './common.types'
import { CreateSetFormParams } from '../components/NewSetForm/NewSetForm.types'

export const checkDateStringFormat = (str?: string) => {
  if (!str) return false
  const regEx = /^\d{4}-\d{2}-\d{2}$/
  if (!str.match(regEx)) return false
  const dateTime = new Date(str).getTime
  if (!dateTime && dateTime !== 0) return false
  return true
}

export const getApiData = async (): Promise<any> => {
  const { data } = await axios.get(`http://localhost:3001/sets/`)
  return data
}

export const getApiDataBySetType = async (setType: SetType): Promise<any> => {
  const { data } = await axios.get(
    `http://localhost:3001/sets/?set_type=${setType}`
  )
  return data
}

export const getApiDataByDate = async (date: string): Promise<any> => {
  const { data } = await axios.get(`http://localhost:3001/sets/?date=${date}`)
  console.log(data)
  return data
}

export const getCreateSetApiReqParams = (
  formParams: CreateSetFormParams
): CreateSetApiReqParams | false => {
  const {
    exerciseType: set_type,
    failureRep: failure_at,
    reps,
    weight,
    wasFailure,
  } = formParams
  const RequiredParams = { set_type, reps, weight }

  if (Object.values(RequiredParams).includes(undefined)) {
    //todo form validation errors
    console.log('form error - required value missing')
    return false
  }

  if (wasFailure) {
    return { ...RequiredParams, failure_at } as CreateSetApiReqParams
  }

  return RequiredParams as CreateSetApiReqParams
}

export const postNewSet = async (
  params: CreateSetApiReqParams
): Promise<void> => {
  await axios.post(`http://localhost:3001/sets/`, params)
}

export const deleteSet = async (id: string): Promise<any> => {
  const response = await axios.delete(`http://localhost:3001/sets/${id}`)
  console.log(response)
  return response
}

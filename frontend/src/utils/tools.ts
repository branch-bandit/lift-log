import axios from 'axios'
import { CreateSetApiReqParams, SetType } from './common.types'

export const checkDateStringFormat = (str?: string) => {
  if (!str) return false
  const regEx = /^\d{4}-\d{2}-\d{2}$/
  if (!str.match(regEx)) return false
  const dateTime = new Date(str).getTime
  if (!dateTime && dateTime !== 0) return false
  return true
}

export const getApiData = async () => {
  const { data } = await axios.get(`http://localhost:3001/sets/`)
  return data
}

export const getApiDataBySetType = async (setType: SetType) => {
  const { data } = await axios.get(
    `http://localhost:3001/sets/?set_type=${setType}`
  )
  return data
}

export const getApiDataByDate = async (date: string) => {
  const { data } = await axios.get(`http://localhost:3001/sets/?date=${date}`)
  return data
}

export const postNewSet = async (
  params: CreateSetApiReqParams
): Promise<void> => {
  await axios
    .post(`http://localhost:3001/sets/`, params)
    .then(function (res) {
      console.log(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

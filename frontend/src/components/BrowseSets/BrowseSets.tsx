import React, { useState, useEffect } from 'react'
import { SetType } from '../../utils/common.types'
import {
  BrowseSetsFormParams,
  GetSetsQueryTypeTitles,
  GetSetsQueryTypes,
} from './BrowseSets.types'
import {
  checkDateStringFormat,
  getApiData,
  getApiDataByDate,
  getApiDataBySetType,
} from '../../utils/tools'
import { SetTypeTitles } from '../NewSetForm/NewSetForm.types'

const initialState = {
  formState: {
    setType: undefined,
    date: undefined,
    queryType: GetSetsQueryTypes.ALL,
  },
}

const BrowseSets: React.FC = () => {
  const [apiData, setApiData] = useState([])
  const [formState, setFormState] = useState<BrowseSetsFormParams>(
    initialState.formState
  )
  //   const [messages, setMessages] = useState<
  //     { message: string; isError: boolean }[]
  //   >([])

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData')
      console.log(formState)
      console.log(checkDateStringFormat(formState.date))
      if (formState.queryType === GetSetsQueryTypes.ALL) {
        await getApiData().then(data => {
          console.log(data)
          setApiData(data)
        })
      }

      if (
        formState.queryType === GetSetsQueryTypes.BY_DATE &&
        checkDateStringFormat(formState.date) !== undefined
      ) {
        console.log(checkDateStringFormat(formState.date))
        await getApiDataByDate(formState.date as string).then(data => {
          console.log(data)
          setApiData(data)
        })
      }

      if (
        formState.queryType === GetSetsQueryTypes.BY_SET_TYPE &&
        formState.exerciseType !== undefined
      ) {
        await getApiDataBySetType(formState.exerciseType as SetType).then(
          data => {
            console.log(data)
            setApiData(data)
          }
        )
      }
    }
    fetchData().catch(console.error)
  }, [formState])

  const setFormStateField = (key: string, value: string | boolean): void => {
    setFormState(prevState => ({ ...prevState, [key]: value }))
  }

  return (
    <>
      <div
        style={{
          maxWidth: '600px',
          boxSizing: 'border-box',
          margin: '10px 20vw 10px 20vw',
          padding: '10px 70px 10px 70px',
          fontFamily: 'roboto',
          display: 'grid',
        }}
      >
        <div
          style={{
            padding: '3% 5% 3% 5%',
            marginBottom: '10px',
            display: 'grid',
            gridTemplateColumns: '63% 34%',
            gridTemplateRows: '30px 30px',
            gap: '2vh',
          }}
        >
          <label htmlFor="browse_sets_exercise_type">Browse sets by</label>
          <select
            id="query_type"
            onChange={e => setFormStateField('queryType', e.target.value)}
          >
            {Object.entries(GetSetsQueryTypeTitles).map(item => {
              return (
                <option
                  style={{ margin: '8px' }}
                  value={item[0]}
                >
                  {item[1]}
                </option>
              )
            })}
          </select>
          {formState.queryType === GetSetsQueryTypes.BY_SET_TYPE && (
            <>
              <label htmlFor="browse_sets_exercise_type">Exercise type</label>
              <select
                id="browse_sets_exercise_type"
                onChange={e =>
                  setFormStateField('exerciseType', e.target.value)
                }
              >
                {Object.entries(SetTypeTitles).map(item => {
                  return (
                    <option
                      style={{ margin: '8px' }}
                      value={item[0]}
                    >
                      {item[1]}
                    </option>
                  )
                })}
              </select>
            </>
          )}
          {formState.queryType === GetSetsQueryTypes.BY_DATE && (
            <>
              <label htmlFor="date_input">Date (in format YYYY/MM/DD)</label>
              <input
                id="date_input"
                type="text"
                placeholder="yyyy/mm/dd"
                value={formState.date || ''}
                onChange={e => setFormStateField('date', e.target.value)}
              />
            </>
          )}
        </div>
        <div style={{ marginTop: '20px' }}>{JSON.stringify(apiData)}</div>
      </div>
    </>
  )
}

export default BrowseSets

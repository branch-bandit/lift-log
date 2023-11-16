import React, { useState, useEffect, SetStateAction, Dispatch } from 'react'
import { ApiResponseSetItem, SetType } from '../../utils/common.types'
import {
  BrowseSetsFormParams,
  GetSetsQueryTypeTitles,
  GetSetsQueryTypes,
} from './BrowseSets.types'
import {
  checkDateStringFormat,
  deleteSet,
  getApiData,
  getApiDataByDate,
  getApiDataBySetType,
} from '../../utils/tools'
import { SetTypeTitles } from '../NewSetForm/NewSetForm.types'
import ListOfSets from '../ListOfSets/ListOfSets'

const initialState = {
  formState: {
    setType: undefined,
    date: undefined,
    queryType: GetSetsQueryTypes.ALL,
  },
}

interface BrowseSetsProps {
  needsUpdate: boolean
  setNeedsUpdate: Dispatch<SetStateAction<boolean>>
}

const BrowseSets: React.FC<BrowseSetsProps> = ({
  needsUpdate,
  setNeedsUpdate,
}) => {
  // todo error handling
  const [apiData, setApiData] = useState<ApiResponseSetItem[]>([])
  const [formState, setFormState] = useState<BrowseSetsFormParams>(
    initialState.formState
  )

  useEffect(() => {
    const fetchData = async () => {
      if (formState.queryType === GetSetsQueryTypes.ALL) {
        await getApiData().then(data => {
          setApiData(data)
          setNeedsUpdate(false)
        })
      }

      if (
        formState.queryType === GetSetsQueryTypes.BY_DATE &&
        checkDateStringFormat(formState.date) !== false
      ) {
        await getApiDataByDate(formState.date as string).then(data => {
          setApiData(data)
          setNeedsUpdate(false)
        })
      }

      if (
        formState.queryType === GetSetsQueryTypes.BY_SET_TYPE &&
        formState.exerciseType !== undefined
      ) {
        await getApiDataBySetType(formState.exerciseType as SetType).then(
          data => {
            setApiData(data)
            setNeedsUpdate(false)
          }
        )
      }
    }
    fetchData().catch(console.error)
  }, [formState, needsUpdate, setNeedsUpdate])

  const handleRemoveSet = async (id: string) => {
    await deleteSet(id)
      .then(response => {
        if (response && response.status === 200) {
          setNeedsUpdate(true)
        }
      })
      .catch(console.error)
  }

  const setFormStateField = (key: string, value: string | boolean): void => {
    setFormState(prevState => ({ ...prevState, [key]: value }))
  }

  return (
    <div className="browse-sets-outer-container">
      <div className="browse-sets-inner-container">
        <label htmlFor="browse_sets_exercise_type">Browse sets by</label>
        <select
          id="query_type"
          onChange={e => setFormStateField('queryType', e.target.value)}
        >
          {Object.entries(GetSetsQueryTypeTitles).map((item, index) => {
            return (
              <option
                className="select-option"
                value={item[0]}
                key={index}
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
              onChange={e => setFormStateField('exerciseType', e.target.value)}
            >
              {Object.entries(SetTypeTitles).map((item, index) => {
                return (
                  <option
                    className="select-option"
                    value={item[0]}
                    key={index}
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
            <label htmlFor="date_input">Date (in format YYYY-MM-DD)</label>
            <input
              id="date_input"
              type="text"
              placeholder="yyyy-mm-dd"
              value={formState.date || ''}
              onChange={e => setFormStateField('date', e.target.value)}
            />
          </>
        )}
      </div>
      <ListOfSets
        items={apiData}
        deleteItem={handleRemoveSet}
      />
    </div>
  )
}

export default BrowseSets

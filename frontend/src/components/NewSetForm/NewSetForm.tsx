import React, { Dispatch, SetStateAction, useState } from 'react'
import { CreateSetFormParams, SetTypeTitles } from './NewSetForm.types'
import { SetType } from '../../utils/common.types'
import { getCreateSetApiReqParams, postNewSet } from '../../utils/tools'

const initialState = {
  formState: {
    exerciseType: SetType.PULL_UP,
    reps: undefined,
    weight: undefined,
    wasFailure: false,
    failureRep: undefined,
  },
}

interface NewSetFormProps {
  setNeedsUpdate: Dispatch<SetStateAction<boolean>>
}

const NewSetForm: React.FC<NewSetFormProps> = ({ setNeedsUpdate }) => {
  // todo error handling
  const [formState, setFormState] = useState<CreateSetFormParams>(
    initialState.formState
  )

  const setFormStateField = (key: string, value: string | boolean): void => {
    setFormState(prevState => ({ ...prevState, [key]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const reqParams = getCreateSetApiReqParams(formState)
    if (!reqParams) return

    await postNewSet(reqParams)
      .then(() => {
        setFormState({
          ...initialState.formState,
          exerciseType: formState.exerciseType,
        })
        setNeedsUpdate(true)
      })
      .catch(console.error)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="add-set-form"
      >
        <div className="add-set-form-outer-container">
          <div className="add-set-form-inner-container">
            <label htmlFor="exercise_type">Exercise type</label>
            <select
              id="exercise_type"
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
            <label htmlFor="reps_input">Number of reps</label>
            <input
              id="reps_input"
              type="number"
              placeholder="0"
              value={formState.reps || ''}
              onChange={e => setFormStateField('reps', e.target.value)}
            />
            <label htmlFor="weight_input">Weight used</label>
            <input
              id="weight_input"
              type="number"
              placeholder="100"
              value={formState.weight || ''}
              onChange={e => setFormStateField('weight', e.target.value)}
            />
            <label>Was the set to failure?</label>
            <input
              type="checkbox"
              className="add-set-form-checkbox"
              checked={formState.wasFailure}
              onChange={() =>
                setFormStateField('wasFailure', !formState.wasFailure)
              }
            />
            {formState.wasFailure ? (
              <>
                <label htmlFor="failure_rep">On which rep?</label>
                <input
                  id="weight_input"
                  type="number"
                  value={formState.failureRep || ''}
                  onChange={e => setFormStateField('weight', e.target.value)}
                />
              </>
            ) : (
              <div />
            )}
          </div>
          <button
            type="submit"
            className="add-set-form-submit-button"
          >
            Submit set
          </button>
        </div>
      </form>
    </>
  )
}

export default NewSetForm

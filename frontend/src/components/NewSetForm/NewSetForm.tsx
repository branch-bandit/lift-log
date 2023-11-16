import React, { useState } from 'react'
import { CreateSetFormParams, SetTypeTitles } from './NewSetForm.types'
import { CreateSetApiReqParams, SetType } from '../../utils/common.types'
import { postNewSet } from '../../utils/tools'

const initialState = {
  formState: {
    exerciseType: SetType.PULL_UP,
    reps: undefined,
    weight: undefined,
    wasFailure: false,
    failureRep: undefined,
  },
}

const getApiReqParams = (
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

const NewSetForm: React.FC = () => {
  const [formState, setFormState] = useState<CreateSetFormParams>(
    initialState.formState
  )
  //   const [messages, setMessages] = useState<
  //     { message: string; isError: boolean }[]
  //   >([])

  const setFormStateField = (key: string, value: string | boolean): void => {
    setFormState(prevState => ({ ...prevState, [key]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const reqParams = getApiReqParams(formState)
    if (!reqParams) return

    await postNewSet(reqParams)
      .then(() =>
        setFormState({
          ...initialState.formState,
          exerciseType: formState.exerciseType,
        })
      )
      .catch(console.error)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '600px',
          boxSizing: 'border-box',
          margin: '40px 20vw 10px 20vw',
          padding: '8vh 70px 2vh 70px',
          fontFamily: 'roboto',
          display: 'grid',
        }}
      >
        <div
          style={{
            padding: '3% 5% 3% 0',
            marginBottom: '20px',
            display: 'grid',
            gridTemplateColumns: '63% 34%',
            gridTemplateRows: '12% 12% 12% 12% 12%',
            gap: '2vh',
            height: '200px',
          }}
        >
          <label htmlFor="exercise_type">Exercise type</label>

          <select
            id="exercise_type"
            onChange={e => setFormStateField('exerciseType', e.target.value)}
          >
            {Object.entries(SetTypeTitles).map((item, index) => {
              return (
                <option
                  style={{ margin: '8px' }}
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
            style={{ height: '100%' }}
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
          style={{ height: '36px' }}
        >
          Submit set
        </button>
        {/* {messages.map((messageObj, index) => (
          <p key={index}>
            <span
              style={{ width: '20px', display: 'inline-block' }}
              role="img"
              aria-label={messageObj.isError ? 'error' : 'check'}
            >
              {messageObj.isError ? '❌' : '✅'}
            </span>
            {messageObj.message}
          </p>
        ))} */}
      </form>
    </>
  )
}

export default NewSetForm

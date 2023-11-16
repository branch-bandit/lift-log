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
        style={{
          width: '800px',
          boxSizing: 'border-box',
          margin: 'auto',
          padding: '5vh 5vw 5vh 5vw',
          fontFamily: 'roboto',
          display: 'grid',
          borderBottom: '1px solid grey',
        }}
      >
        <div
          style={{
            padding: '0 100px 20px 100px',
            marginBottom: '10px',
            display: 'grid',
            gridTemplateColumns: '63% 34%',
            gridTemplateRows: '12% 12% 12% 12% 12%',
            gap: '3vh',
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
          style={{ height: '36px', width: '500px', margin: 'auto' }}
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

import { ApiResponseSetItem } from '../../utils/common.types'
import { SetTypeTitles } from '../NewSetForm/NewSetForm.types'

interface ListOfSetsProps {
  items: [] | ApiResponseSetItem[]
  deleteItem: (id: string) => Promise<void>
}

interface ListItemProps {
  item: ApiResponseSetItem
  deleteItem: (id: string) => Promise<void>
}

const ListItem: React.FC<ListItemProps> = ({ item, deleteItem }) => {
  const itemInfoStrings = {
    date: `Date: ${item.date.toString().slice(0, 10)}`,
    exercise: `Exercise: ${SetTypeTitles[item.set_type]}`,
    weight: `Weight: ${item.weight}`,
    reps: `Reps: ${item.reps}`,
    failureAt:
      item.failure_at === null
        ? item.failure_at
        : `failureAt: ${item.failure_at}`,
  }

  const { date, exercise, reps, weight, failureAt } = itemInfoStrings

  return (
    <li style={{ display: 'flex', borderBottom: '1px solid grey' }}>
      <p style={{ width: '130px', paddingLeft: '70px' }}>{date}</p>
      <p style={{ width: '170px' }}>{exercise}</p>
      <p style={{ width: '100px' }}>{weight}</p>
      <p style={{ width: '100px' }}>{reps}</p>
      <p style={{ width: '100px' }}>{failureAt}</p>
      <button
        onClick={() => deleteItem(item.id)}
        style={{ height: '20px', width: '100px', marginTop: '12px' }}
      >
        delete
      </button>
    </li>
  )
}

const ListOfSets: React.FC<ListOfSetsProps> = ({ items, deleteItem }) => {
  return (
    <>
      <ul style={{ padding: '10px 0 10px 0' }}>
        {items.map((item, index) => (
          <ListItem
            item={item}
            key={item.id}
            deleteItem={deleteItem}
          />
        ))}
      </ul>
      {/* <div style={{ marginTop: '20px' }}>{JSON.stringify(items)}</div> */}
    </>
  )
}

export default ListOfSets

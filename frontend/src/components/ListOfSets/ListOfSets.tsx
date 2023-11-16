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
    <li className="list-of-sets-list-item">
      <p className="list-of-sets-section-first">{date}</p>
      <p className="list-of-sets-section-large">{exercise}</p>
      <p className="list-of-sets-section-small">{weight}</p>
      <p className="list-of-sets-section-small">{reps}</p>
      <p className="list-of-sets-section-small">{failureAt}</p>
      <button
        onClick={() => deleteItem(item.id)}
        className="list-of-sets-button"
      >
        Delete
      </button>
    </li>
  )
}

const ListOfSets: React.FC<ListOfSetsProps> = ({ items, deleteItem }) => {
  return (
    <ul className="list-of-sets-list">
      {items.map((item, index) => (
        <ListItem
          item={item}
          key={item.id}
          deleteItem={deleteItem}
        />
      ))}
    </ul>
  )
}

export default ListOfSets

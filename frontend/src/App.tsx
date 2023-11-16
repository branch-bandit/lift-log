import React, { FC, useState } from 'react'
import NewSetForm from './components/NewSetForm/NewSetForm'
import BrowseSets from './components/BrowseSets/BrowseSets'

const App: FC = () => {
  const [needsUpdate, setNeedsUpdate] = useState<boolean>(false)

  return (
    <>
      <NewSetForm setNeedsUpdate={setNeedsUpdate} />
      <BrowseSets
        needsUpdate={needsUpdate}
        setNeedsUpdate={setNeedsUpdate}
      />
    </>
  )
}

export default App

import React, { FC } from 'react'
import NewSetForm from './components/NewSetForm/NewSetForm'
import BrowseSets from './components/BrowseSets/BrowseSets'

const App: FC = () => {
  return (
    <>
      <NewSetForm />
      <BrowseSets />
    </>
  )

  // return (
  //   <div className="App">
  //     <header className="App-header"></header>
  //   </div>
  // )
}

export default App

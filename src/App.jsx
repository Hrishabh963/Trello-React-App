import { Routes,Route } from 'react-router-dom'
import BoardContainer from './modules/Board/Components/BoardContainer'
import Header from './modules/Header/Components/Header'
import ListContainer from './modules/List/Components/ListContainer'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<BoardContainer />} />
        <Route path='/board/:id' element={<ListContainer />} />
      </Route>
    </Routes>
  )
}

export default App

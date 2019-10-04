import * as React from "react"
import "./index.less"
import store from './store'
import { Provider } from 'react-redux'
import TodoList from './components/TodoList'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          Hello React TS
          <TodoList />
        </div>
      </Provider>
    )
  }
}

export default App
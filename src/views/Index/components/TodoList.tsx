import React from 'react'
import { addTodoItem, deleteTodoItem, changeInputValue } from '../store/actionCreators'
import { connect } from 'react-redux';
import { IStoreState } from '../store/types';
import { Dispatch } from 'redux';
interface IProps {
  inputValue:string,
  list:Array<any>|any[]
  handleDeleteItem(index:number):void,
  handleAddItem():void,
  handleChangeValue(e:React.FormEvent<HTMLInputElement>):void
}

const TodoList:React.FC<IProps> = (props:IProps):React.ReactElement => {
  const { inputValue, list, handleAddItem, handleChangeValue, handleDeleteItem } = props
  return (
    <div>
      <input value={inputValue} onChange={handleChangeValue} type="text" placeholder='请输入内容' />
      <button onClick={handleAddItem}>提交</button>
      <ul>
        {
          list.map((item, index) => (
            <li onClick={() => handleDeleteItem(index)} key={item}>{item}</li>
          ))
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state:IStoreState) => ({
  inputValue: state.inputValue,
  list: state.list
})

const mapDispatchToProps = (dispatch:Dispatch) => ({
  handleChangeValue(e:React.FormEvent<HTMLInputElement>) {
    const action = changeInputValue(e.currentTarget.value)
    dispatch(action)
  },
  handleAddItem() {
    const action = addTodoItem()
    dispatch(action)
  },
  handleDeleteItem(index:number) {
    const action = deleteTodoItem(index)
    dispatch(action)
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
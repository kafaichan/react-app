import React, {Component} from 'react';
import "./App.css"

const style = {
  container: {
    backgroundColor: '#eeffee'
  },

  highlight: {
    backgroundColor: "yellow"
  }
}

class App extends Component {
  add = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  minus() {
    this.setState({
      count: this.state.count - 1
    })
  }

  addTime = () => {
    let currentTimes = [...this.state.times]
    currentTimes.push((new Date()).toString())
    this.setState({
      times: currentTimes
    })
  }

  onItemClickHandler = (index) => {
    let newTodos = [...this.state.todos]
    if(newTodos[index].isDone == 1) {
      newTodos[index].isDone = 0
    }else if(newTodos[index].isDone == 0){
      newTodos[index].isDone = 1
    }

    this.setState({
      todos: newTodos
    })
  }

  addItem = () => {
    let newTodos = [...this.state.todos]
    newTodos.push({
      'isDone': 0,
      'name': this.state.value
    })
    this.setState({
      todos: newTodos,
      value: ''
    })
  }

  removeToDoItem = (e, index) => {
    e.stopPropagation()
    let newTodos = [...this.state.todos]
    newTodos.splice(index, 1)

    this.setState({
      todos: newTodos
    })
  }

  changeHandler = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  constructor(props) {
    super(props)
    this.minus = this.minus.bind(this)
    this.state = {
      count: 0,
      times: [],
      todos: [],
      value: ''
    }
  }

  render() {
    return (
      <div style={style.container}>
        Count: {this.state.count}
        <button onClick={this.add}>+</button>
        <button onClick={this.minus}>-</button>        
      
        <ul>
          { 
            this.state.times.map((time) => {
              return (
                <li>{time}</li>
              )
          })}
        </ul>

        <button onClick={this.addTime}>Add Current Time</button>

        <ul>
          {this.state.todos.map((todo, index)  => {
            return (
              <li className={(todo.isDone == 1) ? 'App-deleteitem' : ''} onClick={() => {this.onItemClickHandler(index)}}>{index+1}: {todo.name}
              <button onClick={(e) => {this.removeToDoItem(e, index)}}>Remove Item</button></li>
            )
          })}
        </ul>
        <input type="text" value={this.state.value} onChange={this.changeHandler}/>
        <button onClick={this.addItem}>Add todo item</button>
      </div>

    )
  }
}

export default App;

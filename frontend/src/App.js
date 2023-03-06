import React from 'react';
import './App.css';

class App extends React.Component{      //inherits from React class
  constructor(props){
    super(props);
    // props = properties - look at notes
    // The state is a built-in React object that is used to contain data or information about the component. 
    this.state = {
      todoList:[],  //Array of list items
      //currently held item list.
      // Every time we hit edit, we are going to prepopulate this with these values.
      activeItem:{
        id:null,
        title:'',
        completed:false,
      },
      //editing: lets us know if we are editing an item or submitting a new one.
      editing:false,
    }
    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  };


  // The componentWillMount() method allows us to execute the React code synchronously 
  // when the component gets loaded or mounted in the DOM (Document Object Model). 
  // This method is called during the mounting phase of the React Life-cycle.
  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log('Fetching...')

    //use fetch api to mnake api calls
    fetch('http://127.0.0.1:8000/api/task-list/')       //fetching api url
    .then(response => response.json())                  //converting response to JSON
    .then(data => 
      this.setState({
        todoList:data
      })
      )
  }

  // e is our keyup event
  handleChange(e){
    
    var name = e.target.name      // name of attribute we are editing (input field).
    var value = e.target.value    //title to the item we are creating
    console.log('Name:', name)
    console.log('Value:', value)
    //setting state using a spread operator:
    this.setState({
      activeItem:{
        ...this.state.activeItem, //attribute we are updating
        title:value               //we want to update the title, with the update of value.
      }
    })
  }

  handleSubmit(e){
    // First its going to prevent the form from submitting, because we want to manually submit that.
    e.preventDefault()
    console.log('Item:', this.state.activeItem) //consoling out result as test

    var url = 'http://127.0.0.1:8000/api/task-create/'      //our base url, dynamic will be added later
    fetch(url, {
      //data we are sending:
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      // stringafy used as its needed for fetch api
      body:JSON.stringify(this.state.activeItem)
    }).then((response) => {
      this.fetchTasks()
      this.setState({
        activeItem:{
          id:null,
          title:'',
          completed:false,
        }
      }).catch(function(error){ //Catching errors
        console.log('Error', error)
      })
    })

  }
  

  render(){                             //Render method
    var tasks = this.state.todoList
    return(
      <div className="container">

        <div id="task-container">
          <div id="form-wrapper">
            {/* form: */}
            <form onSubmit={this.handleSubmit} id="form">
              {/* flexbox: */}
              <div className="flex-wrapper">
                {/* Divs for input styling for input field and submit button: */}
                <div style={{flex:6}}>
                  <input onChange= {this.handleChange} className="form-control" id="title" type="text" name="title" placeholder="Add task.."/>
                </div>

                <div style={{flex: 1}}>
                  <input id="submit" className="btn btn-warning" type="submit" name="add"/>
                </div>

              </div>
            </form>
          </div>

          <div id="list-wrapper">
              {/* passing in the object we are refercing in the current iteration of the loop; */}
              {/* and the index of the current iteration of the loop we're in */}
              {tasks.map(function(task, index){   
                return(
                  // Here we will return the list-wrapper/task-wrapper item
                  // Key (index of loop), and a few classes as attributes:
                  //task wrapper is our container for the task we are viewing, flex wrapper is to keep everything in line
                  <div key={index} className="task-wrapper flex-wrapper">
                    {/* using span tags to check everything is working */}
                    {/* Flex 7 - widest object in the list */}
                    <div style={{flex:7}}>
                        <span>{task.title}</span>
                    </div>
                    <div style={{flex:1}}>
                    <button type="button" className="btn btn-info">Edit</button>
                    </div>
                    <div style={{flex:1}}>
                    <button type="button" className="btn btn-info delete">Delete</button>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    )
  }
}

export default App;

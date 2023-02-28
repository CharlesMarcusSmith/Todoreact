import React from 'react';
import './App.css';

class App extends React.Component{      //inherits from React class
  render(){                             //Render method
    

    return(
      <div classname="container">

        <div id="task-container">
          <div id="form-wrapper">
            {/* form: */}
            <form id="form">
              {/* flexbox: */}
              <div classname="flex-wrapper">
                {/* Divs for input styling for input field and submit button: */}
                <div style={{flex:6}}>
                  <input className="form-control" id="title" type="text" name="title" placeholder="Add task.."/>
                </div>

                <div style={{flex: 1}}>
                  <input id="submit" className="btn btn-warning" type="submit" name="add"/>
                </div>

              </div>
            </form>
          </div>




          <div id="list-container">

          </div>
        </div>
      </div>
    )
  }
}

export default App;

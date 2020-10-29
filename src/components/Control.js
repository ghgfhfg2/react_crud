import React from 'react';

function Control(props) {
    return (
      <ul>
        <li>
          <button
            onClick={function(e){
              e.preventDefault();
              props.onChangeMode('create');
            }}
          >Create</button>
        </li>
        <li>
          <button
            onClick={function(e){
              e.preventDefault()
              props.onChangeMode('update');
            }}
          >Update</button>
        </li>
        <li>
          <input type="button" value="Delete"
            onClick={function(e){
              e.preventDefault();
              props.onChangeMode('delete');
            }}
          ></input>
        </li>
      </ul>
      );
  }

  export default Control;
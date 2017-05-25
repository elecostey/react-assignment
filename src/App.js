import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h2 id="component" onClick={toggleColors}>Click on the text to change the color</h2>
        <form>
          Modify text: <input id='newText' type="text" onChange={changeContent}/>

        </form>
      </div>
    );
  }
}

export default App;

function getRandomcolor() {
    $.ajax({
      method: 'GET',
      url: "http://www.colr.org/json/color/random",
      dataType: 'json',
      complete: function (response) {

      		var object = JSON.parse(response.responseText);
          $('#component').css({color : '#'+object.colors[0].hex});
      },
      error: function () {
        console.log('an error occured, couldnt get random color.');
      },
    });
}

function colorBlack() {
    $('#component').css({color : 'rgb(0, 0, 0)'});
}

function toggleColors() {
    console.log($('#component').css('color'));
    if ($('#component').css('color') === 'rgb(0, 0, 0)' ) {
      getRandomcolor();
    } else {
      colorBlack();
    }
}

function changeContent() {
    $('#component').html($('#newText').val())
}

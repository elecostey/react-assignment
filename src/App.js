import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: 'white',
            content: 'Random color App'
        };

        this.changeColor = this.changeColor.bind(this);
        this.updateContent = this.updateContent.bind(this);
    }

    changeColor() {
        const that = this;
        $.ajax({
            method: 'GET',
            url: "http://www.colr.org/json/color/random",
            dataType: 'json',
            success: function (response) {
                that.setColor(response.colors[0].hex);
            },
            error: function () {
                console.log('an error occured, couldnt get random color.');
            }
        });
    }

    setColor(randomColor) {
        const color = this.state.color === 'white' ? `#${randomColor}` : 'white';
        this.setState({color: color });
    }

    updateContent(e) {
        const updatedContent = e.target.value;
        this.setState({content: updatedContent});
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2 id="component" style={{color:this.state.color}}>{this.state.content}</h2>
                </div>
                <form className='form'>
                    Modify text: <input id='newText' type="text" onChange={this.updateContent}/>
                </form>
                <button onClick={this.changeColor}>change color</button>
            </div>
        );
    }
}

export default App;
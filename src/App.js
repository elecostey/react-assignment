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

        this.toggleColor = this.toggleColor.bind(this);
        this.updateContent = this.updateContent.bind(this);
    }

    toggleColor() {
        if (this.state.color === 'white') {
            const that = this;
            $.ajax({
                method: 'GET',
                url: "http://www.colr.org/json/color/random",
                dataType: 'json',
                success: function (response) {
                    const randomColor = `#${response.colors[0].hex}`;
                    that.setState({ color: randomColor });
                },
                error: function () {
                    console.log('an error occured, couldnt get random color.');
                }
            });
        } else {
            this.setState({ color: 'white' });
        }
    }

    updateContent(e) {
        const updatedContent = e.target.value;
        this.setState({ content: updatedContent });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={ logo } className="App-logo" alt="logo"/>
                    <h2 id="component" style={{ color:this.state.color }}>{ this.state.content }</h2>
                </div>
                <form className='form'>
                    Modify text: <input id='newText' type="text" onChange={ this.updateContent }/>
                </form>
                <button onClick={ this.toggleColor }>Toggle color</button>
            </div>
        );
    }
}

export default App;
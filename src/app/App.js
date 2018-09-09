import React from 'react';
import {File} from './file';
import {FilesUpload} from './fileUpload';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            /*
            files format:
            {
                "meta": ...,
                "text": ...
            }
            */
            files: [],
            isis_phrases_list: [],
        }

        this.handleFileAdd = this.handleFileAdd.bind(this);
    }

    render() {
        var files = this.state.files;

        return (
            <div>
                <img src="/images/isis-flag.jpg" />

                <div style={{width: "100%", display: "block"}}>
                    <FilesUpload files={this.state.files} handleFileAdd={this.handleFileAdd} />
                </div>

                <br/>

                <div style={{width: "100%", display: "block"}}>
                    { files.map( file => (
                        <File 
                            file={file}
                        />
                    ))}
                </div>
                
            </div>
        );
    }

    componentWillMount(){
        var isis_phrases_list;
        fetch('isis_phrases.txt')
            .then(data => data.text())
            .then(text => {
                isis_phrases_list = text.split('\n');
                this.setState({
                    isis_phrases_list
                });
            })
    }

    handleFileAdd(_file) {
        // will be called when new file is uploaded
        this.setState({
            files: this.state.files.concat(_file)
        });
    }
}

export default App;
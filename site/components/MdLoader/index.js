
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import hljs from 'highlight.js';
import 'node_modules/highlight.js/styles/atom-one-dark.css';
// react-markdown  表格支持不佳
export default class MdLoader  extends Component{
    constructor(props){
        super(props)
        marked.setOptions({
            highlight: code => hljs.highlightAuto(code).value,
        });
    }
    render(){
        debugger
        const html =marked(this.getDoc());
        return(
            <div dangerouslySetInnerHTML={{__html:html}}></div>
        )
    }
}
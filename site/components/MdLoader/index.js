
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import Code from './code'
import hltJs from 'highlight.js';
import './index.less';
import 'node_modules/highlight.js/styles/tomorrow.css';
// react-markdown  表格支持不佳
export default class MdLoader extends Component {
    constructor(props) {
        super(props)
        this.components = new Map;
        const renderer = new marked.Renderer();
        renderer.code = (code, language) => {
            // 检查语言的合法性
            const validLang = !!(language && hltJs.getLanguage(language));
            const highlighted = validLang ? hltJs.highlight(language, code).value : code;
            return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
        }
        renderer.table = (header, body) => {
            return `<table cellspacing="0" ><thead>${header}</thead><tbody>${body}</tbody></table>`;
        };
        // 添加自定义配置
        marked.setOptions({ renderer });
    }
    componentDidMount() {
        this.renderDemoDOM();
    }
    renderDemoDOM () {
        for (const [id, component] of this.components) {
                const div =  document.getElementById(id);
                if (div instanceof HTMLElement) {
                    ReactDOM.render(component, div);
                }
        }
    }
    render() {
        const md = this.getDoc()
        this.components.clear()
        const html = marked(md.replace(/:::\s?demo\s?([^]+?):::/g, (match, p1, offset) => {
            const id = offset.toString(36);
            this.components.set(id, React.createElement(Code, {
                marked,
                name: this.constructor.name,
                id
            }, p1));
            return `<div id=${id}></div>`;
        }));
        return (
            <div dangerouslySetInnerHTML={{ __html: html }} className="md-page"></div>
        )
    }
}
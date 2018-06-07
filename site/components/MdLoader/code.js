import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'babel-standalone';
export default class Code extends Component {
    constructor(props) {
        super(props)
        const { children, marked } = this.props
        const doc = children.match(/([^]*)\n?(```[^]+```)/)
        this.desc = marked(doc[1])
        this.originCode = doc[2].match(/```(.*)\n?([^]+)```/)[2]
        this.preCode = marked(doc[2])
        this.renderId = `${parseInt(Math.random() * 1e9 + props.id).toString(36)}`
    }
    state = {
        showCode: false
    }
    handleToggle = () => {
        this.setState({
            showCode: !this.state.showCode
        })
    }
    componentDidMount = () => {
        this.runCode(this.originCode)
    }
    runCode = code => {
        const { name } = this.props;
        const _imports = code.match(/import .*/g)
        const mainCode = code.replace(/import .*/g, '')
        // const dep = _imports[0].match(/import(.*)from/)[1].trim(
        console.log(name)
        import('../../../src').then(v =>{
            const args = ['context', 'React', 'ReactDOM']
            const argv = [this, React, ReactDOM]
            for (const key in v) {
                args.push(key)
                argv.push(v[key])
              }
        
            return{
                args,
                argv
            }
        }).then(({args,argv}) =>{
            const classCode = transform(
                `  class Demo extends React.Component {
                        ${mainCode}
                    }
                    ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.renderId}'))
                `
                , { presets: ['es2015', 'react'] }).code
            args.push(classCode)
            new Function(...args).apply(null, argv)
        }).catch( err => {
            throw new Error(err)
        })
    

        // console.log(classCode)

       
    }
    render() {
        const { showCode } = this.state
        return (
            <div className="demo-container">
                <div className="demo-de scription" dangerouslySetInnerHTML={{ __html: this.desc }} />
                <div id={this.renderId}/>
                <div className="show-code-btn" onClick={this.handleToggle}>查看代码</div>
                {
                    showCode && <div className="demo-code" dangerouslySetInnerHTML={{ __html: this.preCode }} />
                }
            </div>
        )
    }
}
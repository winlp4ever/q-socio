import React, { Component } from "react";
import {findDOMNode} from 'react-dom';
import ReactMarkdown from "react-markdown";
import CodeBlock from './syntax-highlight';
import './_markdown-render.scss';
import RemarkMathPlugin from 'remark-math';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

class MdRender extends Component{
    state = {
        escapeHtml: true, // enable html rendering
        plugins: [
            RemarkMathPlugin,
        ],
        renderers: {
            ...this.props.renderers,
            code: CodeBlock,
            math: (props) => 
                <BlockMath math={props.value} />,
            inlineMath: (props) =>
                <InlineMath math={props.value} />
        }
    };

    async componentDidMount() {
        if (this.props.getOutline != null) {
            this.$content = $(findDOMNode(this.content));
        }
    }

    render() {
        return (
            <div className='markdown-render'>
                <ReactMarkdown {...this.props} {...this.state}/>
            </div> 
        );
    }
}


// this is new
export default MdRender;
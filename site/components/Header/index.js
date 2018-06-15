import React, { Component } from 'react';
import "./index.less"
export default class Header extends Component{
  render(){
   return <header className="header">
    <div className="header-inner">
      <h1>
         <img src={require('../../assets/logo.png')} alt="logo"/>
      </h1>
      <ul className="nav">
      <li className="nav-item">
          <a href={`/guide`} target="_blank" rel="noopener noreferrer">指南</a>
        </li>
        <li className="nav-item">
          <a href={`/`} target="_blank" rel="noopener noreferrer">组件</a>
        </li>
        <li className="nav-item">
          <a href={`http://element.eleme.io/#`} target="_blank" rel="noopener noreferrer">更新日志</a>
        </li>
        <li className="nav-item">
        <a href={`http://element.elemce`} target="_blank" rel="noopener noreferrer">脚手架</a>
        </li>
      </ul>
    </div>
  </header>
  }
}
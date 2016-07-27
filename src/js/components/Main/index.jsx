require('styles/App.css');

import React, { Component, PropTypes } from 'react';


class Main extends Component {
    constructor(props) {
        super(props)
        // 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
        this.handleClick = this.handleClick.bind(this)
        // bind把父域中的this绑定到函数里才能调用this.props,也可以用箭头函数()=>{this.functionName()}构造匿名函数来实现
    }
    handleClick() {
        this.props.onClickAdd('我在component里写下这个时间：'+String(new Date().getTime()));
    }
    render() {
        return (
            <div className = "index">
                <div className = "notice" onClick={this.handleClick}>
                    click to get msg!
                </div>
            </div>
        );
    }

}


Main.propTypes = {
  onClickAdd: PropTypes.func.isRequired
};

export default Main;
require('styles/App.css');

import React, { Component, PropTypes } from 'react';


class Present extends Component {
    render() {
        const {present,xhr} = this.props;
        return (<div className = "other-index">
                <div className = "notice">
                    {present}
                </div>
                <hr />
                <div className = "notice">
                    这里是json的数据：{xhr}
                </div>
            </div>
        );
    }
}
Present.propTypes = {
  present: PropTypes.string.isRequired
};

export default Present;
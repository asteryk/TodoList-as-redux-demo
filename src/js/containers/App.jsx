import React, {
    Component,
    PropTypes
} from 'react';
import { connect } from 'react-redux';
import { getData,xhrData } from '../actions';
import Main from '../components/Main';
import Present from '../components/Present';

class App extends Component {
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(xhrData('data.json'));
    }
    render() {
        const { dispatch,xhrContent,presentData } = this.props;
        
        console.log(this.props.xhrContent);
        return (
          <div>
          <h1>this is a test</h1>
          <Main onClickAdd = {(data) => dispatch(getData(data))}
            />
          <Present present={presentData} xhr={xhrContent}/>
          </div>);
    }
}
function mapStateToProps(state) {
    const props = { 
        // 对应action对象
        presentData:state.getData,
        xhrContent:state.xhrData.content
    };
    return props;
}
App.propTypes = {
  presentData:PropTypes.string.isRequired
};
// App.propTypes = {
//   visibleTodos: PropTypes.arrayOf(PropTypes.shape({
//     text: PropTypes.string.isRequired,
//     completed: PropTypes.bool.isRequired
//   })),
//   visibilityFilter: PropTypes.oneOf([
//     'SHOW_ALL',
//     'SHOW_COMPLETED',
//     'SHOW_ACTIVE'
//   ]).isRequired
// };
// function mapDispatchToProps(dispatch) {
//     const actionMap = { actions: bindActionCreators({ getData }, dispatch) };
//     return actionMap;
// }

export default connect(mapStateToProps)(App);
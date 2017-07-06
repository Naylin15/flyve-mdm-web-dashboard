import * as React from 'react'
import './Login.css'
import axios from 'axios'
import ChangeSessionToken from '../Utils/ChangeSessionToken'
import VerifyAccountActivation from '../Utils/VerifyAccountActivation'
import Loading from '../GenericComponents/Loading'
import { bindActionCreators } from 'redux'
import { changeLoading, changeValue } from './DuckController'
import { connect } from 'react-redux'
import LoginEmail from './LoginEmail'
import LoginPassword from './LoginPassword'
import LogoFlyve from './LogoFlyve'
import Credentials from './Credentials'

function mapStateToProps(state, props) {
    return {
        loading: state.Login.loading,
        phase: state.Login.phase,
        email: state.Login.email,
        password: state.Login.password
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeValue: bindActionCreators(changeValue, dispatch),
        changeLoading: bindActionCreators(changeLoading, dispatch)
    }
    return { actions }
}

class Login extends React.Component<any, any> {
    
    static propTypes = {
        history: React.PropTypes.object.isRequired
    }

    constructor (props: void) {
        document.body.className = 'win-type-body color-bg-light-vivid-high'
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
            phase: 1
        }
    }

    render () {
        let form: JSX.Element
        if (this.props.phase === 1) {
            form = 
                // tslint:disable-next-line:jsx-wrap-multiline
                <LoginEmail 
                    email={this.props.email} 
                    changeValue={this.props.actions.changeValue}
                    changeLoading={this.props.actions.changeLoading}
                />    
        } else {
            form = 
                // tslint:disable-next-line:jsx-wrap-multiline
                <LoginPassword 
                        email={this.props.email} 
                        password={this.props.password} 
                        changeValue={this.props.actions.changeValue}
                        changeLoading={this.props.actions.changeLoading}
                        history={this.props.history}
                />
        }
        return (
            <div>
                <div>
                    <LogoFlyve />
                    <div className="section2">
                        {form}
                        {this.props.loading}
                    </div>
                    <Credentials />
                </div>
            </div>
            
        )
    }
}
export default connect <any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(Login)
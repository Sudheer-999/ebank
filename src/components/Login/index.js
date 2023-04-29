import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {userId: '', password: '', errorMsg: ''}

  onUserId = event => {
    this.setState({userId: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  renderSuccessView = () => {
    const {history} = this.props
    history.replace('/')
  }

  onLoginBtn = async event => {
    event.preventDefault()
    const {userId, password} = this.state

    const credentials = {user_id: userId, pin: password}

    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }

    const response = await fetch(url, options)

    const data = await response.json()
    const jwt = data.jwt_token

    if (response.ok) {
      Cookies.set('jwt_token', jwt, {expires: 30})
      this.setState({errorMsg: ''})
      this.renderSuccessView()
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {userId, password, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="website-logo-con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
        </div>
        <form onSubmit={this.onLoginBtn} className="form-con">
          <h1 className="form-head">Welcome Back!</h1>
          <label htmlFor="userId">User ID</label>
          <input
            value={userId}
            type="text"
            className="user-input"
            onChange={this.onUserId}
            id="userId"
            placeholder="Enter User ID"
          />
          <label htmlFor="pass">PIN</label>
          <input
            value={password}
            type="password"
            className="pass-input"
            onChange={this.onPassword}
            id="pass"
            placeholder="Enter PIN"
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {errorMsg.length > 1 && <p className="error">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login

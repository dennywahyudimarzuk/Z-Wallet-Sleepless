import React, { Component } from 'react'
import { icLine, imDoublePhone } from '../../assets';
import './createPin.css'
class CreatePin extends Component {
  state = {
    show: false
  }

  showPassword() {
    if (this.state.show === false) {
      this.setState({
        show: true
      })
    } else {
      this.setState({
        show: false
      })
    }

  }

  onConfirm() {
    this.props.history.push('/auth/success')
  }


  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-6 information p-2 p-sm-5">
            <div className="container">
              <div className="logo">
                <h1 className="ml-4">Zwallet</h1>
              </div>
              <div className="image">
                <img alt="" src={imDoublePhone} className="img-fluid" />
              </div>
              <div className="description ml-4">
                <h2>App that Covering Banking Needs.</h2>
                <p>Zwallet is an application that focussing in banking needs for all users
                in the world. Always updated and always following world trends.
                                    5000+ users registered in Zwallet everyday with  worldwide<br />
                                    users coverage.</p>

              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="login-container">
              <div className="login">
                <h3 className="title-mobile">ZWALLET</h3>
                <h2>Secure Your Account, Your Wallet,
                and Your Data With 6 Digits PIN
                That You Created Yourself.
                                </h2>
                <p className="desc">
                  Create 6 digits pin to secure all your money and your data in Zwallet app. Keep it secret and don’t tell anyone about your Zwallet account password and the PIN.
                                </p>


                <div className="form-group">
                  <div className="title-mobile">
                    <h4>Create Security PIN</h4>
                    <div className="helper-text">
                      Create a PIN that’s contain 6 digits number for security purpose in Zwallet.
                    </div>
                  </div>
                  <div className="pin col-xl-8">
                    <div className="container">
                      <div className="row justify-content-between">
                        <div className="form-input-pin">
                          <input type="text" className="form-control pin-verify d-inline" />
                          <img alt="" src={icLine} className="input-line" />
                        </div>
                        <div className="form-input-pin">
                          <input type="text" className="form-control pin-verify d-inline" />
                          <img alt="" src={icLine} className="input-line" />
                        </div>
                        <div className="form-input-pin">
                          <input type="text" className="form-control pin-verify d-inline" />
                          <img alt="" src={icLine} className="input-line" />
                        </div>
                        <div className="form-input-pin">
                          <input type="text" className="form-control pin-verify d-inline" />
                          <img alt="" src={icLine} className="input-line" />
                        </div>
                        <div className="form-input-pin">
                          <input type="text" className="form-control pin-verify d-inline" />
                          <img alt="" src={icLine} className="input-line" />
                        </div>
                        <div className="form-input-pin">
                          <input type="text" className="form-control pin-verify d-inline" />
                          <img alt="" src={icLine} className="input-line" />
                        </div>

                      </div>
                    </div>

                  </div>
                  <div className="form-button col-xl-8">
                    <button className="btn" type="submit" onClick={() => this.onConfirm()}>Confirm</button>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CreatePin;
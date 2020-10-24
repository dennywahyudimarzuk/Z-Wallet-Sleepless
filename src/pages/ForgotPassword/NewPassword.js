import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { icLock, icMail, imDoublePhone, icEyeCrossed, icMailActive,icLockActive, icMailWrong, icLockWrong } from '../../assets';
import axios from 'axios';
import qs from 'qs';
import { login } from '../../utils';
import './newPassword.css';
class NewPassword extends Component{
    
    state = {
        icMail:icMail,
        error:false,
        icPassword:icLock,
        mailClick:{},
        passClick:{},
        btn:{},
        form : {
            email :'',
            password: ''
        },
        show:false
    }



    handleForm = (event) => {
        let  newForm  = this.state.form;
        newForm[event.target.name] = event.target.value;
        this.setState({
            newForm: newForm
        },
        ()=> {
          console.log(newForm);
        }
        )  
    }

   


    showPassword()
    {
        if (this.state.show === false) {
            this.setState({
                show:true
            })
        }else{
            this.setState({
                show:false
            })
        }

    }

    uiEmail()
    {

        this.setState({
            icMail:icMailActive,
            mailClick:{border:'1.6px solid #6379F4'}
        })
    }
    uiPassword()
    {
        this.setState({
            btn:{backgroundColor:'#6379F4',color:'white'},
            icPassword:icLockActive,
            passClick:{border:'1.6px solid #6379F4'}
        })
    }

    render(){

        return(
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
                                    5000+ users registered in Zwallet everyday with  worldwide<br/>
                                    users coverage.</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="login-container">
                            <div className="login">
                                <h2>Start Accessing Banking Needs
                                    With All Devices and All Platforms
                                    With 30.000+ Users</h2>
                                <p>Now you can create a new password for your Zwallet account. Type your password twice so we can confirm your new passsword.</p>


                                    <div className="form-group">

                                        <div className="form-group password col-lg-8" style={{marginBottom:74}}>
                                            <input type={this.state.show ? "text" : "password"} style={this.state.passClick} className="form-control border-top-0 border-left-0 border-right-0 rounded-0 " onClick={() => this.uiPassword()} placeholder="Create new password" value={this.state.form.password} name="password" onChange={this.handleForm} />
                                            <div className="icon-input">
                                                <img alt="" src={this.state.icPassword} />
                                            </div>
                                            <div className="eye-crossed" onClick={() => this.showPassword()} style={{cursor:'pointer'}}>
                                                <img alt="" src={icEyeCrossed} />
                                            </div>

                                        </div>

                                        <div className="form-group password col-lg-8">
                                            <input type={this.state.show ? "text" : "password"} style={this.state.passClick} className="form-control border-top-0 border-left-0 border-right-0 rounded-0 " onClick={() => this.uiPassword()} placeholder="Create new password" value={this.state.form.password} name="password" onChange={this.handleForm} />
                                            <div className="icon-input">
                                                <img alt="" src={this.state.icPassword} />
                                            </div>
                                            <div className="eye-crossed" onClick={() => this.showPassword()} style={{cursor:'pointer'}}>
                                                <img alt="" src={icEyeCrossed} />
                                            </div>

                                        </div>

                                        <div className="form-button col-lg-8">
                                            {this.state.error && <span className="text-center d-block" style={{color:'#FF5B37',fontSize:18,fontWeight:600,marginBottom:-20}}>Email or Password Invalid</span>}
                                           
                                            <button className="btn btn-primary" style={this.state.btn} type="submit"  >Reset Password</button>
                                        </div>
                             
                        
                                    </div>
                            </div>
                       </div>
                     </div>
                </div>
            </>
        )
    }
}

export default NewPassword;

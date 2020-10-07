import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { icLock, icMail, imDoublePhone, icEyeCrossed } from '../../assets';
import './login.css';
import axios from 'axios';
import qs from 'qs';
class Login extends Component{
    

    state = {
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

    login = () => {
        console.log(this.state.form.email)
        
        let data = qs.stringify(this.state.form);

      axios.post('https://zwallet-api-production.herokuapp.com/v1/auth',data)
      .then(res =>{
        console.log(res.data.status)
        if (res.data.status !== 'error') {


            localStorage.setItem("login", true);
            localStorage.setItem("dataLogin", JSON.stringify(res.data));
           this.props.history.push('/dashboard')
        }

      }).catch(err => {
        console.error(err)
      });

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
                                <p>Transfering money is eassier than ever, you can access 
                                    Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>


                                    <div className="form-group">

                                        <div className="form-group email col-lg-8">
                                            <input type="email" className="form-control border-top-0 border-left-0 border-right-0 rounded-0 " placeholder="Enter your e-mail" value={this.state.form.email} name="email"  onChange={this.handleForm}/>
                                            <div className="icon-input">
                                                <img alt="" src={icMail} />
                                            </div>
                                        </div>
                                        <div className="form-group password col-lg-8">
                                            <input type={this.state.show ? "text" : "password"} className="form-control border-top-0 border-left-0 border-right-0 rounded-0 " placeholder="Enter your password" value={this.state.form.password} name="password" onChange={this.handleForm} />
                                            <div className="icon-input">
                                                <img alt="" src={icLock} />
                                            </div>
                                            <div className="eye-crossed" onClick={() => this.showPassword()} style={{cursor:'pointer'}}>
                                                <img alt="" src={icEyeCrossed} />
                                            </div>
                                            <div className="forgot-password ">
                                                <p><a href="">Forgot password?</a></p>
                                            </div>
                                        </div>

                                        <div className="form-button col-lg-8">
                                            <button className="btn btn-primary" type="submit" onClick={this.login} >Login</button>
                                        </div>
                                        <div className="sign-up text-center col-lg-8">
                                            <p>Don’t have an account? Let’s <Link to="/auth/register">Sign Up</Link> </p>
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

export default Login;

import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut, icPlus,icUserActive, icLock, icEyeCrossed} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './changePassword.css';
import qs from 'qs';

class ChangePassword extends Component {

    state = {
        data : [],
        form : {
            currentPassword :'',
            newPassword: '',
            repeatNewPassword:''
        }
    }


    componentDidMount()
    {
        var login = localStorage.getItem("login");
        if (login === 'true') {
              var dataLogin = JSON.parse(localStorage.getItem("dataLogin")).data[0];
              this.setState({data:dataLogin})    
        }
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


    changePassword()
    {
        if (this.state.form.newPassword === this.state.form.repeatNewPassword) {
            
            let data = {
                password : this.state.form.newPassword
            }
            data = qs.stringify(data);
            let id = this.state.data.id;
            axios.patch(`https://zwallet-api-production.herokuapp.com/v1/profile/${id}`,data)
            .then(res => {
              console.log(res.data)
              this.setState({
                form : {
                    currentPassword :'',
                    newPassword: '',
                    repeatNewPassword:''
                }
              })
            })
            .catch(err => {
              console.error(err)
            });

        }

    }



    render() { 
        return ( 
            <>
                <Navbar/>
                    <div className="container content">
                        <div className="row">
                            <div className="col-3 bg-white shadow-lg sidebar_menu">
                              <div class="sidebar h-100 d-flex pb-5" style={{flexDirection: 'column'}}>
                                 <div style={{flex: 1}}>
                                   <Link to="/dashboard">
                                    <a href="/dashboard" className="ml-md-4 d-block dashboard-pr text-center text-lg-left">
                                        <img alt="" src={icGrid} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                    </Link>
                                    <Link to="/transfer">
                                    <a href="receiver.html" className="ml-md-4 d-block transfer-pr text-center text-lg-left">
                                        <img alt="" src={icArrowUp} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                    </Link>
                                    <Link to="/top-up">
                                    <a href="top-up"  className="ml-md-4 d-block top-up-pr text-center text-lg-left" >
                                        <img alt="" src={icPlus} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                    </Link>
                                    <Link to="/profile">
                                    <a href="" className="ml-md-4 d-block profile-pr text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img alt="" src={icUserActive} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                    </div>
                                    <a href="login.html" className="ml-md-4 d-block logout-rc text-center text-lg-left">
                                        <img alt="" src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9" id="area">
                            
                            <div class="body-area-change-password"> 
                                    <div class="row ">
                                        <div class="col-12">
                                            <h1>Change Password</h1>
                                            <p>You must enter your current password and then type your new password twice.</p>

                                            <div align="center" class="change-password">

                                                <div class="form-group password col-lg-7">
                                                    <input type="password" class="form-control border-top-0 border-left-0 border-right-0 rounded-0 " placeholder="Current password" name="currentPassword" value={this.state.form.currentPassword} onChange={this.handleForm}  />
                                                    <div class="icon-input">
                                                        <img alt="" src={icLock} />
                                                    </div>
                                                    <div class="eye-crossed">
                                                        <img alt="" src={icEyeCrossed} />
                                                    </div>
                                                </div>

                                                <div class="form-group password col-lg-7">
                                                    <input type="password" class="form-control border-top-0 border-left-0 border-right-0 rounded-0 " placeholder="New password" name="newPassword" value={this.state.form.newPassword} onChange={this.handleForm} />
                                                    <div class="icon-input">
                                                        <img alt="" src={icLock} />
                                                    </div>
                                                    <div class="eye-crossed">
                                                        <img alt="" src={icEyeCrossed} />
                                                    </div>
                                                </div>

                                                <div class="form-group password col-lg-7">
                                                    <input type="password" class="form-control border-top-0 border-left-0 border-right-0 rounded-0 " placeholder="Repeat new password" name="repeatNewPassword" value={this.state.form.repeatNewPassword} onChange={this.handleForm} />
                                                    <div class="icon-input">
                                                        <img alt="" src={icLock} />
                                                    </div>
                                                    <div class="eye-crossed">
                                                        <img alt="" src={icEyeCrossed} />
                                                    </div>
                                                </div>
                                                <div class="form-button col-lg-7">
                                                    <button class="btn btn-primary" type="submit" onClick={() => this.changePassword()} >Change Password</button>
                                                </div>


                                            </div>
                                            

                                        </div>

                                    </div>
                                </div>



                            </div>
                        </div>


                    </div>                                              
                <Footer/>
            </>
         );
    }
}
 
export default ChangePassword;
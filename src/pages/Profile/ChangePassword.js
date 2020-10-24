import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut, icPlus,icUserActive, icLock, icEyeCrossed,icLockActive} from '../../assets';
import { Navbar,Footer, NavigationMobile} from '../../component/molecules';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './changePassword.css';
import qs from 'qs';
import{connect} from 'react-redux';


class ChangePassword extends Component {

    state = {
        icPassword1:icLock,
        icPassword2:icLock,
        icPassword3:icLock,
        btn:{},
        passClick1:{},
        passClick2:{},
        passClick3:{},
        form : {
            currentPassword :'',
            newPassword: '',
            repeatNewPassword:''
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
            let id = this.props.userData.id;
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}}  
            axios.patch(`${process.env.REACT_APP_API}/profile/${id}`,data,headers)
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

    uiPassword1()
    {
        this.setState({
            btn:{backgroundColor:'#6379F4',color:'white'},
            icPassword1:icLockActive,
            passClick1:{border:'1.6px solid #6379F4'}
        })
    }

    uiPassword2()
    {
        this.setState({
            btn:{backgroundColor:'#6379F4',color:'white'},
            icPassword2:icLockActive,
            passClick2:{border:'1.6px solid #6379F4'}
        })
    }
    uiPassword3()
    {
        this.setState({
            btn:{backgroundColor:'#6379F4',color:'white'},
            icPassword3:icLockActive,
            passClick3:{border:'1.6px solid #6379F4'}
        })
    }



    render() { 
        return ( 
            <>
                <div className="d-none d-sm-block">
                      <Navbar/>
                </div>


                    <div className="container content">
                        <div className="d-block d-sm-none">
                            <NavigationMobile page="Change Password" to="/profile"/>
                        </div>
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
                                    <a href="/" className="ml-md-4 d-block profile-pr text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img alt="" src={icUserActive} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                    </div>
                                    <a href="/auth/logout" className="ml-md-4 d-block logout-rc text-center text-lg-left">
                                        <img alt="" src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9" id="area">
                            
                            <div class="body-area-change-password"> 
                                    <div class="row ">
                                        <div class="col-12">
                                            <div className="d-none d-sm-block">
                                               <h1>Change Password</h1>
                                            </div>
                                            <p>You must enter your current password and then type your new password twice.</p>

                                            <div align="center" class="change-password">

                                                <div class="form-group password col-lg-7">
                                                    <input type="password"  style={this.state.passClick1} onClick={() => this.uiPassword1()} class="form-control border-top-0 border-left-0 border-right-0 rounded-0 " placeholder="Current password" name="currentPassword" value={this.state.form.currentPassword} onChange={this.handleForm}  />
                                                    <div class="icon-input">
                                                        <img alt="" src={this.state.icPassword1} />
                                                    </div>
                                                    <div class="eye-crossed">
                                                        <img alt="" src={icEyeCrossed} />
                                                    </div>
                                                </div>

                                                <div class="form-group password col-lg-7">
                                                    <input type="password" style={this.state.passClick2} onClick={() => this.uiPassword2()} class="form-control border-top-0 border-left-0 border-right-0 rounded-0 " placeholder="New password" name="newPassword" value={this.state.form.newPassword} onChange={this.handleForm} />
                                                    <div class="icon-input">
                                                        <img alt="" src={this.state.icPassword2} />
                                                    </div>
                                                    <div class="eye-crossed">
                                                        <img alt="" src={icEyeCrossed} />
                                                    </div>
                                                </div>

                                                <div class="form-group password col-lg-7">
                                                    <input type="password" style={this.state.passClick3} onClick={() => this.uiPassword3()}  class="form-control border-top-0 border-left-0 border-right-0 rounded-0 " placeholder="Repeat new password" name="repeatNewPassword" value={this.state.form.repeatNewPassword} onChange={this.handleForm} />
                                                    <div class="icon-input">
                                                        <img alt="" src={this.state.icPassword3} />
                                                    </div>
                                                    <div class="eye-crossed">
                                                        <img alt="" src={icEyeCrossed} />
                                                    </div>
                                                </div>
                                                <div class="form-button col-lg-7">
                                                    <button class="btn btn-primary" style={this.state.btn} type="submit" onClick={() => this.changePassword()} >Change Password</button>
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
 
const mapStateToProps = (state) => {
    return {
        userData: state
    }
}


export default connect(mapStateToProps)(ChangePassword);
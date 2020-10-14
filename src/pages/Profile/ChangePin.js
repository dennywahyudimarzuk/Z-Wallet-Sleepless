import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut, icPlus,icUserActive, icLine} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import './changePin.css';

class ChangePin extends Component {

    state = {
        data:[],
        form : {
            pin1 : '',
            pin2 : '',
            pin3 : '',
            pin4 : '',
            pin5 : '',
            pin6 : '',
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


    changePin()
    {
            
            let data = {
                pin : this.state.form.pin1 + this.state.form.pin2 + this.state.form.pin3 + this.state.form.pin4 + this.state.form.pin5 + this.state.form.pin6
            }
            data = qs.stringify(data);
            let id = this.state.data.id;
            const token = JSON.parse(localStorage.getItem("token"));
            const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}}  
            axios.patch(`${process.env.REACT_APP_API}/profile/${id}`,data,headers)
            .then(res => {
              console.log(res.data)
              this.setState({
                form : {
                    pin1 : '',
                    pin2 : '',
                    pin3 : '',
                    pin4 : '',
                    pin5 : '',
                    pin6 : '',
                }
              })
            })
            .catch(err => {
              console.error(err)
            });

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
                                    <a href="/" className="ml-md-4 d-block profile-pr text-center text-lg-left">
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
                            
                                <div class="body-area-change-pin"> 
                                    <div class="row ">
                                        <div class="col-12">
                                            <h1>Change PIN</h1>
                                            <p>Enter your current 6 digits Zwallet PIN below to continue to the next steps.</p>
                                        
                                        
                                            <div align="center">
                                            <div  class="pin col-xl-7">
                                                    <div class="container">
                                                        <div class="row justify-content-between">
                                                            <div class="form-input-pin">
                                                                <input type="text" class="form-control pin-verify d-inline" value={this.state.form.pin1} name="pin1" onChange={this.handleForm} />
                                                                <img alt="" src={icLine} class="input-line" />
                                                            </div>
                                                            <div class="form-input-pin">
                                                                <input type="text" class="form-control pin-verify d-inline" value={this.state.form.pin2} name="pin2" onChange={this.handleForm} />
                                                                <img alt="" src={icLine} class="input-line" />
                                                            </div>
                                                            <div class="form-input-pin">
                                                                <input type="text" class="form-control pin-verify d-inline" value={this.state.form.pin3} name="pin3" onChange={this.handleForm} />
                                                                <img alt="" src={icLine} class="input-line" />
                                                            </div>
                                                            <div class="form-input-pin">
                                                                <input type="text" class="form-control pin-verify d-inline" value={this.state.form.pin4} name="pin4" onChange={this.handleForm} />
                                                                <img alt="" src={icLine} class="input-line" />
                                                            </div>
                                                            <div class="form-input-pin">
                                                                <input type="text" class="form-control pin-verify d-inline" value={this.state.form.pin5} name="pin5" onChange={this.handleForm} />
                                                                <img alt="" src={icLine} class="input-line" />
                                                            </div>
                                                            <div class="form-input-pin">
                                                                <input type="text" class="form-control pin-verify d-inline" value={this.state.form.pin6} name="pin6" onChange={this.handleForm}/>
                                                                <img alt="" src={icLine} class="input-line" />
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div> 
                                                <div class="form-button col-lg-7">
                                                    <button class="btn btn-primary" type="submit" onClick={() => this.changePin()} >Continue</button>
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
 
export default ChangePin;
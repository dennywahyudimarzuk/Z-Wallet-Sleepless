import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut, icPlus,icUserActive} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './personalInformation.css';

class PersonalInformation extends Component {

    state = {
        data:[],
        name:'',
    }

    componentDidMount()
    {
        var login = localStorage.getItem("login");
        if (login === 'true') {
              var dataLogin = JSON.parse(localStorage.getItem("dataLogin")).data[0];
              this.setState({data:dataLogin})    
        }
        this.setState({data:dataLogin})
        this.setState({name:dataLogin.fullName.split(' ')})
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
                                        <img src={icGrid} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                    </Link>
                                    <Link to="/transfer">
                                    <a href="receiver.html" className="ml-md-4 d-block transfer-pr text-center text-lg-left">
                                        <img src={icArrowUp} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                    </Link>
                                    <Link to="/top-up">
                                    <a href="top-up"  className="ml-md-4 d-block top-up-pr text-center text-lg-left" >
                                        <img src={icPlus} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                    </Link>
                                    <Link to="/profile">
                                    <a href="" className="ml-md-4 d-block profile-pr text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img src={icUserActive} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                    </div>
                                    <a href="/auth/logout" className="ml-md-4 d-block logout-rc text-center text-lg-left">
                                        <img src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9" id="area">
                            <div class="body-area-profile-personal"> 
                                    <div class="row ">
                                        <div class="col-12">
                                            <h1>Personal Information</h1>
                                            <p>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>


                                            <div class="card-personal-information">
                                                <span>First Name</span>
                                                <h2>
                                                {
                                                 this.state.name[0]
                                                }
                                                </h2>
                                            </div>
                                            <div class="card-personal-information">
                                                <span>Last Name</span>
                                                <h2>
                                                {
                                                 this.state.name[1]
                                                }
                                                </h2>
                                            </div>
                                            <div class="card-personal-information">
                                                <span>Verified E-mail</span>
                                                <h2>{this.state.data.email}</h2>
                                            </div>
                                            <div class="card-personal-information">
                                                <span>Phone Number</span>
                                                <h2>{this.state.data.phone}</h2>
                                                <Link to="/profile/manage-phone-number">
                                                    <span class="manage">
                                                        Manage
                                                    </span>
                                                </Link>
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
 
export default PersonalInformation;
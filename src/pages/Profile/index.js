import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut, icPlus,icUserActive,imJessica70x70, icPencilSmall, icArrowLeft} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import {Link} from 'react-router-dom';
import './profile.css';


class Profile extends Component {

    state = {
        data:[]
    }

    componentDidMount()
    {
        var login = localStorage.getItem("login");
        if (login === 'true') {
              var dataLogin = JSON.parse(localStorage.getItem("dataLogin")).data[0];
              this.setState({data:dataLogin})    
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
                            <div class="body-area-profile"> 
                                    <div class="row ">
                                        <div class="col-12 text-center ">
                                        
                                                <img alt="" src={imJessica70x70} class="img-fluid profile-image" />
                                                <span class="d-block"><img  src={icPencilSmall} alt="" />&nbsp;&nbsp;Edit</span>
                                                <h1>{this.state.data.fullName}</h1>
                                                <p>{this.state.data.phone}</p>
                                                <div align="center">
                                                    <Link to="/profile/personal-information">
                                                        <div class="card-profile text-left d-flex justify-content-between align-self-center" >
                                                            <p >Personal Information</p>
                                                            <img  class="mt-2" src={icArrowLeft} alt="" />
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div align="center">
                                                  <Link to="/profile/change-password">
                                                    <div class="card-profile text-left d-flex justify-content-between align-self-center" >
                                                        <p >Change Password</p>
                                                        <img  class="mt-2" src={icArrowLeft} alt="" />
                                                    </div>
                                                  </Link>
                                                </div>
                                                <div align="center">
                                                <Link to="/profile/change-pin">
                                                    <div class="card-profile text-left d-flex justify-content-between align-self-center" >
                                                        <p >Change PIN</p>
                                                        <img  class="mt-2" src={icArrowLeft} alt="" />
                                                    </div>
                                                </Link>
                                                </div>
                                                <div align="center">
                                                <Link to="/auth/logout">
                                                    <div class="card-profile text-left d-flex justify-content-between align-self-center" >
                                                        <p >Logout</p>
                                                    </div>
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
 
export default Profile;
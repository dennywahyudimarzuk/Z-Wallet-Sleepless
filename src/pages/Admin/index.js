import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut,icPlus,icUser} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import './admin.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
class Admin extends Component {

    componentDidMount()
    {
        const jwt = localStorage.getItem("jwt");
        const headers = { headers: {'Authorization': `Bearer ${jwt}`}}  
        let data = qs.stringify({token:jwt});
        axios.post(`${process.env.REACT_APP_API}/profile/token`,data,headers)
        .then(res =>{
            if (res.data.data[0].role_id !== 1) {
                 this.props.history.push('/page-not-found')
            }
        }).catch(err => {
            console.error(err)
        });

    }


    render() { 
        return ( 
            <>
                <Navbar/>
                    <div class="container content">
                        <div class="row">
                            <div class="col-3 bg-white shadow-lg sidebar_menu">
                            <div class="sidebar h-100 d-flex pb-5" style={{flexDirection: 'column'}}>
                              <div style={{flex: 1}}> 
                              <Link to="/dashboard">
                                    <a href="/dashboard" class="ml-md-4 d-block dashboard-tp text-center text-lg-left">
                                        <img alt="" src={icGrid} /> &nbsp; <span class="d-none d-md-inline">Dashboard</span>
                                    </a>
                                </Link>
                                <Link to="/transfer">
                                    <a href="/transfer" class="ml-md-4 d-block transfer-tp text-center text-lg-left">
                                        <img alt="" src={icArrowUp} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Transfer</span>
                                    </a>
                                </Link>
                                <Link to="/top-up">
                                    <a href="/top-up" class="ml-md-4 d-block top-up-adm text-center text-lg-left">
                                        {/* <div class="active-link"></div> */}
                                        <img alt="" src={icPlus} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Top Up</span>
                                    </a>
                                </Link>
                                <Link to="/profile">
                                    <a href="/" class="ml-md-4 d-block profile-tp text-center text-lg-left">
                                        <img alt="" src={icUser} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Profile</span>
                                    </a>
                                </Link>
                                </div>
                                    <a href="/auth/logout" class="ml-md-4 d-block logout-tp text-center text-lg-left">
                                        <img alt="" src={icLogOut} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-12 col-sm-9" id="area">
                                <div class="body-area-card  h-100">
                                    <h1>Welcome to page Admin</h1>
                
                                    <div class="row">
                                        <div class="col-12">


                                          
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
 
export default Admin;
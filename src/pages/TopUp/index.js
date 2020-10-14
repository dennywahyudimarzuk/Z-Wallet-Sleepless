import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut,icPlusActive,icUser} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import './topUp.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
class TopUp extends Component {

    state = {
        data : []
    }


    componentDidMount()
    {
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}} 
        axios.get(`${process.env.REACT_APP_API}/topup/`,headers)
        .then(res =>{
          console.log(res.data.data)
          this.setState({data:res.data.data});
        
        }).catch(err => {
          console.log(err)
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
                                    <a href="/top-up" class="ml-md-4 d-block top-up-tp text-center text-lg-left">
                                        <div class="active-link"></div>
                                        <img alt="" src={icPlusActive} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Top Up</span>
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
                                    <h1>How To Top Up</h1>
                
                                    <div class="row">
                                        <div class="col-12">

                                            {
                                                this.state.data.map(item => {
                                                    return(
                                                        <div class="card-profile " key={item.id} >
                                                            <div class="row">
                                                                <div class="col-9 col-sm-9 col-lg-10 top-up">
                                                                     <p><span class="number">{item.orders}</span>{item.procedures}</p>
                                                                </div>
                                                            </div>
                                                       </div>
                                                    )
                                                })
                                            }

                                          
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
 
export default TopUp;
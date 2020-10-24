import React,{Component} from 'react';
import { icArrowUp , icGridActive, icLogOut,icPlus,icUser} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import './history.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
class History extends Component {

    state = {
        historyTransfer: []
    }


    componentDidMount()
    {

            const token = JSON.parse(localStorage.getItem("token"));
            const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}}  
            axios.get(`${process.env.REACT_APP_API}/transfer`,headers)
            .then(res =>{
              console.log('data transfer axios: ',res.data.data)
              this.setState({historyTransfer:res.data.data});
            
            }).catch(err => {
              console.log('data transfer axios error: ', err.message)
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
                                    <a href="/dashboard" class="ml-md-4 d-block  top-up-tp  text-center text-lg-left">
                                        <div class="active-link"></div>
                                        <img alt="" src={icGridActive} /> &nbsp; <span class="d-none d-md-inline">Dashboard</span>
                                    </a>
                                </Link>
                                <Link to="/transfer">
                                    <a href="/transfer" class="ml-md-4 d-block transfer-tp text-center text-lg-left">
                                        <img alt="" src={icArrowUp} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Transfer</span>
                                    </a>
                                </Link>
                                <Link to="/top-up">
                                    <a href="/top-up" class="ml-md-4 d-block  dashboard-tp text-center text-lg-left">
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
                                <div class="body-area-history">
                                    <h1>Transaction History</h1>
                                    <p>This Week</p>

                                    <div class="row">
                                        
                                        {
                                            this.state.historyTransfer.map(history => {
                                                return(
                                                    <>
                                                        <div class="col-6 mb-2">
                                                            <div class="row justify-content-lg-around">
                                                                <div class="col-md-3 m-0">
                                                                    <img src={process.env.REACT_APP_URL+history.photo} width="56" height="56" style={{borderRadius:10}} />
                                                                </div>
                                                                <div class="col-md-9  user-transaction">
                                                                    <h4 class="mt-1 mt-sm-0">{history.fullName}</h4>
                                                                    <p>Transfer</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6 text-right">
                                                            <span  class="d-block mt-4 plus">+Rp{history.amount}</span>
                                                        </div>
                                                   </>

                                                )
                                            })

                                        }
                                    </div>

                                    <p class="mt-3">This Month</p>

                                    <div class="row">
                                    {
                                            this.state.historyTransfer.map(history => {
                                                return(
                                                    <>
                                                        <div class="col-6 mb-2">
                                                            <div class="row justify-content-lg-around">
                                                                <div class="col-md-3 m-0">
                                                                    <img src={process.env.REACT_APP_URL+history.photo} width="56" height="56" style={{borderRadius:10}} />
                                                                </div>
                                                                <div class="col-md-9  user-transaction">
                                                                    <h4 class="mt-1 mt-sm-0">{history.fullName}</h4>
                                                                    <p>Transfer</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-6 text-right">
                                                            <span  class="d-block mt-4 plus">+Rp{history.amount}</span>
                                                        </div>
                                                   </>

                                                )
                                            })

                                        }
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
 
export default History;
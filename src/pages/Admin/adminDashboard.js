import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut,icPlus,icUser} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import './adminDashboard.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

class AdminDashboard extends Component {

    state = {
        userData : [],
        countTransactionAmount  : [],
        countTrasaction : []
    }

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

        axios.get(`${process.env.REACT_APP_API}/profile`,headers)
        .then(res =>{
            
          this.setState({userData:res.data.data.length});
          console.log('data user axios: ',this.state.userData)
        }).catch(err => {
          console.log('data transfer axios error: ', err.message)
        });

        axios.get(`${process.env.REACT_APP_API}/transfer`,headers)
        .then(res =>{
            
            let dataTransfer = res.data.data

            let balanceTransfer
            
            let countAmount = dataTransfer.map( (item,index) => {
                const countBalance = parseInt(item.amount)

                return countBalance
            })

            function myFunc(total, num) {
                return total + num;
            }

            let bilangan =  countAmount.reduce(myFunc)

            var	reverse = bilangan.toString().split('').reverse().join(''),
            rupiah 	= reverse.match(/\d{1,3}/g);
            rupiah	= rupiah.join('.').split('').reverse().join('');

            console.log('ini count' , rupiah)
            this.setState({countTrasaction: dataTransfer.length});

          this.setState({countTransactionAmount: rupiah});
        //   console.log('data transfer axios: ',this.state.transferData)
        }).catch(err => {
          console.log('data transfer axios error: ', err.message)
        });


    }


    render() { 
        return ( 
            <>
                <Navbar/>
                    <div className="container content">
                        <div className="row">
                            <div className="col-3 bg-white shadow-lg sidebar_menu">
                            <div className="sidebar h-100 d-flex pb-5" style={{flexDirection: 'column'}}>
                              <div style={{flex: 1}}> 
                              <Link to="/dashboard">
                                    <a href="/dashboard" className="ml-md-4 d-block dashboard-tp text-center text-lg-left">
                                        <img alt="" src={icGrid} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                </Link>
                                <Link to="/transfer">
                                    <a href="/transfer" className="ml-md-4 d-block transfer-tp text-center text-lg-left">
                                        <img alt="" src={icArrowUp} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                </Link>
                                <Link to="/admin/top-up">
                                    <a href="/admin/top-up" className="ml-md-4 d-block top-up-adm text-center text-lg-left">
                                        {/* <div className="active-link"></div> */}
                                        <img alt="" src={icPlus} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                </Link>
                                <Link to="/profile">
                                    <a href="/" className="ml-md-4 d-block profile-tp text-center text-lg-left">
                                        <img alt="" src={icUser} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                </Link>
                                </div>
                                    <a href="/auth/logout" className="ml-md-4 d-block logout-tp text-center text-lg-left">
                                        <img alt="" src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9" id="area">
                                <div className="body-area-card  h-100">
                                <div class="container-xl container-lg container-md pb-4">
                        
                                    <div class="row mx-3 pt-4 pb-4">

                                        <div class="col-12 mb-4">
                                            <div>
                                                <h3 class="admin-dashboard-title">Dashboard</h3>    
                                            </div>
                                        </div>

                                        <div class="col-xl-4 col-lg-4 col-md-4">
                                            <div class="admin-dashboard-panel-list">
                                                <div class="d-flex justify-content-center">
                                                    <div class="d-flex flex-column bd-highlight mb-3">
                                                        <h2 class="mt-1 mx-auto admin-dashboard-angka-jumlah-user">{this.state.userData}</h2>
                                                        <p class="admin-dashboard-text-jumlah-user">Total User</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xl-4 col-lg-4 col-md-4">
                                            <div class="admin-dashboard-panel-list">
                                                <div class="d-flex justify-content-center">
                                                    <div class="d-flex flex-column bd-highlight mb-3">
                                                        <h2 class="mt-1 mx-auto admin-dashboard-angka-jumlah-user">{this.state.countTrasaction}</h2>
                                                        <p class="admin-dashboard-text-jumlah-user">Total Transaction</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-xl-4 col-lg-4 col-md-4">
                                            <div class="admin-dashboard-panel-list">
                                                <div class="d-flex justify-content-center">
                                                    <div class="d-flex flex-column bd-highlight mb-3">
                                                        <h2 class="mt-1 mx-auto admin-dashboard-angka-jumlah-user">75</h2>
                                                        <p class="admin-dashboard-text-jumlah-user">Total Topup</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-12">

                                        </div>

                                        <div class="col-12 mt-4">
                                            <div class="admin-dashboard-transfer-total-box mx-auto ">
                                                <div class="d-flex flex-column bd-highlight mb-3 pl-3">
                                                    <div class="pt-2 bd-highlight">
                                                        <h2 class="admin-dashboard-total-trasaction">Total Money Trasaction</h2>
                                                    </div>
                                                    <div class="p-2 bd-highlight">
                                                        <p class="admin-dashboard-money-value">Rp. {this.state.countTransactionAmount}</p>
                                                    </div>
                                                </div>
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
 
export default AdminDashboard;
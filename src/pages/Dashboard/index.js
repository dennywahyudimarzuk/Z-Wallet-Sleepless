import React,{Component} from 'react';
import { icArrowExpense, icArrowIncome, icArrowUp, icArrowUpTransfer, icGridActive, icLogOut, icPlus,icPlusTopUp,icUser,imProfile3} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import './dashboard.css';
import {Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends Component {

    state = {
        data:[],
        historyTransfer: []
    }


    componentDidMount()
    {
        
            var login = localStorage.getItem("login");
            if (login === 'true') {
                  var dataLogin = JSON.parse(localStorage.getItem("dataLogin")).data[0];
                  this.setState({data:dataLogin})    
            }



            axios.get(`https://zwallet-api-production.herokuapp.com/v1/transfer`)
            .then(res =>{
              console.log(res.data.data)
              this.setState({historyTransfer:res.data.data});
            
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
                            <div class="col-3 bg-white shadow-lg sidebar_menu ">
                              <div class="sidebar h-100 d-flex pb-5" style={{flexDirection: 'column'}}>
                                 <div style={{flex: 1}}>
                                    <Link to="/dashboard">
                                    <a href="" class="ml-md-4 d-block dashboard text-center text-lg-left">
                                        <div class="active-link"></div>
                                        <img src={icGridActive} /> &nbsp; <span class="d-none d-md-inline">Dashboard</span>
                                    </a>
                                    </Link>
                                    <Link to="/transfer">
                                    <a href="/transfer" class="ml-md-4 d-block transfer-ds text-center text-lg-left">
                                        <img src={icArrowUp} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Transfer</span>
                                    </a>
                                    </Link>
                                    <Link to="/top-up">
                                    <a href="top-up.html" class="ml-md-4 d-block top-up-ds text-center text-lg-left">
                                        <img src={icPlus} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Top Up</span>
                                    </a>
                                    </Link>
                                    <Link to="/profile">
                                    <a href="" class="ml-md-4 d-block profile-ds text-center text-lg-left">
                                        <img src={icUser} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                </div>
                                    <a href="/auth/logout" class="ml-md-4 d-block logout-ds text-center text-lg-left">
                                        <img src={icLogOut} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-12 col-sm-9" id="area">
                                <div class="body-area ">
                                    <div class="row justify-content-between">
                                        <div class="col-md-8">
                                            <p class="balance">Balance</p>
                                            <h4 class="credit">Rp{this.state.data.balance?this.state.data.balance:''}</h4>
                                            <p class="number">{this.state.data.phone?this.state.data.phone:''}</p>
                                        </div>
                                        <div class="col-md-4 align-self-center">
                                        <Link to="/transfer">
                                            <div class="btn-transfer float-md-right"   >
                                            &nbsp; <img src={icArrowUpTransfer} class="mb-2" />
                                                <h4 class="d-inline"> Transfer</h4>
                                            </div>
                                        </Link>
                                        <Link to="/top-up">
                                            <div class="btn-top-up float-md-right">
                                                &nbsp; <img src={icPlusTopUp} class="mb-2" />
                                                <h4 class="d-inline"> Top-Up</h4>
                                            </div>
                                        </Link>
                                        </div>
                                    </div>
                                </div>



                                <div class="row mt-3 justify-content-around wrapper">
                                    <div class="col-md-7 money">
                                        <div class="statistic">
                                            <div class="row ">
                                                <div class="col-lg-6">
                                                    <img src={icArrowIncome} alt=""/>
                                                    <p>Income</p>
                                                    <h4>Rp2.120.000</h4>
                                                </div>
                                                <div class="col-lg-6  pl-lg-5">
                                                    <img src={icArrowExpense} />
                                                    <p>Expense</p>
                                                    <h4>Rp1.560.000</h4>
                                                </div>

                                                <div class="row mt-5">
                                                    <div class="col-12">
                                                        <div class="p-lg-4 statistic-wrapper">
                                                        
                                                        
                                                            <div class="earning" ><span>+Rp65.000</span></div>
                                                            <div class="notif d-none d-sm-block"></div>
                                                            
                                                            <canvas height="268px" id="canvas" class="w-100"></canvas>
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5 transaction-history justify-content-lg-end mt-4 mt-md-0">
                                        <div class="row">
                                            <div class="col-8 bg">
                                                <h2 class="text-center">Transaction History</h2>
                                            </div>
                                            <div class="col-4 text-right">
                                                <a href="transactionHistory.html" class="see-all"><span class="text-right">See all</span></a>
                                            </div>
                                        </div>

                                        {/* <div class="row payment-history">
                                            <div class=" col-sm-9 col-md-8">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <img src={imProfile1} class="img-fluid" />
                                                    </div>
                                                    <div class="col-8">
                                                        <h4 >Samuel Suhi</h4>
                                                        <span >Transfer</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class=" col-sm-3 col-md-4 pt-3 money-plus">
                                                <p>+Rp50.000</p>
                                            </div>
                                        </div> */}




                                        {
                                            this.state.historyTransfer.map(history => {
                                                return(
                                                    <div class="row payment-history">
                                                    <div class=" col-sm-9 col-md-7">
                                                        <div class="row">
                                                            <div class="col-4">
                                                                <img src={imProfile3} class="img-fluid" />
                                                            </div>
                                                            <div class="col-8">
                                                                <h4 >{history.fullName}</h4>
                                                                <span>Transfer</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class=" col-sm-3 col-md-5 pt-3 money-minus">
                                                     <p >-Rp{history.amount}</p>
                                                    </div>
                                                </div>
                                                )
                                                
                                            })
                                        }
  


                                        {/* <div class="row payment-history">
                                            <div class=" col-sm-9 col-md-8">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <img src={imProfile3} class="img-fluid" />
                                                    </div>
                                                    <div class="col-8">
                                                        <h4 >Christine Mar...</h4>
                                                        <span>Transfer</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class=" col-sm-3 col-md-4 pt-3 money-plus">
                                                <p>+Rp150.000</p>
                                            </div>
                                        </div>
                                        <div class="row payment-history">
                                            <div class=" col-sm-9 col-md-7">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <img src={imProfile4} class="img-fluid" />
                                                    </div>
                                                    <div class="col-8">
                                                        <h4 >Adobe Inc.</h4>
                                                        <span>Subscription</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class=" col-sm-3 col-md-5 pt-3 float-right money-minus">
                                                <p>-Rp249.000</p>
                                            </div>
                                        </div> */}


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
 
export default Dashboard;
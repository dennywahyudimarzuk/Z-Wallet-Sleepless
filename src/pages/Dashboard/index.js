import React,{Component} from 'react';
import { icArrowExpense, icArrowIncome, icArrowUp, icArrowUpTransfer, icGridActive, icLogOut, icPlus,icPlusTopUp,icUser} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import './dashboard.css';
import {Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

class Dashboard extends Component {

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
                            <div class="col-3 bg-white shadow-lg sidebar_menu ">
                              <div class="sidebar h-100 d-flex pb-5" style={{flexDirection: 'column'}}>
                                 <div style={{flex: 1}}>
                                    <Link to="/dashboard">
                                    <a href="/" class="ml-md-4 d-block dashboard text-center text-lg-left">
                                        <div class="active-link"></div>
                                        <img alt="" src={icGridActive} /> &nbsp; <span class="d-none d-md-inline">Dashboard</span>
                                    </a>
                                    </Link>
                                    <Link to="/transfer">
                                    <a href="/transfer" class="ml-md-4 d-block transfer-ds text-center text-lg-left">
                                        <img alt="" src={icArrowUp} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Transfer</span>
                                    </a>
                                    </Link>
                                    <Link to="/top-up">
                                    <a href="top-up.html" class="ml-md-4 d-block top-up-ds text-center text-lg-left">
                                        <img alt="" src={icPlus} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Top Up</span>
                                    </a>
                                    </Link>
                                    <Link to="/profile">
                                    <a href="/" class="ml-md-4 d-block profile-ds text-center text-lg-left">
                                        <img alt="" src={icUser} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                </div>
                                    <a href="/auth/logout" class="ml-md-4 d-block logout-ds text-center text-lg-left">
                                        <img alt="" src={icLogOut} /> &nbsp; <br class="d-none d-md-block d-lg-none" /><span class="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-12 col-sm-9" id="area">
                                <div class="body-area ">
                                    <div class="row justify-content-between">
                                        <div class="col-md-8">
                                            <p class="balance">Balance</p>
                                            <h4 class="credit">Rp{this.props.userData.balance}</h4>
                                            <p class="number">{this.props.userData.phone}</p>
                                        </div>
                                        <div class="col-md-4 align-self-center">
                                        <Link to="/transfer">
                                            <div class="btn-transfer float-md-right"   >
                                            &nbsp; <img alt="" src={icArrowUpTransfer} class="mb-2" />
                                                <h4 class="d-inline"> Transfer</h4>
                                            </div>
                                        </Link>
                                        <Link to="/top-up">
                                            <div class="btn-top-up float-md-right">
                                                &nbsp; <img alt="" src={icPlusTopUp} class="mb-2" />
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
                                                    <img alt="" src={icArrowIncome}/>
                                                    <p>Income</p>
                                                    <h4>Rp2.120.000</h4>
                                                </div>
                                                <div class="col-lg-6  pl-lg-5">
                                                    <img alt="" src={icArrowExpense} />
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

                                    




                                        {
                                            this.state.historyTransfer.map(history => {
                                                return(
                                                    <div class="row payment-history">
                                                    <div class=" col-sm-9 col-md-7">
                                                        <div class="row">
                                                            <div class="col-4">
                                                                <img alt="" src={process.env.REACT_APP_URL+history.photo} class="img-fluid" />
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

const mapDispatchTOProps = (dispatch) => {
    return{
        handlePlus: (p) => dispatch({type:'BAGUS',value:p})
    }
}

export default connect(mapStateToProps,mapDispatchTOProps)(Dashboard);
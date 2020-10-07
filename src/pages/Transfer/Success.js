import React,{Component} from 'react';
import { icArrowUpActive ,icDownload,icGrid, icLogOut, icPencil, icPlus,icShare,icSuccess,icUser,imSamuel70x70} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import './success.css'
import {Link} from 'react-router-dom';
class Success extends Component {

    state = {
        dataTransfer : [],
        dataUSer:[]
    }

    componentDidMount()
    {
        let login = localStorage.getItem("login");
        if (login === 'true') {
              let dataTransfer = JSON.parse(localStorage.getItem("dataTransfer"));
              this.setState({dataTransfer:dataTransfer})    
            // console.log('datatrans',dataTransfer)
            let dataLogin = JSON.parse(localStorage.getItem("dataLogin")).data[0];
            this.setState({dataUSer:dataLogin}) 
            // console.log(dataLogin); 


        }

    }

    render() { 
        return ( 
            <>
                <Navbar/>
                    <div className="container content">
                        <div className="row">
                            <div className="col-3 bg-white shadow-lg">
                                <div className="sidebar sidebar_menu" >
                                   <Link to="/dashboard">
                                    <a href="/dashboard" className="ml-md-4 d-block dashboard-tr text-center text-lg-left">
                                        <img src={icGrid} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                    </Link>
                                    <Link to="/transfer">
                                    <a href="receiver.html" className="ml-md-4 d-block transfer text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img src={icArrowUpActive} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                    </Link>
                                    <Link to="/top-up">
                                    <a href="top-up"  className="ml-md-4 d-block top-up-tr text-center text-lg-left" >
                                        <img src={icPlus} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                    </Link>
                                    <Link to="/user">
                                    <a href="" className="ml-md-4 d-block profile-tr text-center text-lg-left">
                                        <img src={icUser} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                    <a href="login.html" className="ml-md-4 d-block logout-sc text-center text-lg-left">
                                        <img src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-12 col-sm-9" id="area">
                                <div class="body-area-success">
                                    <div class="status text-center">
                                        <img src={icSuccess} />
                                        <h2>Transfer Success</h2>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card-details ">
                                                <p>Amount</p>
                                                <h4>Rp{this.state.dataTransfer.amount}</h4>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="card-details ">
                                                <p>Balance Left</p>
                                                <h4>Rp{this.state.dataUSer.balance - this.state.dataTransfer.amount}</h4>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="card-details ">
                                                <p>Date & Time</p>
                                                <h4>{this.state.dataTransfer.date}</h4>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="card-details ">
                                                <p>Notes</p>
                                                <h4>{this.state.dataTransfer.notes}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 class="mt-3">Transfer To</h1>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card-profile ">
                                                <div class="row justify-content-lg-around">
                                                    <div class="col-4 col-sm-3 col-lg-2 m-0 ">
                                                        <img src={imSamuel70x70} />
                                                    </div>
                                                    <div class="col-9 col-sm-9 col-lg-10 receiver">
                                                        <h4 class="mt-1 mt-sm-0">{this.state.dataTransfer.name}</h4>
                                                        <p>{this.state.dataTransfer.phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center text-sm-right mt-md-5">
                                        <button class="btn btn-share"><img src={icShare} /></button> &nbsp;&nbsp;
                                        <button class="btn btn-download"><img src={icDownload} />&nbsp; <span>Download PDF</span></button> &nbsp;&nbsp;
                                        <Link to="/dashboard">
                                             <button class="btn back">Back to Home</button>
                                        </Link>
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
 
export default Success;
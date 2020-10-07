import React,{Component} from 'react';
import { icArrowUpActive ,icGrid, icLine, icLogOut, icPlus,icUser,imSamuel70x70,icX} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import './review.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
class Review extends Component {

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

    onContinue() 
    {
        
       let form = {
            idUserTransfer:this.state.dataUSer.id,
            idUserReceive:this.state.dataTransfer.idReceiver,
            amount: this.state.dataTransfer.amount,
            notes: this.state.dataTransfer.notes,
            balanceLeft :this.state.dataUSer.balance - this.state.dataTransfer.amount,
            time : this.state.dataTransfer.date
        }
        let data = qs.stringify(form);
        console.log('data dari form',form)

        axios.post('https://zwallet-api-production.herokuapp.com/v1/transfer',data)
             .then(res => {
                console.log('hasil axios',res)
                this.props.history.push('/transfer/success')
                
             })
             .catch(err => {
                console.log(err)
             })
    }


    render() { 
        return ( 
            <>
                <Navbar/>
                    <div className="container content">
                        <div className="row">
                            <div className="col-3 bg-white shadow-lg">
                                <div className="sidebar sidebar_menu">
                                   <Link to="/dashboard">
                                    <a href="/dashboard" className="ml-md-4 d-block dashboard-tr text-center text-lg-left">
                                        <img alt="" src={icGrid} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                    </Link>
                                    <Link to="/transfer">
                                    <a href="receiver.html" className="ml-md-4 d-block transfer text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img alt="" src={icArrowUpActive} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                    </Link>
                                    <Link to="/top-up">
                                    <a href="top-up"  className="ml-md-4 d-block top-up-tr text-center text-lg-left" >
                                        <img alt="" src={icPlus} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                    </Link>
                                    <Link to="/user">
                                    <a href="/" className="ml-md-4 d-block profile-tr text-center text-lg-left">
                                        <img alt="" src={icUser} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                    <a href="login.html" className="ml-md-4 d-block logout text-center text-lg-left">
                                        <img alt="" src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9" id="area">
                                <div className="body-area-transfer">
                                    <h1>Transfer To</h1>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card-profile ">
                                                <div className="row justify-content-lg-around">
                                                    <div className="col-4 col-sm-3 col-lg-2 m-0 ">
                                                        <img alt="" src={imSamuel70x70} />
                                                    </div>
                                                    <div className="col-9 col-sm-9 col-lg-10 receiver">
                                                         <h4 className="mt-1 mt-sm-0">{this.state.dataTransfer.name}</h4>
                                                        <p>{this.state.dataTransfer.phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h1>Details</h1>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card-details ">
                                                <p>Amount</p>
                                                <h4>Rp{this.state.dataTransfer.amount}</h4>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="card-details ">
                                                <p>Balance Left</p>
                                                <h4>Rp{this.state.dataUSer.balance - this.state.dataTransfer.amount}</h4>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="card-details ">
                                                <p>Date & Time</p>
                                                <h4>{this.state.dataTransfer.date}</h4>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="card-details ">
                                                <p>Notes</p>
                                                <h4>{this.state.dataTransfer.notes}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center text-sm-right">
                                        <button className="btn btn-tr" data-toggle="modal" data-target="#staticBackdrop">Continue</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>                                              
                <Footer/>

               
<div class="modal fade  " id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
          
        <div class="modal-header border-0 p-0 ">
          <h5 >Enter PIN to Transfer</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"><img alt="" src={icX} /></span>
          </button>
        </div>
        <div class="modal-body p-0">
            <p>
                Enter your 6 digits PIN for confirmation to continue transferring money. 
            </p>

            <div class="pin">
                <div class="row justify-content-md-around">
                    <div class="col-2">
                       <input type="text" class="form-control d-inline" />
                       <img alt="" src={icLine} class="input-line" />
                    </div>
                    <div class="col-2">
                       <input type="text" class="form-control d-inline" />
                       <img alt="" src={icLine} class="input-line" />
                    </div>
                    <div class="col-2">
                       <input type="text" class="form-control d-inline" />
                       <img alt="" src={icLine} class="input-line" />
                    </div>
                    <div class="col-2">
                       <input type="text" class="form-control d-inline" />
                       <img alt="" src={icLine} class="input-line" />
                    </div>
                    <div class="col-2">
                       <input type="text" class="form-control d-inline" />
                       <img alt="" src={icLine} class="input-line" />
                    </div>
                    <div class="col-2">
                       <input type="text" class="form-control d-inline" />
                       <img alt="" src={icLine} class="input-line" />
                    </div>
                </div>
            </div>

        </div>
        <div class="modal-footer border-0 p-0">
          <button type="button" class="btn btn-primary" onClick={() => this.onContinue()}   data-dismiss="modal" aria-label="Close">Continue</button>
        </div>
      </div>
    </div>
  </div>







            </>
         );
    }
}
 
export default Review;
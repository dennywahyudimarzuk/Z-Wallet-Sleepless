import React,{Component} from 'react';
import { icArrowUpActive ,icGrid, icLogOut, icPencil, icPlus,icUser,imSamuel70x70} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import './amount.css'
import axios from 'axios';
import {Link} from 'react-router-dom';
class Amount extends Component {

    state = {
        dataTransfer:[],
        data:[],
        form : {
            name :'',
            phone:'',
            notes: '',
            available:'',
            amount:'',
            idReceiver:'',
            date:''
          },
    }
    componentDidMount()
    {
        let id = this.props.match.params.id;
        axios.get(`https://zwallet-api-production.herokuapp.com/v1/profile/spesifik/${id}`)
        .then(res =>{
        //   console.log(res.data.data[0])
          this.setState({dataTransfer:res.data.data[0]}) 
        
        }).catch(err => {
          console.log(err)
        });

        var login = localStorage.getItem("login");
        if (login === 'true') {
              var dataLogin = JSON.parse(localStorage.getItem("dataLogin")).data[0];
              this.setState({data:dataLogin})    
        }


    }

    handleForm = (event) => {

        let  newForm  = this.state.form;
        newForm[event.target.name] = event.target.value;
        this.setState({
            newForm: newForm
        },
        ()=> {
          console.log(newForm);
        }
        )  
    }


    onContinue()
    {
        let arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
        let menit = new Date().getMinutes();
        let jam = new Date().getHours();
        let Tahun = new Date().getFullYear();
        let Tanggal = new Date().getDate();
        let bulan = new Date().getMonth();
        let time = `${arrbulan[bulan]} ${Tanggal}, ${Tahun} - ${jam}.${menit}`;


        this.setState({
            form:{
                name :this.state.dataTransfer.fullName,
                phone:this.state.dataTransfer.phone,
                notes: this.state.form.notes,
                available:this.state.data.balance,
                amount:this.state.form.amount,
                idReceiver:this.props.match.params.id,
                date:time
            }   
        },() => {
            console.log(this.state.form);
            localStorage.setItem("dataTransfer", JSON.stringify(this.state.form));
            this.props.history.push('/transfer/review')
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
                                    <a href="login.html" className="ml-md-4 d-block logout-am text-center text-lg-left">
                                        <img src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9" id="area">
                                    <div className="body-area-amount">
                    
                                        <h1 className="mt-3">Transfer To</h1>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card-profile ">
                                                    <div className="row justify-content-lg-around">
                                                        <div className="col-4 col-sm-3 col-lg-2 m-0 ">
                                                            <img src={imSamuel70x70} />
                                                        </div>
                                                        <div className="col-9 col-sm-9 col-lg-10 receiver">
                                                            <h4 className="mt-1 mt-sm-0">{this.state.dataTransfer.fullName}</h4>
                                                            <p>{this.state.dataTransfer.phone}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="notice">Type the amount you want to transfer and then
                                            press continue to the next steps.</p>
                                        
                                            <div className="row justify-content-center input-credit">
                                                <div className="col-md-8  text-center">
                                                    <input type="text" className="amount" placeholder="0.00" name="amount" value={this.state.form.amount} onChange={this.handleForm}/>
                                                    <h4>Rp {this.state.data.balance} Available</h4>
                                                    <div className="input-notes position-relative">
                                                        <input type="text" className="notes" placeholder="Add some notes" name="notes" value={this.state.form.notes} onChange={this.handleForm} />
                                                        <img src={icPencil} className="icon-pencil" />
                                                    </div>
                                                </div>
                                            </div>

                                        <div className="text-center text-sm-right mt-md-5 mb-3">
                                            <button className="btn continue-amount" onClick={() => this.onContinue()}>Continue</button>
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
 
export default Amount;
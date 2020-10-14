import React,{Component} from 'react';
import { icArrowUpActive ,icGrid, icLogOut, icPlus,icSearch,icUser} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import './transfer.css'
import {Link} from 'react-router-dom';
import axios from 'axios';

class Transfer extends Component {

    state = {
        profiles : []
    }


    onHandleInput(event)
    {

        const query = event.currentTarget.value;
        const token = JSON.parse(localStorage.getItem("token"));
        const email = localStorage.getItem("login");
        const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}} 
        axios.get(`${process.env.REACT_APP_API}/profile/detail?search=${query}`,headers)
        .then(res =>{
            const result = res.data.data.filter(man => {
                return man.email !== email
           })
             this.setState({profiles:result});
        
        }).catch(err => {
          console.log(err)
        });
    }


    componentDidMount()
    {
        const token = JSON.parse(localStorage.getItem("token"));
        const email = localStorage.getItem("login");
        const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}} 
        axios.get(`${process.env.REACT_APP_API}/profile/`,headers)
        .then(res =>{
        //   console.log('transfer/',res.data.data)
        const result = res.data.data.filter(man => {
             return man.email !== email
        })
          this.setState({profiles:result});
        
        }).catch(err => {
          console.log(err)
        });

    }


    render() { 
        return ( 
            <>
                <Navbar/>
                    <div className="container content">
                        <div className="row">
                            <div className="col-3 bg-white shadow-lg">
                               <div class="sidebar h-100 d-flex pb-5" style={{flexDirection: 'column'}}>
                                 <div style={{flex: 1}}> 
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
                                    <Link to="/profile">
                                    <a href="/" className="ml-md-4 d-block profile-tr text-center text-lg-left">
                                        <img alt="" src={icUser} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Profile</span>
                                    </a>
                                    </Link>
                                  </div>
                                    <a href="/auth/logout" className="ml-md-4 d-block logout-rc text-center text-lg-left">
                                        <img alt="" src={icLogOut} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Logout</span>
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-9" id="area">
                                <div className="body-area-transfer h-100">
                                    <h1>Search Receiver</h1>
                                    <div className="form-group search">
                                        <input type="text" className="form-control " placeholder="Search receiver here" onChange={(e) => this.onHandleInput(e)} />
                                        <div className="icon-search">
                                            <img alt="" src={icSearch} />
                                        </div>
                                    </div>
                                    <div className="row">

                                       

     

                                        {
                                            this.state.profiles.map(profile => {

                                                let url = `/transfer/amount/${profile.id}`;
                                                return(
                                                 
                                                 <div className="col-12">
                                                     <Link to={url}>
                                                    <div className="card-profile " onclick="window.location.href='input-transfer.html'">
                                                        <div className="row justify-content-lg-around">
                                                            <div className="col-4 col-sm-3 col-lg-2 m-0 ">
                                                                <img alt="" src={process.env.REACT_APP_URL+profile.photo} width="70" />
                                                            </div>
                                                            <div className="col-8 col-sm-9 col-lg-10 receiver">
                                                                <h4 className="mt-1 mt-sm-0">{profile.fullName}</h4>
                                                                <p>{profile.phone}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </Link>
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
 
export default Transfer;
import React,{Component} from 'react';
import { icArrowUp ,icGrid, icLogOut,icPlus,icUser} from '../../assets';
import { Navbar,Footer} from '../../component/molecules';
import ReactPaginate from 'react-paginate'
import './adminTransfer.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

class AdminTransfer extends Component {

    constructor(props){
        super(props)
        this.state = {
            dataTransaction  : [],
            perPage : 7,
            currentPage : 0,
            tableData : [],
            offset : 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.dataTransaction;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
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

        axios.get(`${process.env.REACT_APP_API}/transfer`,headers)
        .then(res =>{
            
            let dataTransfer = res.data.data

            var slice = dataTransfer.slice(this.state.offset, this.state.offset + this.state.perPage)

            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                dataTransaction : res.data.data,
                tableData : slice
            })

        //   this.setState({dataTransaction: dataTransfer});
          console.log('data transfer axios: ', this.state.dataTransaction)
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
                              <Link to="/admin">
                                    <a href="/dashboard" className="ml-md-4 d-block dashboard-tp text-center text-lg-left">
                                        <img alt="" src={icGrid} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                </Link>
                                <Link to="/admin/transfer">
                                    <a href="/transfer" className="ml-md-4 d-block transfer-tp text-center text-lg-left">
                                        <img alt="" src={icArrowUp} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                </Link>
                                <Link to="/admin/top-up">
                                    <a href="/top-up" className="ml-md-4 d-block top-up-adm text-center text-lg-left">
                                        {/* <div className="active-link"></div> */}
                                        <img alt="" src={icPlus} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Top Up</span>
                                    </a>
                                </Link>
                                <Link to="/admin/user">
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
                        
                                    <div class="row mx-1 pt-4 pb-4">
                                        <div class="col-12 mb-3">
                                            <div>
                                                <h3 class="admin-transfer-title">Transaction</h3>    
                                            </div>
                                        </div>


                                        <div class="col-12 table-responsive-sm">
                                            <table class="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                    <th scope="col" class="admin-dashboard-col-text" >No</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >ID</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >Sender</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >Receiver</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >Amount</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >Date & Time</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >Notes</th>
                                                    <th scope="col" class="admin-dashboard-col-text" >Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                { 
                                                    
                                                    this.state.tableData.map((item,index) => {

                                                    let bilangan = item.amount
                                                    var	reverse = bilangan.toString().split('').reverse().join(''),
                                                    rupiah 	= reverse.match(/\d{1,3}/g);
                                                    rupiah	= rupiah.join('.').split('').reverse().join('');

                                                    return(
                                                        <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item.id}</td>
                                                        <td>{item.idUserTransfer}</td>
                                                        <td>{item.idUserReceive}</td>
                                                        <td>Rp. {rupiah}</td>
                                                        <td>{item.time}</td>
                                                        <td>{item.notes}</td>
                                                        <td><button class="admin-transfer-button-delete">Delete</button></td>
                                                        </tr>
                                                    )
                                                })
                                                }

                                                </tbody>
                                            </table>
                                        </div>
                                        </div>


                                        <div class="col-12">
                                            <div class="d-flex justify-content-center">
                                                <ReactPaginate
                                                previousLabel={"prev"}
                                                nextLabel={"next"}
                                                breakLabel={"..."}
                                                breakClassName={"break-me"}
                                                pageCount={this.state.pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={"pagination"}
                                                subContainerClassName={"pages pagination"}
                                                activeClassName={"active"}/>
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
 
export default AdminTransfer;
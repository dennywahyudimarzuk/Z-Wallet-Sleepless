import React,{useEffect, useState} from 'react';
import { icArrowUp , icGridActive, icLogOut,icPlus,icUser,icArrowExpense,icArrowIncome} from '../../assets';
import { Navbar,Footer, CardPerson, NavigationMobile} from '../../component/molecules';
import './history.css'
import {Link} from 'react-router-dom';
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates'
import './historyDate.css'

import axios from 'axios';

function History(){

    
        const [historyTransfer,setHistoryTransfer] = useState([])
        const [modalShow , setModalShow] = useState(false)
        const [pagination, setPagination] = useState(false)
        const [paginationLimit, setPaginationLimit] = useState(2)
        const [startDate, setStartDate] = useState()
        const [endDate, setEndDate] = useState()
        const [focus, setFocus] = useState(START_DATE)

        
        const openCalendar = () => {
            setModalShow(true)
        }

        const handleFocusChange = newFocus => {
            setFocus(newFocus || START_DATE)
        }
    
        


        function handlePagination(){
            let getAlldata = historyTransfer.length

            setPagination(true)
            setPaginationLimit(4)
            console.log(paginationLimit)
            
        }

    function handleShowLessMore(){
        setPagination(false)
        setPaginationLimit(2)
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}} 
        axios.get(`${process.env.REACT_APP_API}/transfer`,headers)
        .then(res =>{
        
        setHistoryTransfer(res.data.data)
        
          console.log('ini data did mount: ', historyTransfer)
        }).catch(err => {
          console.log('data transfer axios error: ', err.message)
        });
    }, [])

    // componentDidMount()
    // {
    //         // const token = JSON.parse(localStorage.getItem("token"));
    //         // const headers = { headers: {'Authorization': `Bearer ${token.accessToken}`}}  

    // }


    // componentDidUpdate(){
    //     this.setState({ 
    //         startDate : this.props.startDate,
    //         endDate : this.props.endDate
    //     })
    // }
    

    


    
        return ( 
            <>
                <div className="d-none d-sm-block">
                <Navbar/>
                </div>
                    <div className="container content">
                        <div className="row">
                            <div className="col-3 bg-white shadow-lg sidebar_menu">
                            <div className="sidebar h-100 d-flex pb-5" style={{flexDirection: 'column'}}>
                              <div style={{flex: 1}}> 
                                <Link to="/dashboard">
                                    <a href="/dashboard" className="ml-md-4 d-block  top-up-tp  text-center text-lg-left">
                                        <div className="active-link"></div>
                                        <img alt="" src={icGridActive} /> &nbsp; <span className="d-none d-md-inline">Dashboard</span>
                                    </a>
                                </Link>
                                <Link to="/transfer">
                                    <a href="/transfer" className="ml-md-4 d-block transfer-tp text-center text-lg-left">
                                        <img alt="" src={icArrowUp} /> &nbsp; <br className="d-none d-md-block d-lg-none" /><span className="d-none d-md-inline">Transfer</span>
                                    </a>
                                </Link>
                                <Link to="/top-up">
                                    <a href="/top-up" className="ml-md-4 d-block  dashboard-tp text-center text-lg-left">
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
                                <div className="body-area-history">
                                <div className="d-sm-none">
                                     <NavigationMobile page="History" to="/dashboard"/>
                                </div>
                                    <h1 className="d-none d-sm-block">Transaction History</h1>
                                    <p>This Week</p>

                                    <div className="row">
                                        
                                        {
                                            historyTransfer.slice(0,paginationLimit).map(history => {
                                                return(
                                                    <>
                                                        <div className="col-6 mb-2 d-none d-sm-block">
                                                            <div className="row justify-content-lg-around">
                                                                <div className="col-md-3 m-0">
                                                                    <img src={process.env.REACT_APP_URL+history.photo} width="56" height="56" style={{borderRadius:10}} alt=" " />
                                                                </div>
                                                                <div className="col-md-9  user-transaction">
                                                                    <h4 className="mt-1 mt-sm-0">{history.fullName}</h4>
                                                                    <p>Transfer</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 text-right d-none d-sm-block">
                                                            <span  className="d-block mt-4 plus">+Rp{history.amount}</span>
                                                        </div>
                                                        <CardPerson key={history.id} name={history.fullName} photo={process.env.REACT_APP_URL+history.photo} amount={history.amount}/>
                                                    </>
                                                )
                                            })

                                        }

                                        

                                    </div>
                                    <div class="d-flex justify-content-center">
                                        { pagination ? (<button className='load-more-button' onClick={() => handleShowLessMore()}>Show less more</button>) : (
                                            <button className='load-more-button' onClick={() => handlePagination()}>Show Load more</button>
                                        )}
                                    </div>

                                    <p className="mt-3">This Month</p>

                                    <div className="row">

                                    {
                                            historyTransfer.slice(0, paginationLimit).map(history => {
                                                return(
                                                    <>

                                                        <div className="col-6 mb-2 d-none d-sm-block">
                                                            <div className="row justify-content-lg-around">
                                                                <div className="col-md-3 m-0">
                                                                    <img src={process.env.REACT_APP_URL+history.photo} width="56" height="56" style={{borderRadius:10}} alt=" " />
                                                                </div>
                                                                <div className="col-md-9  user-transaction">
                                                                    <h4 className="mt-1 mt-sm-0">{history.fullName}</h4>
                                                                    <p>Transfer</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-6 text-right d-none d-sm-block">
                                                            <span  className="d-block mt-4 plus">+Rp{history.amount}</span>
                                                        </div>

                                                        <CardPerson key={history.id} name={history.fullName} photo={process.env.REACT_APP_URL+history.photo} amount={history.amount}/>
                                                   </>

                                                )
                                            })

                                        }

                                    </div>
                                    
                                    <div class="d-flex justify-content-center">
                                        { pagination ? (<button className='load-more-button' onClick={() => handleShowLessMore()}>Show less more</button>) : (
                                            <button className='load-more-button' onClick={() => handlePagination()}>Show Load more</button>
                                        )}
                                    </div>

                                </div>

                            </div>
                        </div>
                                <div class="d-flex justify-content-between mb-5 mx-4 d-md-none  d-block ">
                                <div>
                                    <button class="button-sort">
                                        <img src={icArrowExpense} alt=''/>
                                    </button>
            
                                    <button class="button-sort mx-2">
                                        <img src={icArrowIncome} alt='' />
                                    </button>
                                </div>


                                <button class="filter-date-button" onClick={() => openCalendar()}>
                                    <p class="mt-2">Filter By Date</p>
                                </button>
                            </div>
                            
                        
                        { modalShow ? (
                            <>
                            <div class="form-popup d-md-none" id="myCalendar">
                                <form class="form-container">
                                    <div class="d-flex justify-content-center pt-4">
                                        <p class="filter-by-date-text">Filter by Date</p>
                                    </div>
                            
                                    <div>
                                    <div class="calendar-box mx-5">

                                        <DateRangePickerCalendar
                                        startDate={startDate}
                                        endDate={endDate}
                                        focus={focus}
                                        onStartDateChange={setStartDate}
                                        onEndDateChange={setEndDate}
                                        onFocusChange={handleFocusChange}
                                        locale={enGB}
                                        />
                                            
                                    </div>
                                    </div>

                                    
                                    <div>

                            
                            </div>
                                    <div class="d-flex justify-content-between mx-5">
                                        <div class="d-flex flex-column">
                                            <div>From</div>
                                            <div class="date-text"> {startDate ? (format(startDate, 'yyyy-MM-dd', { locale: enGB })) : (format(new Date(), 'yyyy-MM-dd', { locale: enGB })) }</div>
                                        </div>
                                        
                                        <div class="d-flex flex-column">
                                            <div>To</div>
                                            <div class="date-text"> {endDate ? format(endDate, 'yyyy-MM-dd', { locale: enGB }) : (format(new Date(), 'yyyy-MM-dd', { locale: enGB })) }</div>
                                        </div>
                                    </div>

                                <div class="d-flex justify-content-center mb-4 mt-4">
                                    <button type="button" class="calendar-apply" onclick="closeCalendar()">Apply</button>
                                </div>
                                </form>
                            </div>
                        </>
                            ) : (
                                <p>ini false</p>
                            )
                        }



                                        
                        
                    </div>                                             
                <Footer/>
            </>
         );
    }

 
export default History;
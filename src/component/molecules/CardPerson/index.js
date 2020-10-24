import React from 'react'

 const CardPerson = ({name,photo,amount}) => {
    return (
        <>
            <div className="card-person shadow-sm d-sm-none" >
                <div style={{flex:1}}>
                         <div className="wrapper-card-person" >
                        <img alt="" src={photo}  className="img-fluid" />
                        <div>
                             <h2 className="mt-0">{name}</h2>
                            <span className="mt-0">Transfer</span>
                        </div>
                        </div>
                </div>
                <div >
                    <p>+Rp{amount}</p>
                </div>
            </div>            
        </>
    )
}

export default  CardPerson;

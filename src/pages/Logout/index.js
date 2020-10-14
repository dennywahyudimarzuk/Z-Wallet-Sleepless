import React,{Component} from 'react'
class Logout extends Component {

    componentDidMount()
    {
        localStorage.clear();
        this.props.history.push('/auth')
    }
    render() { 
       return(
           <div>

           </div>
       )
    }
}
 
export default Logout;
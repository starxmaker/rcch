import React from "react"

class RegistroComponent extends React.Component{
    render(){
        return(
            <div className="container" style={{marginTop:"2%"}}>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default RegistroComponent
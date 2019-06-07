import React from 'react';
import './index.css';

function index(props) {

    function renderContent(){
        return  React.cloneElement(props.content);
      }

    return (
        <div className="mt-70 p-20">
            <div className="container-fluid layout">
                <h1 className="text-center" >Brands Management</h1>
                <hr/>    
                {renderContent()}
            </div>
        </div>
    );
}

export default index;
import React from 'react';
import './index.css';

function Categories(props) {   

    function renderContent(){
        return  React.cloneElement(props.content);
    }

    return (
        <div className="mt-70 p-20">
        	<div className="container-fluid layout">
        		<div className="text-center p-20">
        			<h1>QUẢN LÝ DANH MỤC</h1>
        		</div>       	
            	{renderContent()}            	
            </div>
        </div>
    );
}

export default Categories;

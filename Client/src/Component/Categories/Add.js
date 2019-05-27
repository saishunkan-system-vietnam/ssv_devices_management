import React, {useState, useEffect} from 'react';
import './index.css';

function Add() {  
    return (   
    		<div className="row">           
    			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <form action="" method="POST" role="form">
                        <legend>Add new category</legend>
                    
                        <div class="form-group">
                            <label for="">label</label>
                            <input type="text" class="form-control" id="" placeholder="Input field"/>
                        </div>
                    
                        
                    
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
    		</div>
    );
}

export default Add;

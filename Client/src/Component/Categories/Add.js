import React, {useState, useEffect} from 'react';
import './index.css';

function Add() {  
    return (   
    		<div className="row">           
    			<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <form action="" method="POST" role="form">
                        <legend className="pl-30">Add new category</legend><hr />
                    
                        <div className="form-group">
                            <div className="row">
                                <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 pl-30">
                                    <label for="">label</label>
                                </div>
                                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                    <input type="text" className="form-control" id="" placeholder="Input field"/>
                                </div>
                            </div>
                        </div>
                    
                        
                    
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
    		</div>
    );
}

export default Add;

import React from 'react';
import HeaderMobile from '../Master/header_mobile';
import HeaderDesktop from '../Master/header_desktop';
import MenuSidebar from '../Master/menu_sidebar';

function MasterPage(props) {

   function renderContent(){
      return  React.cloneElement(props.content);
    }
    return (
        <div className="page-wrapper">
            <HeaderMobile />
            <MenuSidebar />
            <div className="page-container">
                <HeaderDesktop />
                {renderContent()}
            </div>

        </div>
    )
}

export default MasterPage;
import React from 'react';
import HeaderMobile from './/header_mobile';
import HeaderDesktop from './/header_desktop';
import MenuSidebar from './/menu_sidebar';
import '../common.css';

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

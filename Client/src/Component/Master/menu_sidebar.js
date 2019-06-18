import React from 'react';
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';

function MenuSidebar() {
    const menu = [
        {
            icon: 'fas fa-tachometer-alt',
            label: 'Dashboard',
            to: '/dashboard',
        },
        {
            icon: 'fas fa-file-text',
            label: 'Categories',
            content: [
                {
                    icon: 'fa fa-shopping-bag',
                    label: 'Brand',
                    to: '/brand',
                },
                {
                    icon: 'fa fa-tasks',
                    label: 'Categories',
                    to: '/categories',
                },
            ],
        },
        {
            icon: 'bolt',
            label: 'Devices',
            content: [
                {
                    icon: 'fa fa-desktop',
                    label: 'Devices',
                    to: '/devices',
                },
                {
                    icon: 'fa fa-american-sign-language-interpreting',
                    label: 'Borrow Device',
                    to: '/borrow',
                },
            ],
        },
        {
            icon: 'fa fa-wrench',
            label: 'Maintenance',
            to: '/maintenance',
        },
        {
            icon: 'fas fa-user',
            label: 'User',
            to: '/user',
        },
        // {
        //     icon: 'external-link',
        //     label: 'External Link',
        //     externalLink: true,
        //     to: 'https:www.google.com',
        // },
    ];

    return (
        <aside className="menu-sidebar d-none d-lg-block">
            <div className="logo">
                <a href="brand.html">
                    <img src="../../../images/icon/logo.png" alt="Cool Admin" />
                </a>
            </div>
        <MetisMenu
            content={menu}
            //LinkComponent={RouterLink}
        />
        </aside>
    )
}

export default MenuSidebar;

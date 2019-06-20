import React from 'react';
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';
import logo from '../images/icon/logo.png';
import '../common.css';

function MenuSidebar() {
    const menu = [
        {
            icon: 'fas fa-tachometer-alt',
            label: 'Trang chủ',
            to: '/dashboard',
        },
        {
            icon: 'fas fa-file-text',
            label: 'Danh mục',
            content: [
                {
                    icon: 'fa fa-shopping-bag',
                    label: 'Thương hiệu',
                    to: '/brand',
                },
                {
                    icon: 'fa fa-tasks',
                    label: 'Danh mục',
                    to: '/categories',
                },
            ],
        },
        {
            icon: 'bolt',
            label: 'Thiết bị',
            content: [
                {
                    icon: 'fa fa-desktop',
                    label: 'Thiết bị',
                    to: '/devices',
                },
                {
                    icon: 'fa fa-american-sign-language-interpreting',
                    label: 'Mượn thiết bị',
                    to: '/borrow',
                },
            ],
        },
        {
            icon: 'fa fa-wrench',
            label: 'Bảo trì',
            to: '/maintenance',
        },
        {
            icon: 'fas fa-user',
            label: 'Người dùng',
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
                    <img src={logo} alt="Cool Admin" />
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

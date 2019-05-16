<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
?>
        <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="initial-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <title></title>
    <style type="text/css">
        body {
            width: 100%;
            margin: 0px 0px 15px 0px;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }

        @media only screen and (max-width: 600px) {
            table[class="table-row"] {
                float: none !important;
                width: 98% !important;
                padding-left: 20px !important;
                padding-right: 20px !important;
            }

            table[class="table-row-fixed"] {
                float: none !important;
                width: 98% !important;
            }

            table[class="table-col"], table[class="table-col-border"] {
                float: none !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                table-layout: fixed;
            }

            td[class="table-col-td"] {
                width: 100% !important;
            }

            table[class="table-col-border"] + table[class="table-col-border"] {
                padding-top: 12px;
                margin-top: 12px;
                border-top: 1px solid #E8E8E8;
            }

            table[class="table-col"] + table[class="table-col"] {
                margin-top: 15px;
            }

            td[class="table-row-td"] {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }

            table[class="navbar-row"], td[class="navbar-row-td"] {
                width: 100% !important;
            }

            img {
                max-width: 100% !important;
                display: inline !important;
            }

            img[class="pull-right"] {
                float: right;
                margin-left: 11px;
                max-width: 125px !important;
                padding-bottom: 0 !important;
            }

            img[class="pull-left"] {
                float: left;
                margin-right: 11px;
                max-width: 125px !important;
                padding-bottom: 0 !important;
            }

            table[class="table-space"], table[class="header-row"] {
                float: none !important;
                width: 98% !important;
            }

            td[class="header-row-td"] {
                width: 100% !important;
            }
        }

        @media only screen and (max-width: 480px) {
            table[class="table-row"] {
                padding-left: 16px !important;
                padding-right: 16px !important;
            }
        }

        @media only screen and (max-width: 320px) {
            table[class="table-row"] {
                padding-left: 12px !important;
                padding-right: 12px !important;
            }
        }

        @media only screen and (max-width: 458px) {
            td[class="table-td-wrap"] {
                width: 100% !important;
            }
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; font-size:13px; color: #444444; min-height: 200px;" bgcolor="#E4E6E9"
      leftmargin="0" topmargin="0" marginheight="0" marginwidth="0">
<table width="100%" height="100%" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td width="100%" align="center" valign="top" bgcolor="#E4E6E9"
            style="background-color:#E4E6E9; min-height: 200px;">
            <table>
                <tr>
                    <td class="table-td-wrap" align="center" width="458">
                        <table class="table-space"
                               style="height: 40px; font-size: 0px; line-height: 0; width: 600px; background-color: orange;"
                               width="600" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                            <tr>
                                <td class="table-space-td" valign="middle"
                                    style="text-align: center; width: 600px; background-color: orange;" width="600"
                                    bgcolor="#13201D" align="left">
                                    <b style="color:#fff;font-size:20px;padding:10px 0px;float: left;width: 100%;">Devices Management
                                        - Saishunkan System Vietnam</b>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="table-space" height="8"
                               style="height: 4px; font-size: 0px; line-height: 0; width: 600px; background-color: #ffffff;"
                               width="600" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                            <tr>
                                <td class="table-space-td" valign="middle" height="8"
                                    style="height: 8px; width: 600px; background-color: #ffffff;" width="600"
                                    bgcolor="#FFFFFF" align="left">&nbsp;
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="table-row" width="600" bgcolor="#FFFFFF"
                               style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0"
                               border="0">
                            <tbody>
                            <tr>
                                <td class="table-row-td"
                                    style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 36px; padding-right: 36px;"
                                    valign="top" align="left">
                                    <table class="table-col" align="left" width="530" cellspacing="0" cellpadding="0"
                                           border="0" style="table-layout: fixed;">
                                        <tbody>
                                        <tr>
                                            <td class="table-col-td" width="530"
                                                style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; width: 378px;"
                                                valign="top" align="left">
                                                <div style="font-family: Arial, sans-serif; line-height: 20px; color: #444444; font-size: 13px;">
                                                    Xin chào <b>Nguyễn Văn A</b>!
                                                    <br/>
                                                    <?php if($data['accept'] == 1) { ?>
                                                    Yêu cầu mượn thiết bị <b>Iphone X</b> phục vụ cho việc <b>test dự án Anshin APP</b> đã được <b>Admin</b> chấp nhận.
                                                    Bạn có thể đến phòng quản lý thiết bị để nhận thiết bị. Quy định mượn thiết bị được ghi rõ trong bản <b>Cam kết mượn thiết bị</b>. Chúc bạn một ngày vui vẻ!
                                                    <?php } else { ?>
                                                    Yêu cầu mượn thiết bị <b>Iphone X</b> phục vụ cho việc <b>test dự án Anshin APP</b> đã không được <b>Admin</b> chấp nhận.
                                                    Bở lý do thiết bị đang hỏng. (Thiết bị đang được sử dụng ở dự án khác) Bạn có thể đợi đến ngày xxxx để mượn lại thiết bị.
                                                    <?php }?>
                                                    <br/>
                                                    <br/>
                                                    <a href="mailto:vn@saishunkansys.com">vn@saishunkansys.com </a><br/>
                                                    Phone: +84.4.3212.1048
                                                    14FL., Hoa Binh Tower, 106 Hoang Quoc Viet, Nghia Do Ward, Cau Giay
                                                    Dist., Vietnam<br/>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="table-space" height="6"
                               style="height: 6px; font-size: 0px; line-height: 0; width: 600px; background-color: #ffffff;"
                               width="600" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                            <tr>
                                <td class="table-space-td" valign="middle" height="6"
                                    style="height: 6px; width: 600px; background-color: #ffffff;" width="600"
                                    bgcolor="#FFFFFF" align="left">&nbsp;
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="table-row-fixed" width="600" bgcolor="#FFFFFF"
                               style="table-layout: fixed; background-color: #ffffff;" cellspacing="0" cellpadding="0"
                               border="0">
                            <tbody>
                            <tr>
                                <td class="table-row-fixed-td"
                                    style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal; padding-left: 1px; padding-right: 1px;"
                                    valign="top" align="left">
                                    <table class="table-col" align="left" width="600" cellspacing="0" cellpadding="0"
                                           border="0" style="table-layout: fixed;">
                                        <tbody>
                                        <tr>
                                            <td class="table-col-td" width="600"
                                                style="font-family: Arial, sans-serif; line-height: 19px; color: #444444; font-size: 13px; font-weight: normal;"
                                                valign="top" align="left">
                                                <table width="100%" cellspacing="0" cellpadding="0" border="0"
                                                       style="table-layout: fixed;">
                                                    <tbody>
                                                    <tr>
                                                        <td width="100%" align="center" bgcolor="#f5f5f5"
                                                            style="font-family: Arial, sans-serif; line-height: 24px; color: #bbbbbb; font-size: 13px; font-weight: normal; text-align: center; padding: 9px; border-width: 1px 0px 0px; border-style: solid; border-color: #e3e3e3; background-color: #f5f5f5;"
                                                            valign="top">
                                                            <a href="http://vn.saishunkansys.com/"
                                                               style="color: #428bca; text-decoration: none; background-color: transparent;">Copyright
                                                                &copy; <?php echo date('Y');?> Saishunkan System
                                                                Vietnam</a>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="table-space" height="1"
                               style="height: 1px; font-size: 0px; line-height: 0; width: 600px; background-color: #ffffff;"
                               width="600" bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                            <tr>
                                <td class="table-space-td" valign="middle" height="1"
                                    style="height: 1px; width: 600px; background-color: #ffffff;" width="600"
                                    bgcolor="#FFFFFF" align="left">&nbsp;
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="table-space" height="36"
                               style="height: 36px; font-size: 0px; line-height: 0; width: 600px; background-color: #e4e6e9;"
                               width="600" bgcolor="#E4E6E9" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                            <tr>
                                <td class="table-space-td" valign="middle" height="36"
                                    style="height: 36px; width: 600px; background-color: #e4e6e9;" width="600"
                                    bgcolor="#E4E6E9" align="left">&nbsp;
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>

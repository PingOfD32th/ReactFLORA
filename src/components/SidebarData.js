import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text',
    manager: true,
    supervisor: false,
    admin: true,
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text',
    manager: true,
    supervisor: true,
    admin: true,
  },
  {
    title: 'Past Orders',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    manager: true,
    supervisor: true,
    admin: true,
  },
  {
    title: 'MSDS',
    path: '/MSDS',
    icon: <BsIcons.BsExclamationDiamond />,
    cName: 'nav-text',
    manager: false,
    supervisor: false,
    admin: true,
  },
  {
    title: 'Add Item',
    path: '/addItem',
    icon: <FaIcons.FaPlusSquare />,
    cName: 'nav-text',
    manager: false,
    supervisor: false,
    admin: true,
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
    manager: true,
    supervisor: true,
    admin: true,
  }
];

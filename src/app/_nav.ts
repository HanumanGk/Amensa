import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Components'
  },
  {
    title: true,
    name: 'Sample Tracking'
  },
  {
    name: 'Sample Tracking',
    url: '/appointment',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Track All Samples',
        url: '/appointment/allAppointment',
        icon: 'icon-puzzle'
      },
      {
        name: 'Track Today Samples',
        url: '/appointment/todaysAppointment',
        icon: 'icon-puzzle'
      },
      {
        name: 'Track Weekly Sample',
        url: '/appointment/weeklyAppointment',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
    title: true,
    name: 'Masters'
  },
  {
    name: 'Labs',
    url: '/labs',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Add Labs',
        url: '/labs/addlabs',
        icon: 'icon-cursor'
      },
      {
        name: 'View Labs',
        url: '/labs/viewlabs',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Packages',
    url: '/package',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Manage Package',
        url: '/package/addpackage',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Test',
    url: '/test',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Manage Test',
        url: '/test/managetest',
        icon: 'icon-cursor'
      },
    ]
  },
  {
    name: 'Container',
    url: '/container',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Manage Container',
        url: '/container/managecontainer',
        icon: 'icon-cursor'
      },
    ]
  },
  {
    name: 'Franchisee',
    url: '/franchisee',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Add Franchisee',
        url: '/franchisee/addfranchisee',
        icon: 'icon-cursor'
      },
      {
        name: 'View Franchisee',
        url: '/franchisee/viewfranchisee',
        icon: 'icon-cursor'
      },
    ]
  }
];

export const frNavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Data Entry'
  },
  {
    name: 'Data Entry',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'New Sample',
        url: '/base/lab-comparision',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
    title: true,
    name: 'Sample Tracking'
  },
  {
    name: 'Sample Tracking',
    url: '/appointment',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Track All Samples',
        url: '/appointment/allAppointment',
        icon: 'icon-puzzle'
      },
      {
        name: 'Track Today Samples',
        url: '/appointment/todaysAppointment',
        icon: 'icon-puzzle'
      },
      {
        name: 'Track Weekly Sample',
        url: '/appointment/weeklyAppointment',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
    title: true,
    name: 'Reports'
  },
  {
    name: 'Reports',
    url: '/report',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'All Report',
        url: '/report/allReports',
        icon: 'icon-puzzle'
      },
      {
        name: 'New Report',
        url: '/report/newReports',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
    title: true,
    name: 'Billing'
  },
  {
    name: 'Billing',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Add Money',
        url: '/billing/addMoney',
        icon: 'icon-puzzle'
      },
      {
        name: 'Payment Entry',
        url: '/base/lab-comparision',
        icon: 'icon-puzzle'
      },
      {
        name: 'Transaction Details',
        url: '/base/lab-comparision',
        icon: 'icon-puzzle'
      },
      {
        name: 'Paitent Invoice',
        url: '/base/lab-comparision',
        icon: 'icon-puzzle'
      },
      {
        name: 'Approved Payments',
        url: '/base/lab-comparision',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
    title: true,
    name: 'My Accounts'
  },
  {
    name: 'My Accounts',
    url: '/accounts',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Update Profile',
        url: '/accounts/updateFranchisee',
        icon: 'icon-puzzle'
      },
      {
        name: 'Subscription',
        url: '/base/lab-comparision',
        icon: 'icon-puzzle'
      },
      {
        name: 'Wallet',
        url: '/base/lab-comparision',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
    title: true,
    name: 'MIS'
  },
  {
    name: 'MIS',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Weekly Report',
        url: '/base/appointment',
        icon: 'icon-puzzle'
      },
      {
        name: 'Monthly Report ',
        url: '/base/lab-comparision',
        icon: 'icon-puzzle'
      },
    ]
  }
];

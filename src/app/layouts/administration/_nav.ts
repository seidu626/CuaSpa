export const navItems = [
  {
    name: 'Dashboard',
    url: '/admin',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  {
    name: 'Organisation',
    url: '#',
    icon: 'fa fa-home',
    children: [
      {
        name: 'Divisions',
        url: '/admin/organisation/divisions',
        icon: 'fa fa-building'
      },
      {
        name: 'Deparments',
        url: '/admin/organisation',
        icon: 'fa fa-building'
      },
      {
        name: 'Sections',
        url: '/admin/organisation/sections',
        icon: 'icon-puzzle'
      },
      {
        name: 'Level',
        url: '/admin/organisation/levels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Job Roles',
        url: '/admin/organisation/jobRoles',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Employees',
    url: '#',
    icon: 'fa fa-users',
    children: [
      {
        name: 'List',
        url: '/admin/employees',
        icon: 'fa fa-users'
      },
      {
        name: 'Categories',
        url: '/admin/employees/categories',
        icon: 'icon-user'
      },
      {
        name: 'Membership Types',
        url: '/admin/employees/memberTypes',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Security',
    url: '#',
    icon: 'fa fa-eye',
    children: [
      {
        name: 'Roles',
        url: '/admin/security/roles',
        icon: 'fa fa-eye',
        badge: {
          variant: 'success',
          text: ''
        }
      },
      {
        name: 'Permissions',
        url: '/admin/security/permissions',
        icon: 'fa fa-eye'
      },
      {
        name: 'User Accounts',
        url: '/admin/security',
        icon: 'fa fa-eye',
        badge: {
          variant: 'secondary',
          text: ''
        }
      },
    ]
  },
  {
    name: 'Cms',
    url: '#',
    icon: 'fa fa-file-archive-o',
    children: [
      {
        name: 'Media Items',
        url: '/admin/media',
        icon: 'fa fa-file-archive-o'
      },
      {
        name: 'News',
        url: '/admin/news',
        icon: 'fa fa-newspaper-o'
      }
    ]
  },
  {
    name: 'Enquiries',
    url: '/admin/enquiries',
    icon: 'fa fa-ticket',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  {
    divider: true
  },
  {
    name: 'Settings',
    url: '#',
    icon: 'fa fa-cog',
    children: [
      {
        name: 'List',
        url: '/admin/settings',
        icon: 'icon-cog'
      },
      {
        name: 'General Settings',
        url: '/admin/settings/general',
        icon: 'icon-cog'
      }
    ]
  }
];

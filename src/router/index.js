import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  // { path: '/reset', component: () => import('@/views/reset'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
  
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: {
        title: 'Dashboard',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/myprofile',
    component: Layout,
    redirect: '/profile/:userId',
    hidden: true,
    children: [{
      path: ':userId',
      component: () => import('@/views/user/userProfile'),
      name: 'userProfile',
      hidden: true,
      meta: { 
        title:'My Profile', 
        icon: 'user',
      }
    }]
  }

  // {
  //   path: '/medias',
  //   component: Layout,
  //   redirect: '/media/index',
  //   meta: { 
  //     title: 'Media Library', 
  //     icon: 'list',
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/media/index'),
  //       name: 'Media Library',
  //     }
  //   ]

  // }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRoutes = [

  // {
  //   path: '/newsboard',
  //   component: Layout,
  //   redirect: '/newsboard/index',
  //   meta: {
  //     title: 'News',
  //     icon: 'example',
  //     roles: ['outlet']
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/newsboard/index'),
  //       name: 'Newsboard',
  //       meta: {
  //         title: 'News',
  //         icon: 'news'
  //       }
  //     },
  //     {
  //       path: 'favourite',
  //       component: () => import('@/views/newsboard/favourite'),
  //       name: 'FavouriteNews',
  //       meta: {
  //         title: 'Favourite News',
  //         icon: 'news'
  //       }
  //     },
  //     {
  //       path: '/one/:id',
  //       component: () => import('@/views/newsboard/one'),
  //       name: 'SingleNews',
  //       hidden: true,
  //       meta: {
  //         title: 'Single News',
  //         icon: 'news'
  //       }
  //     }
  //   ]

  // },

  // {
  //   path: '/assignment',
  //   component: Layout,
  //   name: 'Assignment',
  //   meta: {
  //     title: 'Assignment',
  //     icon: 'example',
  //     roles: ['management']
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/assignment/index'),
  //       name: 'AssignmentList',
  //       meta: {
  //         title: 'List',
  //         icon: 'example',
  //         roles: ['management']
  //       }
  //     },
  //     {
  //       path: 'calendar',
  //       component: () => import('@/views/assignment/calendar'),
  //       name: 'AssignmentCalendar',
  //       meta: {
  //         title: 'Calendar',
  //         icon: 'example',
  //         roles: ['management']
  //       }
  //     }
  //   ]

  // },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: {
      title: 'User',
      icon: 'user',
      roles: ['administrator']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index'),
        name: 'userList',
        meta: {
          title: 'User List',
          icon: 'peoples'
        }
      },
      {
        path: 'register',
        component: () => import('@/views/user/userRegister'),
        name: 'userRegister',
        hidden: true,
        meta: {
          title: 'Register User',
          icon: 'form',
          roles: ['administrator']
        }
      },
      // {
      //   path: 'profile/:userId',
      //   component: () => import('@/views/user/userProfile'),
      //   name: 'userProfile',
      //   hidden: true,
      //   meta: { 
      //     title:'Profile', 
      //     icon: 'example',
      //     roles: ['management']
      //   }
      // },
      {
        path: 'profile/:userId',
        component: () => import('@/views/user/userProfileManagement'),
        name: 'userProfileManagement',
        hidden: true,
        meta: {
          title: 'Profile',
          icon: 'example',
          roles: ['administrator']
        }
      },
      {
        path: 'update/:userId',
        component: () => import('@/views/user/userUpdate'),
        name: 'userUpdate',
        hidden: true,
        meta: {
          title: 'Update',
          icon: 'example',
          roles: ['management']
        }
      }
    ]

  },

  {
    path: '/booking',
    component: Layout,
    redirect: '/booking/index',
    meta: {
      title: 'Booking',
      icon: 'form',
      roles: ['administrator']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/booking/index'),
        name: 'booking',
        meta: { title: 'Booking List' }
      },
      {
        path: 'update/:bookingId',
        component: () => import('@/views/booking/bookingUpdate'),
        name: 'bookingUpdate',
        hidden: true,
        meta: {
          title: 'Update Booking',
          icon: 'example',
          roles: ['management']
        }
      },
      {
        path: 'register',
        component: () => import('@/views/booking/bookingRegister'),
        name: 'bookingRegister',
        hidden: true,
        meta: {
          title: 'New Booking',
          icon: 'form',
          roles: ['administrator']
        }
      }
    ]
  },

  {
    path: '/expertise',
    component: Layout,
    redirect: '/expertise/index',
    meta: {
      title: 'Expertise List',
      icon: 'list',
      roles: ['administrator']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/branch/index'),
        name: 'Expertise'
      }
    ]
  },

  // {
  //   path: '/customer',
  //   component: Layout,
  //   redirect: '/customer/index',
  //   name: 'Customer',
  //   meta: {
  //     title: 'Customer',
  //     icon: 'peoples',
  //     roles: ['management']
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/customer/index'),
  //       name: 'Customer',
  //       meta: {
  //         title: 'Customer List',
  //         icon: 'peoples',
  //         roles: ['management']
  //       }
  //     },
  //     {
  //       path: 'answer/:type/:customerId',
  //       component: () => import('@/views/customer/answer'),
  //       name: 'answer',
  //       hidden: true,
  //       meta: {
  //         title: 'KYC Question',
  //         icon: 'peoples',
  //         roles: ['management']
  //       }
  //     },
  //     {
  //       path: 'one/:id',
  //       component: () => import('@/views/customer/one'),
  //       name: 'CustomerOne',
  //       hidden: true,
  //       meta: {
  //         title: 'CustomerOne',
  //         icon: 'peoples'
  //       }
  //     },
  //     {
  //       path: 'sales/:customerId',
  //       component: () => import('@/views/customer/sales'),
  //       name: 'CustomerSales',
  //       hidden: true,
  //       meta: {
  //         title: 'Customer Sales',
  //         icon: 'example',
  //         roles: ['management']
  //       }
  //     },
  //     {
  //       path: 'credit/:customerId',
  //       component: () => import('@/views/customer/credit'),
  //       name: 'CustomerCredit',
  //       hidden: true,
  //       meta: {
  //         title: 'Customer Credit',
  //         icon: 'example',
  //         roles: ['management']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/branch',
  //   component: Layout,
  //   redirect: '/branch/index',
  //   meta: {
  //     title: 'Branch',
  //     icon: 'list',
  //     roles: ['management']
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/branch/index'),
  //       name: 'Branch'
  //     }
  //   ]
  // },

  // {
  //   path: '/question',
  //   component: Layout,
  //   redirect: '/question/index',
  //   name: 'Question',
  //   meta: {
  //     title: 'Question',
  //     icon: 'form',
  //     roles: ['management']
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/question/index'),
  //       name: 'Question',
  //       meta: {
  //         title: 'Question List',
  //         icon: 'list',
  //         roles: ['management']
  //       }
  //     },
  //     {
  //       path: 'questionView/:questionId',
  //       component: () => import('@/views/question/questionView'),
  //       name: 'questionView',
  //       hidden: true,
  //       meta: {
  //         title: 'View Question',
  //         icon: 'example',
  //         roles: ['management']
  //       }
  //     },
  //     {
  //       path: 'questionCreate',
  //       component: () => import('@/views/question/questionCreate'),
  //       name: 'questionCreate',
  //       hidden: true,
  //       meta: {
  //         title: 'Create Question',
  //         icon: 'edit',
  //         roles: ['management']
  //       }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

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
      meta: { title: 'My Profile', icon: 'user'
      }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRoutes = [

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: {
      title: 'User',
      icon: 'user'
      // roles: ['translator']
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
          icon: 'form'
          // roles: ['']
        }
      },
      {
        path: 'profile/:userId',
        component: () => import('@/views/user/userProfileManagement'),
        name: 'userProfileManagement',
        hidden: true,
        meta: {
          title: 'Profile',
          icon: 'example'
          // roles: ['']
        }
      },
      {
        path: 'update/:userId',
        component: () => import('@/views/user/userUpdate'),
        name: 'userUpdate',
        hidden: true,
        meta: {
          title: 'Update',
          icon: 'example'
          // roles: ['']
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
      icon: 'form'
      // roles: ['']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/booking/index'),
        name: 'bookingList',
        meta: { title: 'Booking List' }
      },
      {
        path: 'update/:bookingId',
        component: () => import('@/views/booking/bookingUpdate'),
        name: 'bookingUpdate',
        hidden: true,
        meta: {
          title: 'Update Booking',
          icon: 'example'
          // roles: ['']
        }
      },
      {
        path: 'register',
        component: () => import('@/views/booking/bookingRegister'),
        name: 'bookingRegister',
        hidden: true,
        meta: {
          title: 'New Booking',
          icon: 'form'
          // roles: ['']
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
      icon: 'list'
      // roles: ['']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/expertise/index'),
        name: 'Expertise'
      },
      {
        path: 'update/:expertiseId',
        component: () => import('@/views/expertise/expertiseUpdate'),
        name: 'expertiseUpdate',
        hidden: true,
        meta: {
          title: 'Update Expertise',
          icon: 'example'
          // roles: ['']
        }
      },
      {
        path: 'register',
        component: () => import('@/views/expertise/expertiseRegister'),
        name: 'expertiseRegister',
        hidden: true,
        meta: {
          title: 'New Expertise',
          icon: 'form'
          // roles: ['']
        }
      }
    ]
  },
  {
    path: '/language',
    component: Layout,
    redirect: '/language/index',
    meta: {
      title: 'Language List',
      icon: 'list'
      // roles: ['']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/language/index'),
        name: 'Language'
      },
      {
        path: 'update/:languageId',
        component: () => import('@/views/language/languageUpdate'),
        name: 'languageUpdate',
        hidden: true,
        meta: {
          title: 'Update Language',
          icon: 'example'
          // roles: ['']
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

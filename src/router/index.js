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

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRoutes = [

  {
    path: '/newsboard',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/newsboard/index'),
        name: 'Newsboard',
        meta: { 
          title: 'Newsboard', 
          icon: 'example',
          roles: ['admin']
        }
      }
    ]
    
  },

  {
    path: '/commission',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/agent/index'),
        name: 'CommissionReport',
        meta: { 
          title: 'Comm. Report', 
          icon: 'example',
          roles: ['agent']
        }
      }
    ]
    
  },

  // {
  //   path: '/customer',
  //   component: Layout,
  //   redirect: '/customer/all',
  //   name: 'Customer',
  //   meta: { 
  //     title: 'User', 
  //     icon: 'example',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'all',
  //       name: 'CustomerAll',
  //       component: () => import('@/views/customer/all'),
  //       meta: { title: 'All User', icon: 'table' }
  //     },
  //     {
  //       path: 'outlet',
  //       name: 'CustomerOutlet',
  //       component: () => import('@/views/customer/outlet'),
  //       meta: { title: 'Outlets', icon: 'table' }
  //     },
  //     {
  //       path: 'agent',
  //       name: 'CustomerAgent',
  //       component: () => import('@/views/customer/agent'),
  //       meta: { title: 'Agents', icon: 'table' }
  //     }
  //   ]
  // },

  // {
  //   path: '/revenue',
  //   component: Layout,
  //   redirect: '/revenue/outlet',
  //   name: 'Revenue',
  //   meta: { 
  //     title: 'Revenue', 
  //     icon: 'example',
  //     roles: ['outlet']
  //   },
  //   children: [
  //     {
  //       path: 'outlet',
  //       name: 'OutletRevenue',
  //       component: () => import('@/views/revenue/outlet'),
  //       meta: { title: 'Outlet', icon: 'table' }
  //     },
  //     {
  //       path: 'branches/:id',
  //       name: 'BranchesRevenue',
  //       hidden: true,
  //       component: () => import('@/views/revenue/branch'),
  //       meta: { title: 'Branches', icon: 'table' }
  //     }
  //   ]
  // },

  // {
  //   path: '/commission',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/agent/index'),
  //       name: 'CommissionReport',
  //       meta: { 
  //         title: 'Comm. Report', 
  //         icon: 'example',
  //         roles: ['agent']
  //       }
  //     }
  //   ]
    
  // },

  // {
  //   path: '/payment',
  //   component: Layout,
  //   redirect: '/payment/overall',
  //   name: 'Customer',
  //   meta: { 
  //     title: 'Payment', 
  //     icon: 'example',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'deposit',
  //       name: 'PaymentDeposit',
  //       component: () => import('@/views/payments/deposit'),
  //       meta: { title: 'Deposit', icon: 'table' }
  //     },
  //     {
  //       path: 'reload',
  //       name: 'PaymentReload',
  //       component: () => import('@/views/payments/reload'),
  //       meta: { title: 'Reload', icon: 'table' }
  //     },
  //     {
  //       path: 'promo',
  //       name: 'PaymentPromo',
  //       component: () => import('@/views/payments/promo'),
  //       meta: { title: 'Promo Used', icon: 'table' }
  //     },
  //     {
  //       path: 'charges',
  //       name: 'PaymentCharges',
  //       component: () => import('@/views/payments/order'),
  //       meta: { title: 'Charges', icon: 'table' }
  //     }
  //   ]
  // },

  // {
  //   path: '/analytics',
  //   component: Layout,
  //   redirect: '/analytics/account',
  //   name: 'Analytic',
  //   meta: { 
  //     title: 'Analytics', 
  //     icon: 'example',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'Account',
  //       name: 'AnalyticAccount',
  //       component: () => import('@/views/analytics/account'),
  //       meta: { title: 'Account', icon: 'example' }
  //     },
  //     {
  //       path: 'Payment',
  //       name: 'AnalyticPayment',
  //       component: () => import('@/views/analytics/payment'),
  //       meta: { title: 'Payment', icon: 'example' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

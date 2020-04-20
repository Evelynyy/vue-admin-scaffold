import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'routerName',
      redirect: '/page-name',
      component: () => import('@/layout'),
      meta: {
        label: '页面名称',
      },
      children: [
        {
          path: '/page-name',
          name: 'routerName',
          component: () => import('@/views/page-name'),
          meta: {
            label: '页面名称',
          },
        },
      ],
    },
    {
      path: '*', // 其余未定义的路由均跳转至404页面
      name: 'error404',
      component: () => import('@/views/error/404'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;

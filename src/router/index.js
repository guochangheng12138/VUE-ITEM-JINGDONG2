import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/home/Home.vue";
// import Login from '../views/login/Login.vue';
// import Register from '../views/register/Register.vue';


const routes = [
  {
    path: "/",
    name: "Home",
    // component: Home,
    // 动态路由
    component: () => import('../views/home/Home'),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/login/Login'),

    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home' }) : next();
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import('../views/register/Register'),

    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home' }) : next();
    }
  },
  {
    path: "/shop/:id",
    name: 'Shop',
    component: () => import('../views/shop/Shop'),
  },
  // 购物车
  {
    path: "/gouwuche",
    name: "Gouwuche",
    component: () => import('../views/gouwuche/Gouwuche'),
  },
  // 个人中心
  {
    path: "/person",
    name: "Person",
    component: () => import('../views/person/Person'),
  },
  // 用户信息
  {
    path: "/usermessage",
    name: "UserMessage",
    component: () => import('../views/person/UserMessage'),
  },
  // 订单
  {
    path: "/orderlist",
    name: "OrderList",
    component: () => import('../views/orderlist/OrderList'),
  },
  // 订单确认
  {
    path: "/orderlistconfirm/:id",
    name: "OrderListConfirm",
    component: () => import('../views/orderlistconfirm/OrderListConfirm'),
  },
  // 地址管理
  {
    path: "/managementaddress",
    name: "ManagementAddress",
    component: () => import('../views/managementaddress/ManagementAddress'),
  },
  // 地址新建
  {
    path: "/buildaddress",
    name: "BuildAddress",
    component: () => import('../views/buildaddress/BuildAddress'),
  },
  // 地址编辑
  {
    path: "/editingaddress/:id",
    name: "EditingAddress",
    component: () => import('../views/editingaddress/EditingAddress'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   console.log(to, from)
//   const { isLogin } = localStorage;
//   (isLogin || to.name === "Login") ? next() : next({ name: 'Login' })
// })
router.beforeEach((to, from, next) => {
  // console.log(to, from);
  const { isLogin } = localStorage;
  const { name } = to;
  const isLoginOrRegister = (name === "Login" || name === 'Register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' })
})

export default router;

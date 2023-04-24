import Router from '@lightningjs/sdk/src/Router'
import { Home } from '../home'
import { Details } from '../details'

const routes = {
  root: 'home',
  routes: [
    {
      path: 'home',
      component: Home,
    },
    {
      path: 'details',
      component: Details,
    },
  ],
} as Router.Config

export default routes

import Router from '@lightningjs/sdk/src/Router'
import { Home } from '../home'
import { Details } from '../details'

const routes = {
  root: 'home',
  routes: [
    {
      path: 'home',
      component: Home,
      widgets: ['VideoWidget' as any],
    },
    {
      path: 'details',
      component: Details,
      widgets: ['VideoWidget' as any],
    },
  ],
} as Router.Config

export default routes

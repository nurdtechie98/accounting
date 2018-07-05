import Vue from 'vue'
import Router from 'vue-router'
import ListAndForm from '@/components/ListAndForm'
import FListAndForm from '@/components/FListAndForm'
import SetupWizard from '@/pages/SetupWizard/SetupWizard'
import POS from '@/components/pos/POS'
import Fpick from '@/components/pos/Fpick'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list/:doctype',
      name: 'List',
      component: ListAndForm,
      props: true
    },
    {
      path: '/edit/:doctype/:name',
      name: 'Form',
      component: ListAndForm,
      props: true
    },
    {
      path: '/Fedit/:doctype/:name',
      name: 'Form',
      component: FListAndForm,
      props: true
    },
    {
      path: '/setup-wizard',
      name: 'SetupWizard',
      components: {
        setup: SetupWizard
      }
    },
    {
      path: '/pos/',
      name: 'POS',
      component: POS,
      props: true
    },
    {
      path: '/fpick/',
      name: 'Fpick',
      component: Fpick,
      props: true
    }
    // {
    //   path: '/table/:doctype',
    //   name: '',
    //   component: ''
    // },
    // {
    //   path: '/print/:doctype/:name',
    //   name: '',
    //   component: ''
    // },
    // {
    //   path: '/new/:doctype',
    //   name: '',
    //   component: ''
    // }
  ]
})

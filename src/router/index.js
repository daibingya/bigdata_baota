import Vue from 'vue'
import Router from 'vue-router'
import Dangjian  from  '@/components/conte/dangjian'
import Zuzhi     from  '@/components/conte/zuzhi'
import Dangyuan  from  '@/components/conte/dangyuan'
import Dangwu    from  '@/components/conte/dangwu'
import Hudong    from  '@/components/conte/hudong'
import Xuexi     from  '@/components/conte/xuexi'
import Fuwu      from  '@/components/conte/fuwu'
import Xiangmu   from  '@/components/conte/xiangmu'
import Tese      from  '@/components/conte/tese'
import Biaozhun  from  '@/components/conte/biaozhun'
import Pingxuan  from  '@/components/conte/pingxuan'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dangjian',
      component:Dangjian
    },
    {
      path: '/dangjian',
      name: 'dangjian',
      component:Dangjian
    },{
      path: '/zuzhi',
      name: 'zuzhi',
      component:Zuzhi
    },{
      path: '/dangyuan',
      name: 'dangyuan',
      component:Dangyuan
    },
    {
      path: '/dangwu',
      name: 'dangwu',
      component:Dangwu
    },
    {
      path: '/hudong',
      name: 'hudong',
      component:Hudong
    },
    {
      path: '/xuexi',
      name: 'xuexi',
      component:Xuexi
    },
    {
      path: '/fuwu',
      name: 'fuwu',
      component:Fuwu
    },
    {
      path: '/xiangmu',
      name: 'xiangmu',
      component:Xiangmu
    },
    {
      path: '/tese',
      name: 'tese',
      component:Tese
    },
    {
      path: '/biaozhun',
      name: 'biaozhun',
      component: Biaozhun
    },
    {
      path: '/pingxuan',
      name: 'pingxuan',
      component: Pingxuan
    }
  ],
  mode: 'hash'
})

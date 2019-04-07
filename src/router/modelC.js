const modelC = [
    {
        path: 'ca',
        name: 'ca',
        meta: {
            name: '模块C-1'
        },
        component: () => import('@/components/modelA/testA.vue')
    }, {
        path: 'cb',
        name: 'cb',
        meta: {
            name: '模块C-2'
        },
        component: () => import('@/components/modelA/testB.vue')
    },
    {
        path: 'cc',
        name: 'cc',
        meta: {
            name: '模块C-3'
        },
        component: () => import('@/components/modelA/testB.vue')
    },
]
export default modelC
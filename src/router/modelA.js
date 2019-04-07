const modelA = [
    {
        path: 'aa',
        name: 'aa',
        meta: {
            name: '模块A-1'
        },
        component: () => import('@/components/modelA/testA.vue')
    }, {
        path: 'ab',
        name: 'ab',
        meta: {
            name: '模块A-2'
        },
        component: () => import('@/components/modelA/testB.vue')
    },
    {
        path: 'ac',
        name: 'ac',
        meta: {
            name: '模块A-3'
        },
        component: () => import('@/components/modelA/testB.vue')
    },
]
export default modelA
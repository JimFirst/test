const modelA = [
    {
        path: 'a',
        name: 'a',
        meta: {
            name: '模块A-1'
        },
        component: () => import('@/components/modelA/testA.vue')
    }, {
        path: 'b',
        name: 'b',
        meta: {
            name: '模块A-2'
        },
        component: () => import('@/components/modelA/testB.vue')
    },
]
export default modelA
const modelB = [
    {
        path: 'c',
        name: 'c',
        meta: {
            name: '模块b-1'
        },
        component: () => import('@/components/modelB/b_1.vue')
    }, {
        path: 'd',
        name: 'd',
        meta: {
            name: '模块b-2'
        },
        component: () => import('@/components/modelB/b_2.vue')
    },
]
export default modelB
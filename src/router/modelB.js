const modelB = [
    {
        path: 'ba',
        name: 'ba',
        meta: {
            name: '模块b-1'
        },
        component: () => import('@/components/modelB/b_1.vue')
    }, {
        path: 'bb',
        name: 'bb',
        meta: {
            name: '模块b-2'
        },
        component: () => import('@/components/modelB/b_2.vue')
    },
]
export default modelB
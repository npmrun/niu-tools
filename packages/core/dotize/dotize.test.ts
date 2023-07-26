import dotize from './index'

describe('sum', () => {
    it('dotize convert json', () => {
        expect(
            dotize.convert({
                status: 'success',
                auth: {
                    code: 123,
                    name: 'qwerty asdfgh',
                },
            })
        ).toEqual({
            status: 'success',
            'auth.code': 123,
            'auth.name': 'qwerty asdfgh',
        })
    })

    it('dotize backward json', () => {
        expect(
            dotize.backward({
                status: 'success',
                'auth.code': 123,
                'auth.name': 'qwerty asdfgh',
            })
        ).toEqual({
            status: 'success',
            auth: {
                code: 123,
                name: 'qwerty asdfgh',
            },
        })
    })
})

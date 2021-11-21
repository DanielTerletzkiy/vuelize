import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: '#A37EFF',
                    secondary: '#424242',
                    success: '#A7FA00',
                    error: '#ff6b6b',
                    warning: '#ffa600',
                    info: '#00b2ff'
                },
                light: {
                    primary: '#3075FF',
                    secondary: '#424242',
                    success: '#62c62f',
                    error: '#ff6b6b',
                    warning: '#ffa600',
                    info: '#00b2ff'
                },
            },
        },
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})

export default store

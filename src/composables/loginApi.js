import { computed, onMounted, reactive } from "vue"
import { useStore } from 'vuex'
import { useRouter } from "vue-router"

export const loginApi = () => {
    const store = useStore()
    const router = useRouter()
    const signUser = reactive({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: null,
    })


    //get role
    const roles = computed(() => {
        return store.state.roles
    })
    onMounted(async () => {
        await store.dispatch('getRoles')
    })

    //gettin user from store
    const user = computed(() => {
        return store.state.user
    })

    //errors
    const signError = computed(() => {
        return store.state.signupError
    })
    const signErr = computed(() => {
        return store.state.signErr
    })
    const loginError = computed(() => {
        return store.state.loginError
    })

    // for signup
    const handleSignup = async () => {
        console.log('handleSignup')
        try {
            await store.dispatch('signup', {
                email: signUser.email,
                password: signUser.password,
                roleId: signUser.roleId,
                firstName: signUser.firstName,
                lastName: signUser.lastName
            })
            if (!signError.value && !signErr.value) {
                router.push('/')
            }
        } catch (error) {
            console.log('error')
        }
    }

    //for login
    const handleLogin = async () => {
        try {
            await store.dispatch('login', {
                email: signUser.email,
                password: signUser.password,
            })
            console.log('logged in')
            if (!loginError.value) {
                router.push('/home')
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    const logout = () => {
        store.commit('setUser', null)
        router.push('/')
    }

    return { signUser, roles, user, logout, handleSignup, signError, handleLogin, signErr, loginError }
}
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

    const signError = computed(() => {
        return store.state.signupError
    })

    // for signup
    const handleSignup = async () => {
        try {
            await store.dispatch('signup', {
                email: signUser.email,
                password: signUser.password,
                roleId: signUser.roleId,
                firstName: signUser.firstName,
                lastName: signUser.lastName
            })
        } catch (error) {
            console.log(error)
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
        } catch (error) {
            console.log(error.message)
        }
    }


    const logout = () => {
        store.commit('setUser', null)
        router.push('/signup')
    }

    return { signUser, roles, user, logout, handleSignup, signError, handleLogin }
}
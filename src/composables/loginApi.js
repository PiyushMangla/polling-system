import { computed, onMounted, reactive, ref } from "vue"
import { useStore } from 'vuex'
import { useRouter } from "vue-router"

export const loginApi = () => {
    const store = useStore()
    const router = useRouter()

    //getting new user datils
    const signUser = reactive({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: null,
    })
    const isLoading = ref(false)
    const isSubmitted = ref(false)

    //get role
    const roles = computed(() => {
        return store.state.roles
    })

    //get user and userToken
    const user = computed(() => {
        return store.state.user
    })
    const userToken = computed(() => {
        return store.state.userToken
    })


    onMounted(async () => {
        await store.dispatch('getRoles')
    })
    onMounted(() => {
        store.commit('setUser')
        store.commit('setToken')
        if (user.value) {
            router.push('/home')
        }
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
        isLoading.value = true
        try {
            await store.dispatch('signup', {
                email: signUser.email,
                password: signUser.password,
                roleId: signUser.roleId,
                firstName: signUser.firstName,
                lastName: signUser.lastName
            })
            if (!signError.value && !signErr.value) {
                isSubmitted.value = true
            }
        } catch (error) {
            console.log('error')
        } finally {
            isLoading.value = false
        }
    }
    const formSubmit = () => {
        isSubmitted.value = false
        router.push('/')
    }

    //for login
    const handleLogin = async () => {
        isLoading.value = true
        try {
            await store.dispatch('login', {
                email: signUser.email,
                password: signUser.password,
            })
            if (!loginError.value) {
                router.push('/home')
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            isLoading.value = false
        }
    }

    //for logout
    const logout = () => {
        localStorage.setItem('user', JSON.stringify(null))
        localStorage.setItem('userToken', JSON.stringify(null))
        router.push('/')
    }

    return {
        user, userToken, signUser, roles, logout, handleSignup, signError,
        handleLogin, signErr, loginError, isLoading, isSubmitted, formSubmit
    }
}
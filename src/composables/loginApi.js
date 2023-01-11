import { ref, computed , onMounted } from "vue"
import { useStore } from 'vuex'
import { v4 } from "uuid"
import { useRouter } from "vue-router"

export const loginApi = () => {
    const userName = ref('')
    const password = ref('')
    const store = useStore()
    const router = useRouter()
    // const error = ref('')

    //get role
    const roles = computed(() => {
        return store.state.role
    })

    //gettin user from store
    const user = computed(() => {
        return store.state.user
    })

    onMounted(async () => {
       await store.dispatch('getRole')
    })

    // for login user
    // const handleLogin = () => {

    // store.dispatch("login")
    //     // try {
    //     //     await store.dispatch("login", {
    //     //         username: userName.value,
    //     //         password: password.value,
    //     //     });
    //     //     // router.push('/home')
    //     // } catch (err) {
    //     //     error.value = err.message
    //     //     console.log(error.value, user)
    //     // }
    // };

    // for signin 
    const handleSignup = () => {
        store.dispatch("signup", {
            username: userName.value,
            password: password.value,
            // role: role.value,
            id: v4()
        })
        router.push('/home')
    }

    const logout = () => {
        store.commit('setUser', null)
        router.push('/signup')
    }

    return { userName, password, roles, handleSignup, user, logout }
}
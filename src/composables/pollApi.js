import { v4 } from 'uuid'
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export const pollApi = () => {
    const store = useStore()
    const polls = computed(() => {
        return store.state.polls
    })
    const poll = computed(() => {
        return store.state.poll
    })
    const router = useRouter()
    const isState = ref(false)
    const newPoll = reactive({
        title: '',
        options: [],
        id: v4()
    })
    let i = 0
    const option = ref('')
    const addError = ref('')

    const countVote = (keyA, keyB) => {
        store.commit('countVote', { keyA, keyB })
    }

    const showAddPoll = () => {
        router.push('/addPoll')
    }

    // adding new poll function
    const addNewPoll = () => {
        //adding option to the list
        if (option.value) {
            newPoll.options[i] = {
                option: option.value,
                vote: 0
            }
        }
        //condition for title and options
        if (newPoll.title) {
            if (newPoll.options.length > 2) {
                polls.value.push(newPoll)
                router.push('/pollList')
                addError.value = ''
            }
            else {
                addError.value = "please add atleast 3 options"
            }
        }
        else {
            addError.value = "Please add a title"
        }
    }
    // keyup function for options input
    const addOptions = (e) => {
        if (e.key === "," && option.value) {
            newPoll.options[i] = {
                option: option.value,
                vote: 0
            }
            option.value = ''
            i++
        }
    }
    //to view single poll
    const showPoll = (key) => {
        store.commit('setPoll', key)
        router.push('/showPoll')
    }

    //to go back to poll list
    const viewPolls = () => {
        router.push('/pollList')
    }

    return { polls, countVote, isState, showAddPoll, addNewPoll, newPoll, addOptions, option, addError, showPoll, poll, viewPolls }
}
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export const pollApi = () => {
    const store = useStore()
    const router = useRouter()

    // //get user and userToken
    // const user = computed(() => {
    //     return store.state.user
    // })
    // const userToken = computed(() => {
    //     return store.state.userToken
    // })
    onMounted(() => {
        store.commit('setUser')
        store.commit('setToken')
    })
    const scrollComponent = ref(null)

    //getting poll list
    const polls = computed(() => {
        return store.state.polls
    })
    //getting single poll
    const poll = computed(() => {
        return store.state.poll
    })
    const isState = ref(false)
    const newPoll = reactive({
        title: '',
        options: []
    })
    const pollPage = computed(() => {
        return store.state.pollPage
    })
    const pollOption = reactive([])
    //to add poll
    let i = 0
    const option = ref('')
    const addError = ref('')

    onMounted(async () => {
        await store.dispatch('getPolls', {
            pollPage: pollPage.value
        })
        console.log(polls.value)
    })
    const handleScroll = async () => {
        let element = scrollComponent.value
        if (element.getBoundingClientRect().bottom < window.innerHeight) {
            store.commit('setpollPage')
            await store.dispatch('getPolls', {
                pollPage: pollPage.value
            })
        }
    }

    const countVote = (keyA, keyB) => {
        store.commit('countVote', { keyA, keyB })
    }

    const showAddPoll = () => {
        router.push('/addPoll')
    }

    // adding new poll function
    const addNewPoll = async () => {
        //condition for title and options
        for (let j = 0; j < newPoll.options.length; j++) {
            pollOption[j] = {
                optionTitle: newPoll.options[j]
            }
        }
        if (newPoll.title.length > 10) {
            if (newPoll.options.length > 2) {
                //api for adding poll
                try {
                    await store.dispatch('addPoll', {
                        title: newPoll.title,
                        options: pollOption
                    })
                } catch (error) {
                    console.log(error)
                }
                router.push('/pollList')
                addError.value = ''
            }
            else {
                addError.value = "please add atleast 3 options"
            }
        }
        else {
            addError.value = "Please add a title with atleast 10 characters"
        }
    }
    // addform function for options input
    const addOptions = () => {
        if (option.value) {
            if (!newPoll.options.includes(option.value)) {
                newPoll.options[i] = option.value
                i++
            }
            option.value = ''
        }
    }
    // to delete option from addForm
    const deleteNewOpt = (key) => {
        newPoll.options = newPoll.options.filter((item) => {
            return key !== item;
        });
        i--
    }
    //to update option from addpoll
    const updateNewOpt = (key) => {
        option.value = key
        newPoll.options = newPoll.options.filter((item) => {
            return key !== item;
        });
        i--
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

    //delete a poll
    const deletePoll = async (key) => {
        try {
            await store.dispatch('deletePoll', {
                pollId: key
            }),
                await store.dispatch('getPolls', {
                    pollPage: pollPage.value
                })
        } catch (error) {
            console.log(error)
        }

    }

    return {
        polls, countVote, isState, showAddPoll, addNewPoll, newPoll, handleScroll, scrollComponent,
        deleteNewOpt, updateNewOpt, addOptions, option, addError, showPoll, poll, viewPolls, deletePoll
    }
}
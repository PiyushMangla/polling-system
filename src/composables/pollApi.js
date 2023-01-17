import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export const pollApi = () => {
    const store = useStore()
    const router = useRouter()

    //getting user
    const user = computed(() => {
        return store.state.user
    })

    //getting poll list
    const polls = computed(() => {
        return store.state.polls
    })

    //getting single poll
    const poll = computed(() => {
        return store.state.poll
    })
    //for adding poll
    const isState = ref(false)
    const newPoll = reactive({
        title: '',
        options: []
    })
    const pollPage = computed(() => {
        return store.state.pollPage
    })
    const pollOption = reactive([])
    let i = 0
    const option = ref('')
    const addError = ref('')

    //for scroll
    const scrollState = computed(() => {
        return store.state.scrollState
    })
    const scrollComponent = ref(null)

    //scroll function
    const handleScroll = async () => {
        if (scrollState.value == true) {
            let element = scrollComponent.value
            if (element.getBoundingClientRect().bottom < window.innerHeight) {
                store.commit('setPollPage')
                await store.dispatch('getPolls', {
                    pollPage: pollPage.value
                })
            }
        }
    }

    const showAddPoll = () => {
        router.push('/addPoll')
        store.state.polls = []
        store.state.pollPage = 1
        store.state.scrollState = true
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
                store.commit('sortPolls')
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
        router.push(`/showPoll/${key}`)
        store.state.polls = []
        store.state.pollPage = 1
        store.state.scrollState = true
    }

    //to go back to poll list
    const viewPolls = () => {
        router.push('/pollList')
        store.state.polls = []
        store.state.pollPage = 1
        store.state.scrollState = true
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

    //update a poll title
    const titleUpdateErr = ref(null)
    const showUpdatePoll = (key) => {
        console.log(user.value)
        router.push(`/updatePoll/${key}`)
        store.state.polls = []
        store.state.pollPage = 1
        store.state.scrollState = true
    }
    const updateTitle = async (keyA, keyB) => {
        if (keyA.length > 10) {
            try {
                await store.dispatch('updatePollTitle', {
                    title: keyA,
                    createdBy: user.value.id,
                    pollId: keyB
                })
            }
            catch (error) {
                console.log(error)
            }
            router.push('/pollList')
            titleUpdateErr.value = ''
            store.state.polls = []
            store.state.pollPage = 1
            store.state.scrollState = true
        } else {
            titleUpdateErr.value = 'Please add a title with more than 10 characters'
        }
    }

    //vote count function
    const countVote = async (keyA) => {
        try {
            await store.dispatch('countVote', { keyA })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        polls, countVote, isState, showAddPoll, addNewPoll, newPoll, handleScroll, scrollComponent, scrollState,
        deleteNewOpt, updateNewOpt, addOptions, option, addError, showPoll, poll, viewPolls, deletePoll, pollPage,
        showUpdatePoll, updateTitle, titleUpdateErr
    }
}
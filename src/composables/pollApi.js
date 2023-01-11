import { v4 } from 'uuid'
import { reactive, ref } from 'vue'

export const pollApi = () => {
    const polls = reactive([
        {
            title: "first Poll",
            options: [{ option: 'opt1', vote: 0 }, { option: 'opt2', vote: 4 }, { option: 'opt3', vote: 5 }, { option: 'opt4', vote: 9 }],
            id: v4()
        },
        {
            title: "second Poll",
            options: [{ option: 'opt1', vote: 7 }, { option: 'opt2', vote: 6 }, { option: 'opt3', vote: 4 }, { option: 'opt4', vote: 2 }],
            id: v4()
        },
        {
            title: "third Poll",
            options: [{ option: 'opt1', vote: 6 }, { option: 'opt2', vote: 2 }, { option: 'opt3', vote: 4 }, { option: 'opt4', vote: 3 }],
            id: v4()
        }
    ])

    const isState = ref(false)


    const countVote = (keyA, keyB) => {
        polls.value[keyB].options[keyA].vote += 1
    }

    return { polls, countVote, isState }
}
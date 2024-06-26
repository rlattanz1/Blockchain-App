import { createGlobalState } from 'react-hooks-global-state'

const { getGlobalState, useGlobalState, setGlobalState } = createGlobalState({
    connectedAccount: '',
    createPoll: null,
    contract: null,
    userPolls: [],
    polls: [],
    poll: null,
    options: [],
    voters: []
})

export {
    getGlobalState,
    useGlobalState,
    setGlobalState
}

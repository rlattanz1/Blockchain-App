import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPoll, getOptions, vote } from '../Blockchain.services'
import { useGlobalState, setGlobalState } from '../store'


const Vote = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [poll] = useGlobalState('poll')
    const [connectedAccount] = useGlobalState('connectedAccount')
    const [options] = useGlobalState('options')
    const [voters] = useGlobalState('voters')

    useEffect(async () => {
        await getPoll(id)
        await getOptions(id)
    }, [])


    const handleVote = (e) => {

    }

    return(
        // HTML view
        <div className='poll-page-container'>
            <div className='poll-title-container'>
                <h1>{poll.name}</h1>
            </div>
            <div className='outer-options-container'>
                <ul className='outer-option-list'>
                    {() => {for (let i = 0; i < options.length; i++) {
                        const option = options[i];
                        return (
                            <div className='inner-options-container'>
                                <ul className='inner-option-list'>
                                    <li>{option.id}</li>
                                    <li>{option.name}</li>
                                    <li>{option.count}</li>
                                    <li>
                                        <button className='submit-vote-button'>Vote</button>
                                    </li>
                                </ul>
                            </div>
                        )}}
                    }
                </ul>
            </div>

        </div>
    );
}

export default Vote;

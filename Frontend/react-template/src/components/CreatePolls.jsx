import { useState } from 'react'
import { createPoll } from '../Blockchain.services'
import { useNavigate } from 'react-router-dom'

const CreatePoll = () => {
  const [name, setName] = useState('')
  const [group, setGroup] = useState([])
  const [options, setOptions] = useState([])
  const [voter, setVoter] = useState([])
  const [option, setOption] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("HITTING THE SUBMIT")

    if (!name || !group.length || options.length < 2) return

    try {
        await createPoll({name, group, options});
    } catch(err) {
        console.log(err)
    }

    navigate('/')
    resetForm()
  }

  const resetForm = () => {
    setName('')
    setGroup([])
    setOptions([])
    setVoter('')
    setOption('')

  }

  const addVoter = () => {
    group.push(voter)
    setGroup(group)
    setVoter('')
  }

  const addOption = () => {
    options.push(option)
    setOptions(options)
    setOption('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center z-50
      justify-center bg-black bg-opacity-50 transform transition-transform
      duration-300`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">

            <div className="flex flex-row justify-between items-center bg-gray-300 rounded-xl mt-5">
                <input
                className="block w-full text-sm
                    text-slate-500 bg-transparent border-0
                    focus:outline-none focus:ring-0"
                type="text"
                name="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                />
            </div>
            <div>
                <div id='voter-form'>
                    <input
                    id='voter-input'
                    className="block w-full text-sm
                        text-slate-500 bg-transparent border-0
                        focus:outline-none focus:ring-0"
                    type="text"
                    name="voter"
                    placeholder="Voting Members Address"
                    onChange={(e) =>  {
                        setVoter(e.target.value)
                    }}
                    value={voter}
                    />
                    <button type='button' onClick={addVoter}>Add Voter</button>
                </div>
            </div>
            <div id='option-form'>
                    <input
                    id='option-input'
                    className="block w-full text-sm
                        text-slate-500 bg-transparent border-0
                        focus:outline-none focus:ring-0"
                    type="text"
                    name="group"
                    placeholder="Options to Vote On"
                    onChange={(e) =>  {
                        setOption(e.target.value)
                    }}
                    value={option}
                    />
                    <button type='button' onClick={addOption}>Add Option</button>
            </div>

          <button type="submit">
            Create Poll
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePoll

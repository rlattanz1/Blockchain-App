import abi from './Polling.json'
// import address from './contractAddress.json'
import { getGlobalState, setGlobalState } from './store'
import { ethers } from 'ethers'

const { ethereum } = window
// const contractAddress = address
const ABI = abi['abi'];

const getEtheriumContract = () => {
    const connectedAccount = getGlobalState('connectedAccount')

    if (connectedAccount) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, ABI, signer)

      return contract
    } else {
      return getGlobalState('contract')
    }
}

const isWallectConnected = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())

      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload()
      })

      window.ethereum.on('accountsChanged', async () => {
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
        // await isWallectConnected()
        window.location.reload()
      })

      if (accounts.length) {
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
      } else {
        alert('Please connect wallet.')
        console.log('No accounts found.')
      }
    } catch (error) {
      reportError(error)
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    } catch (error) {
      reportError(error)
    }
  }

  const createPoll = async ({ _options, _group, _name }) => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const connectedAccount = getGlobalState('connectedAccount')
      const contract = getEtheriumContract()
      await contract.createPoll( _options, _group, _name, {
        from: connectedAccount,
      })
      await getPolls()
    } catch (error) {
      reportError(error)
    }
  }

  const getUserPolls = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const contract = getEtheriumContract()
      const userPolls = await contract.getUserPolls()
      setGlobalState('userPolls', userPolls)
    } catch (error) {
      reportError(error)
    }
  }

  const getPolls = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const contract = getEtheriumContract()
      const polls = await contract.getPolls()
      setGlobalState('polls', polls)
    } catch (error) {
      reportError(error)
    }
  }

  const getPoll = async (_pollId) => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const contract = getEtheriumContract()
      const poll = await contract.getPoll(_pollId)
      setGlobalState('poll', structuredPolls([poll])[0])
    } catch (error) {
      reportError(error)
    }
  }

  const vote = async (_pollId, _optionId) => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const connectedAccount = getGlobalState('connectedAccount')
      const contract = getEtheriumContract()
      await contract.vote(_pollId, _optionId, { from: connectedAccount })
      await getPoll(_pollId)
      await getOptions(_pollId)
    } catch (error) {
      reportError(error)
    }
  }

  const getOptions = async (_pollId) => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const contract = getEtheriumContract()
      const options = await contract.getOptions(_pollId)
      setGlobalState('options', options)
    } catch (error) {
      reportError(error)
    }
  }

  const reportError = (error) => {
    console.log(error.message)
    throw new Error('No ethereum object.')
  }

  export {
    isWallectConnected,
    connectWallet,
    createPoll,
    getUserPolls,
    getPolls,
    getPoll,
    getOptions,
    vote,
  }

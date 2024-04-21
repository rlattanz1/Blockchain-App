import Polls from '../components/All_Polls'
import { useGlobalState } from '../store'
import { Link } from 'react-router-dom'

const Home = () => {
  const [polls] = useGlobalState('polls')

  return (
    <div>
        <Link to="/" className="font-bold text-2xl">NEW POLL</Link>
        <Polls polls={polls.filter((poll) => !poll.deleted)} />
    </div>
  )
}

export default Home

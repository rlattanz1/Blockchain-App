import Polls from '../components/All_Polls'
import { useGlobalState } from '../store'

const Home = () => {
  const [polls] = useGlobalState('polls')

  return (
    <div>
      <Polls polls={polls.filter((poll) => !poll.deleted)} />
    </div>
  )
}

export default Home

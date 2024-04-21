import { useNavigate } from 'react-router-dom'

const Polls = ({ polls }) => {


  return (
    <div className="pt-10">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4 gap-6 md:gap-4 lg:gap-4 xl:gap-3 py-2.5 w-4/5
        mx-auto"
      >
        {polls.map((poll, i) =>
          poll ? null : <Poll key={i} poll={poll} />,
        )}
      </div>
    </div>
  )
}

const Poll = ({ poll }) => {
  const navigate = useNavigate()
  let images = ["https://i.pinimg.com/originals/3e/52/a5/3e52a516d0df500d2d4565442627f92b.gif", "https://media4.giphy.com/media/f8qLWDDf1kGSzQh8tN/200w.gif?cid=6c09b9525sgf3wlk9l6ah0t80hkyrvbouni1lr3g2trgaqqr&ep=v1_gifs_search&rid=200w.gif&ct=g", "https://cdn.pixabay.com/animation/2024/03/04/18/38/18-38-28-378_512.gif", "https://media4.giphy.com/media/3o6ozAxsUHHV2Kmy7m/200w.gif?cid=6c09b9522ochnw9t09z40by6noxrj91bgwmv71llkn50kwkw&ep=v1_gifs_search&rid=200w.gif&ct=g", "https://media3.giphy.com/media/RLc50h3HuS2JmYDQQt/giphy.gif?cid=6c09b952ulnq78hu4dral2p76d4wwfk9gmqu53qykqu5m18m&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"]

  let image = images[Math.floor(Math.random()*images.length)];

  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <h5 className="text-gray-900 text-xl font-medium">{poll.name}</h5>
        <img src={image} alt={poll.name} className="w-full h-48 object-cover" />
          <button
            type="button"
            className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800
          active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => navigate('/polls/' + poll.id)}
          >
            Weigh In!
          </button>
      </div>
    </div>
  )
}

export default Polls

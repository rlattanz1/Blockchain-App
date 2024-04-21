import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { getPolls, isWallectConnected } from './Blockchain.services';
import Header from './components/Header';
import Home from './components/Home';
import Vote from './components/Vote/vote_form';
import './App.css';


// homepage I think

  // Home route with the getpolls
  // Vote route with getting a single poll by id
  // UserPolls route the at gets user polls created by that user
  // CreatePolls route to the form to create a new poll

  const App = () => {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
      isWallectConnected()
      getPolls()
      setLoaded(true)
      console.log('Blockchain loaded')
    }, [])

    // Home route with the getpolls
    // Vote route with getting a single poll by id
    // UserPolls route the at gets user polls created by that user
    // CreatePolls route to the form to create a new poll

    return (
      <div className="App">
        <Header />
        {loaded ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/polls/:id" element={<Vote />} />
              {/* <Route path="/userPolls/:address" element={<UserPolls />} /> */}
              {/* <Route path="/polls/:id/createPoll" element={<CreatePolls />} /> */}
            </Routes>
        ) : null}
        {/* <Footer /> */}
      </div>
    );
  }

export default App;

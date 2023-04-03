import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'
import BountyData from './components/bountyData'
import BountyForm from './components/BountyForm'

function App() {
  const [bounties, setBounties] = useState([]) 
  
  useEffect(() => {
    axios.get("/api/bounties")
      .then(res => setBounties(res.data))
      .catch(err => console.log(err))
  }, [])

  const addBounty = (newBounty) => {
    axios.post("/api/bounties", newBounty)
    .then(res => setBounties(prevBounty => [...prevBounty, res.data]))
    .catch(err => console.log(err))
  }

  const deleteBounty = (bountyId) => {
    axios.delete(`/api/bounties/${bountyId}`)
    .then(res => setBounties(prevBounty => prevBounty.filter(bounty => bounty._id !== bountyId)))
    .catch(err => console.log(err))
  }

  const updateBounty = (updates, bountyId) => {
    axios.put(`/api/bounties/${bountyId}`, updates)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const bountyList = bounties.map(bounty =>
    <BountyData 
      {...bounty}
      key={bounty._id}
      deleteBounty={deleteBounty}
      updateBounty={updateBounty}
      />)

  return (
    <>
    <BountyForm
      submit={addBounty}
      buttonText="add bounty"/>
    <div className="bounty-list">
    {bountyList}
    </div>
    </>
  )
}

export default App




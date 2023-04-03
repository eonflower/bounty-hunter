import React, {useState} from 'react'

import BountyForm from './BountyForm'

export default function BountyData(props) {
    const [showForm, setShowForm] = useState(false)
    const toggleShowForm = () => setShowForm((prevState) => !prevState);



        return (
            <div className='bounty'>
        { !showForm ? 
        <>
        <h3 className='living'>Wanted: {props.living === "" ? "Dead or Alive" : props.living}</h3>
        <h1 className='name'>{props.firstName} {props.lastName}</h1>
        <h2 className='sith'>{props.type}</h2>
        <h3>Bounty: ${props.bountyAmount}</h3>
        <button className='edit-button' onClick={() => toggleShowForm()}>edit</button>
        <button className='delete-button' onClick={() => props.deleteBounty(props._id)}>delete</button>
        </>
        :
        <>
    <BountyForm
        firstName={props.firstName}
        lastName={props.lastName}
        // _id={_id}
        type={props.type}
        living={props.living}
        bountyAmount={props.bountyAmount}
        submit={props.updateBounty}
        buttonText="submit changes"/>
    </>}
    </div>
    )
}

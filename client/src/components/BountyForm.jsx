import React, { useState } from 'react'

export default function BountyForm(props) {
    const initial = {
        firstName: props.firstName || "", 
        lastName: props.lastName || "", 
        bountyAmount: props.bountyAmount || 0,
        type: "",
        living: ""}
    const [option, setOption] = useState("");
    const [inputs, setInputs] = useState(initial);
    const [checked, setChecked] = useState(false);
    
    const typeChange = e => {
        const type = e.target.value;
        setInputs(prevInput => ({...prevInput, type}));
        setOption(type);
        };
        
    const livingChange = e => {
        const living = e.target.value === "true";
        setInputs(prevInput => ({...prevInput, living}));
        setChecked(living);
        };

    const handleChange = e => {
        const {name, value} = e.target;
        setInputs(prevInput => ({...prevInput, [name]: value}));
        };
    
    const handleSubmit = e => {
        e.preventDefault();
        props.submit(inputs, props._id);
        setInputs(initial);
        setOption("");
        setChecked(false);
        };

    return (
        <form className='form' onSubmit={handleSubmit}>
        <span className='form-first-name'>
        <label>
        First Name:
        <br />
        <input 
            required
            type="text"
            name="firstName"
            onChange={handleChange}
            value={inputs.firstName}/>
            </label>
        </span>
        <span className='form-last-name'>
        <label>
        Last Name:
        <br />
        <input 
            required
            type="text"
            name="lastName"
            onChange={handleChange}
            value={inputs.lastName}/>
            </label>
        </span>
        <span className='bounty-amount-span'>
        <label>
        Bounty Amount:
        <br />
        <input 
            required
            type="number"
            name="bountyAmount"
            onChange={handleChange}
            value={inputs.bountyAmount}/>
            </label>
        </span>
        <span className='type-span'>
        <label>
        Are They a Sith or Jedi?
        <input 
            required
            type="text"
            name="type"
            onChange={handleChange}
            value={inputs.type}/>
        </label>
        </span>
        <span className='living-span'>
        <label>
        Wanted Dead or Alive?
        <input 
            required
            type="text"
            name="living"
            onChange={handleChange}
            value={inputs.living}/>
            </label>
        </span>
        <button className='bounty-button'>{props.buttonText}</button>
    </form>
    )
}

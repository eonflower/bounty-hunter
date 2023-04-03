const express = require('express')
// const {v4: uuidv4} = require("uuid")
const bountyRouter = express.Router()
const Bounty = require("../models/bounty.js");

// const bounties = [
//     {
//     firstName: "Duke", 
//     lastName: "Wellington", 
//     living: true, 
//     bountyAmount: 300, 
//     type: "sith", 
//     _id: uuidv4()
// }, {
//     firstName: "Kermie", 
//     lastName: "Marbles", 
//     living: true, 
//     bountyAmount: 900, 
//     type: "sith", 
//     _id: uuidv4()
// }, {
//     firstName: "Luna", 
//     lastName: "Tippins", 
//     living: false, 
//     bountyAmount: 100, 
//     type: "jedi", 
//     _id: uuidv4()
// }
// ]


bountyRouter.get("/", async (req, res, next) => {
    try {
        const bounties = await Bounty.find();
        return res.status(200).send(bounties);
    } catch (err) {
        res.status(500);
        return next(err);
    }
})

// bountyRouter.post("/", (req, res) => {
//     const newBounty = req.body
//     newBounty._id = uuidv4()
//     bounties.push(newBounty)
//     res.send(newBounty)
// })

// bountyRouter.put("/:bountyId", (req, res) => {
//     const bountyId = req.params.bountyId
//     const bountyIndex = bounties.findIndex(bounty => bounty._id === bountyId)
//     const updatedBounty = Object.assign(bounties[bountyIndex], req.body)
//     res.send(updatedBounty)
// })

bountyRouter.post("/", (req, res, next) => {
    const newBounty = new Bounty(req.body);
    newBounty
    .save()
    .then((savedBounty) => {
    return res.status(201).send(savedBounty);
    })
    .catch((err) => {
    res.status(500);
    return next(err);
    });
});


bountyRouter.get("/:bountyId", (req, res, next) => {
    Bounty.findById(req.params.bountyId)
    .then((bounty) => {
    if (!bounty) {
        return res.status(404).send("Bounty not found");
    }
    return res.status(200).send(bounty);
    })
    .catch((err) => {
    res.status(500);
    return next(err);
    });
});

// bountyRouter.delete("/:bountyId", (req, res) => {
//     const bountyId = req.params.bountyId
//     const bountyIndex = bounties.findIndex(bounty => bounty._id === bountyId)
//     bounties.splice(bountyIndex, 1)
//     res.send("this bounty has been yeeted")
// })




bountyRouter.get("/search/Type", async (req, res, next) => {
    const query = req.query.Type;
    try {
        const result = await Bounty.find({ Type: query });
        res.send(result);
    } catch (err) {
        res.status(500);
        return next(err);
    }
});


bountyRouter.get("/search/firstName", async (req, res, next) => {
    const query = Bounty.find({ firstName: { $eq: req.query.firstName } });
    let filter = query.getFilter();
    try {
        const result = await Bounty.find(filter);
        return res.send(result);
    } catch (err) {
        res.status(500);
        return next(err);
    }
});


bountyRouter.get("/search/BountyAmount", async (req, res, next) => {
    const query = Bounty.find({ BountyAmount: { $eq: req.query.BountyAmount } });
    let filter = query.getFilter();
    try {
        const result = await Bounty.find(filter);
        return res.send(result);
    } catch (err) {
        res.status(500);
        return next(err);
    }
});


bountyRouter.get("/search/living", async (req, res, next) => {
    try {
        const result = await Bounty.find({ living: req.query.living });
        res.send(result);
    } catch (err) {
        res.status(500);
        return next(err);
    }
});


bountyRouter.get("/search/lastName", async (req, res, next) => {
    try {
        const result = await Bounty.find({ lastName: req.query.lastName });
        res.send(result);
    } catch (err) {
        res.status(500);
        return next(err);
    }
});


bountyRouter.delete("/:bountyId", (req, res, next) => {
    Bounty.findOneAndDelete({ _id: req.params.bountyId })
    .then((deletedItem) => {
        if (!deletedItem) {
        return res
            .status(404)
            .send(`Bounty with ID ${req.params.bountyId} not found`);
        }
        return res
        .status(200)
        .send(
            `Successfully deleted ${deletedItem.firstName} from the database`
        );
    })
    .catch((err) => {
        res.status(500);
        return next(err);
    });
});


bountyRouter.put("/:bountyId", (req, res, next) => {
    Bounty.findOneAndUpdate({ _id: req.params.bountyId }, req.body, { new: true })
    .then((updatedBounty) => {
        if (!updatedBounty) {
        return res
            .status(404)
            .send(`Bounty with ID ${req.params.bountyId} not found`);
        }
        return res.status(201).send(updatedBounty);
    })
    .catch((err) => {
        res.status(500);
        return next(err);
    });
});




module.exports = bountyRouter
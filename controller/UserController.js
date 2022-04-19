const userModel = require('../model/User')

const getAllData = (req, res)=>{
    userModel.aggregate([
        {$unwind: "$score"},
        {$group: {_id: "$_id", name: {$addToSet:"$name"}, score:{$addToSet: "$score"}}},
        {$sort: {'score': -1}},
    ]).limit(20)
    .then(user =>{
        res.status(200).json(user)

    })
    .catch(err=>{
        res.status(200).json(err)
    })
}
const getSingleData = (req, res)=>{
    userModel.findById(req.params.id)
    .then(user =>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.status(200).json(err)
    })
}
const updateInfo = (req, res)=>{
    userModel.findByIdAndUpdate(req.params.id, {$set: req.body })
    .then(user=>{
        res.status(200).json("User Info has been updated successfully")
    })
    .catch(err=>{
        res.status(200).json(err)
    })
}
const pushScore = (req, res)=>{
    userModel.updateOne({_id: req.params.id}, {$push: {score: req.body.sc}})
    .then(user=>{
        console.log('kojj' ,req.body.sc);
        req.status(200).jspn("iinserted")
    })
    .catch(err=>{
        res.status(200).json(err)
    })
}

module.exports = {getAllData, pushScore, getSingleData, updateInfo}
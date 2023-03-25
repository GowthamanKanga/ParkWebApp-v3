const express = require('express')
const route = express.Router()
const park = require('../models/park');
const { verifytoken } = require('./func');

route.post('/parks', /*verifytoken,*/ async(req, res) => {
    const newPark = req.body;
    if(JSON.stringify(newPark) == null || JSON.stringify(newPark) == '{}') {
        return res.status(400).send({
            message: "Park's content can not be empty"
        });
    }
    else {

    try {
        const prk = new park(newPark)
        await prk.save()
        res.status(201).send(occasion)
    }
    catch(error) {
        res.status(500).send(error)
    }
}
});


route.get('/parks', /*verifytoken,*/async(req, res) => {

    try {
        const parks = await park.find({})
        res.status(200).send(parks)
    }
    catch(error) {
        res.status(500).send(error)
    }
});
route.get('/parks/search', /*verifytoken,*/ async(req, res) => {
    let keyword = req.query.name

    if(JSON.stringify(keyword) == null || JSON.stringify(keyword) == '{}') {
        return res.status(400).send({
            message: "Facility keyword can not be empty"
        });
    }
    else {
    try {
        const parks = await park.find({
            $or: [
                {parkName: {$regex: keyword, $options: 'i'}},
                {parkName: {$regex: '^' + keyword, $options: 'i'}},
                {parkName: {$regex: keyword + '$', $options: 'i'}},
                {parkName: {$regex: ' ' + keyword + ' ', $options: 'i'}},
                {parkName: {$regex: '^' + keyword + ' ', $options: 'i'}},
                {parkName: {$regex: ' ' + keyword + '$', $options: 'i'}}
              ]
          });
        res.status(200).send(parks)
    }
    catch(error) {
        res.status(500).send(error)
    }
}
});


route.get('/parks/:id', /*verifytoken,*/ async(req, res) => {

    let id = req.params.id
    if(JSON.stringify(id) == null || JSON.stringify(id) == '{}') {
        return res.status(400).send({
            message: "Parks's content can not be empty"
        });
    }
    else {
    
    try {
        const item = await park.findById(id)
        res.status(200).send(item)
    }
    catch(error) {
        res.status(500).send(error)
    }
}
});


route.patch('/parks/:id', /*verifytoken,*/ async(req, res) => {

    let id = req.params.id
    if(JSON.stringify(id) == null || JSON.stringify(id) == '{}') {
        return res.status(400).send({
            message: "Parks's content can not be empty"
        });
    }
    else {
    try {
        console.log(req.body)
        const updatedPark = await park.findByIdAndUpdate(id, req.body)
    
        await updatedPark.save()
        res.status(202).send(updatedPark)
      } catch (err) {
        res.status(500).send(err)
      }
    }
});


route.delete('/parks/:id', /*verifytoken,*/ async (req, res) => {
    // Validate request
    let id = req.params.id
    if(JSON.stringify(id) == null || JSON.stringify(id) == '{}') {
        return res.status(400).send({
            message: "Park's content can not be empty"
        });
    }

    else {
    try {
        const pk = await park.findByIdAndDelete(id)
    
        if (!pk) { 
            res.status(404).send("No item found")
        }
        res.status(204).send(pk)
      } catch (err) {
        res.status(500).send(err)
      }
    }
});
module.exports = route
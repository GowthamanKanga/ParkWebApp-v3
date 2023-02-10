// importing router from express for api
const router = require('express').Router()
// importing model
let Client = require('../models/clientModels')



// view clients 
router.route('/').get((req,res)=>{
    Client.find()
    .then(clients => res.status(200).json(clients))
    .catch(err => res.status(400).json('Error: ' + err))
})



router.route('/add').post((req,res)=>{
 const client = req.body
  const newClient= new  Admin({
    user : client
  })

newClient.save()
  .then(() => res.json('Client added!'))
  .catch(error => 
   { const errors = handleErrors(error);
    res.status(500).json({errors})});
});
   

router.route('/:id').get( (req,res)=>{

const id = req.params.id
 
Client.findById(id)
.then(client=> res.status(200).send(client))
.catch(() =>{  res.status(500).send({message: "Can not find Admin with given id."})})

})

// delete Client

router.route('/:id').delete( (req,res)=>{

    const id = req.params.id
     
    Client.findByIdAndDelete(id)
    .then(()=> res.status(200).json("Client deleted"))
    .catch(error =>{  res.status(500).send({message: "Can not find client with given id."})})
    
    })
// update admin with id

router.route("/update/:id").patch((req,res)=>{

    const id = req.params.eid
    const newClient = req.body

    Client.findById(id)
    .then(client =>{
        client = newClient
        client.save()
        .then(() => res.json('client updated!'))
        .catch(error => 
         { const errors = handleErrors(error);
          res.status(500).json({errors})});
      })
     .catch((error) =>  res.status(500).send({message: "Can not find Client with given id."}));
})






/// all methods needed for admin
const handleErrors = (err) => {
    // screating json error for all the fields 
  
      let errors = { first_name: '', last_name: '' ,email: '', gender: '' };
    
  // catching the unique error msg for emails
      if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
      }
  
    else if (err.message.includes('Admin validation failed')) {
      // looking for errors genereated from validation script 
  
      Object.values(err.errors).forEach(({ properties }) => {
        
        errors[properties.path] = properties.message;
       
      });
  
       } 
       else{
          // for any other errors we run into 
          errors={message:"Error while instering New Admin"}
       }
    return errors;
    
  }
  module.exports = router;

// importing router from express for api
const router = require('express').Router()
// importing model
let Admin = require('../models/adminModels')



// view admin 
router.route('/').get((req,res)=>{
    Admin.find()
    .then(admins => res.status(200).json(admins))
    .catch(err => res.status(400).json('Error: ' + err))
})


router.route('/add').post((req,res)=>{
 const adm = req.body
  const newAdmin= new  Admin({
    user : adm
  })

newAdmin.save()
  .then(() => res.json('admin added!'))
  .catch(error => 
   { const errors = handleErrors(error);
    res.status(500).json({errors})});
});
   

router.route('/:id').get( (req,res)=>{

const id = req.params.id
 
Admin.findById(id)
.then(admin=> res.status(200).send(admin))
.catch(() =>{  res.status(500).send({message: "Can not find Admin with given id."})})

})

// delete admin

router.route('/:id').delete( (req,res)=>{

    const id = req.params.id
     
    Admin.findByIdAndDelete(id)
    .then(()=> res.status(200).json("Admin deleted"))
    .catch(error =>{  res.status(500).send({message: "Can not find Admin with given id."})})
    
    })
// update admin with id

router.route("/update/:id").patch((req,res)=>{

    const id = req.params.eid
    const newAdmin = req.body

    EmployeeModel.findById(id)
    .then(admin =>{
        admin = newAdmin
        admin.save()
        .then(() => res.json('Admin updated!'))
        .catch(error => 
         { const errors = handleErrors(error);
          res.status(500).json({errors})});
      })
     .catch((error) =>  res.status(500).send({message: "Can not find Admin with given id."}));
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
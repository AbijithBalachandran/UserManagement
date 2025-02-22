const User = require('../models/user');
const bcrypt = require('bcrypt');
const config =require('../config/config');
//const { response } = require('../routes/adminRoute');

//-----------------------------------------------------------------------------


//-------------------Admin login load------------------------//
const loadLogin =async(req,res)=>{
      try {

      res.render('login')
            
      } catch (error) {
            throw error;
      }
}


//-------------verifying And rendering admin

const verifyLogin = async(req,res)=>{
      try {
            
          const email = req.body.email;
          const password =req.body.password;

       const userData = await  User.findOne({email:email});

        if(userData){
          
       const   passwordMatch  = await bcrypt.compare(password, userData.password);

       if(passwordMatch){
            
            if(userData.is_admin === 0){

                 res.render('login',{message:"Email and Password is incorrect "});

            }else{
                req.session.user_id =userData._id;
                res.redirect("/admin/home");
            }
             

       }else{
         
            res.render('login',{message:"Email and Password is incorrect"})

       }

        }else{
            res.render('login',{message:"Email and Password is incorrect"});
        }

      } catch (error) {
           throw error; 
      }
}

//    load to dashboard--------------
      const loadDashboard = async(req,res)=>{

            try {
             const userData =  await   User.findById({_id:req.session.user_id});

                res.render('home',{admin:userData})  
            } catch (error) {
                 throw error; 
            }
      }

      // logout ---------

      const logout = async(req,res)=>{
            try {
                
                req.session.destroy();
                res.redirect('/admin');  

            } catch (error) {
                throw error;  
            }
      }


  //-----------Dashboard rendering------------

          const adminDashboard = async(req,res)=>{
            try {
               const userData = await User.find({is_admin:0})
                  res.render('dashboard',{users:userData});

                  
            } catch (error) {
                  throw error ;
            }
          }

//--------password hashing-----------

const securePassword = async (password)=>{
      try { 
      const passwordHash =await bcrypt.hash(password , 10);
      return passwordHash;

      } catch (error) {
         throw error;   
      }
}




//Add New User rendering---------

 const newUserLoad = async(req,res)=>{
      try {
            
            res.render('new-user');

      } catch (error) {
            throw error;
      }
 }

const addUser = async (req,res)=>{
      try {

        const name =req.body.name;
        const email = req.body.email;
        const number =req.body.number;   
        const password = req.body.password;

       const spassword = await securePassword(password)


      const user =  new User({
             name:name,
             email:email,
             mobile:number,
             password:spassword,
             is_admin:0
        });

        const userData = await user.save();

        if (userData) {
            
            res.redirect('/admin/dashboard')

        }else{
            
         res.render('new-user',{message:'Something Wrong.'});

        }

      } catch (error) {
            throw error;
      }
}


//-----------------  Edit User routing------------------------

  const editUserLoad = async(req,res)=>{
      try {
          const id = req.query.id

          const userData = await  User.findById({_id:id});

            if(userData){
                  res.render('edit-user',{user:userData});
            }else{
                 res.redirect('/admin/dashboard'); 
            }

      } catch (error) {
            throw error;
      }
  }


  //------------------posting the updates----------------

const updateUsers = async(req,res)=>{
      
      try {
            
        await  User.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.number}});

           res.redirect('/admin/dashboard')

      } catch (error) {
            throw error;
      }

}

//---------deleting user---------------------


const deleteUser = async(req,res)=>{

      try {
            const id = req.query.id;
           await User.deleteOne({ _id:id });
            res.redirect('/admin/dashboard')
      } catch (error) {
            throw error;
      }

}


//--------------searching users---------------

const searchUsers = async(req,res)=>{

         try {

            let users ={};

            if (req.query.search) {
                    users   = await  User.find({
                     $or:[{name:{$regex:req.query.search,$options:'i'}},
                           {email:{$regex:req.query.search,$options:'i'}},
                          {number:{$regex:req.query.search,$options:'i'}}   ]});

            }else{
                users = await User.find();  
            }
            res.render('dashboard',{users});
            
         } catch (error) {
            console.log(error.message);
            res.render('error')
         }

}

    



module.exports={
      loadLogin,
      verifyLogin,
      loadDashboard,
      logout,
      adminDashboard,
      newUserLoad,
      addUser,
      editUserLoad,
      updateUsers,
      deleteUser,
      searchUsers

  

}

const User = require('../models/user')
const bcrypt = require('bcrypt');


//-------------------------------------------------------------------------------------------------------------------------------//


// ----------- password hashing for security reason ----------------//
const securePassword = async (password)=>{
      try { 
      const passwordHash =await bcrypt.hash(password , 10);
      return passwordHash;

      } catch (error) {
         throw error;   
      }
}

//------for rendered signin page ------------------//
const loadSignin = async(req,res)=>{
      try {
           res.render('signin'); 
      } catch (error) {
         throw error;   
      }
} 

//--------------inserting the signning user-----------------//
const insertUser =async(req,res)=>{

      try {
        const spassword =await securePassword(req.body.password);    
       const user = new  User({
             name:req.body.name,
             email:req.body.email,
             password:spassword,
             mobile:req.body.number,
             is_admin:0,
         })   
        
         const userData = await user.save();

             if(userData){
                 
                  res.render('login');
             }else{
                 res.redirect('signin',{message:"Register failed"}); 

             }
      } catch (error) {
           throw error
           
      }
}

//-----------------for rendering login page--------------------------//

      const loginLoad = async (req,res)=>{
            try {
                res.render('login');  
            } catch (error) {
                throw error;  
            }
      }  

 //-------------------verifying login page user------------------//
      const verifyLogin = async(req,res)=>{
           
            try {
                  const name =req.body.name;
                  const password = req.body.password;

                  const userData = await User .findOne({name:name});

                  if (userData) {
              const passwordMatch = await  bcrypt.compare(password,userData.password);  
               if(passwordMatch){
                  req.session.user_id = userData._id;
                  res.redirect('home');
                  
             }else{
                   res.render('login',{message:"Invalide User Name And Password"}) 
                  }
            }else{
                  res.render('login',{message:"Invalide User Name And Password"})
            }
            } catch (error) {
                  throw error;
            }

      }
      
      
//---------------for rendering home page------------//
 const loadHome = async (req,res)=>{
      try {

   const userData =  await User.findById({_id:req.session.user_id});

       res.render('home',{ user:userData });     

      } catch (error) {
            throw error;
      }
 }

//-------------user Logout...(destroy session)---------------//

     const userLogout = async(req,res)=>{
       
          try {
            
            req.session.destroy();
            res.render('login',{logout:'LogOut Successfuly'});

          } catch (error) {
            throw error;
          }

     }  

//-----------user profile Edit update for user-----------------//

          
        const editProfile = async(req,res)=>{
            try {
              
              const id=  req.query.id
          
              const userData = await User.findById({_id:id})
               
              if (userData) {
                  // console.log(userData);
                
                res.render('edit',{user:userData})
          
              }else{
                res.redirect('/home')
              }
          
            } catch (error) {
              throw error
            
              
            }
          }
          
      
          
          const updateProfile = async (req, res) => {
            try {
              const { user_id, name, email, mobile } = req.body;
          
             
              const userData = await User.findByIdAndUpdate(user_id, { name, email, mobile }, { new: true }); 
          
              if (!userData) {
                return res.status(404).json({ error: "User not found" });
              }
          
            else{
                res.redirect('/home')
            }
              
            } catch (error) {
             
              console.error("Error updating profile:", error);
             
            //   res.render('errorU',{error:error})
            }
          };

          
//-----------exporting midlwares-------///

module.exports ={
      loadSignin,
      insertUser,
      loginLoad,
      verifyLogin,
      loadHome,
      userLogout,
      editProfile,
      updateProfile,
 
}
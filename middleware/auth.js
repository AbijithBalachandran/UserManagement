const isLogin = async(req,res,next)=>{
      try {

          if(!req.session.user_id){

            return  res.redirect('/');

          }else{
            next();
          }
      } catch (error) {
            throw error;
      }
}

const isLogout = async(req,res,next)=>{
      try {

         if (req.session.user_id) {
           return res.redirect('/home');
         }else{
            next(); 
         }
      } catch (error) {
            throw error;
      }
}

module.exports={
      isLogin,
      isLogout
}
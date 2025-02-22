const isLogin  = async(req,res,next)=>{
      try {
            if(req.session.user_id){
                  next();
            }else{
                res.redirect('/admin/login'); 
                return; 
            }
    
      } catch (error) {
            throw error;
      }
}
 
 const isLogout = async(req,res,next)=>{
       try {
            if(req.session.user_id){
             res.redirect('/admin/home');
            return;
            }else{
              next(); 
            }
            
            
       } catch (error) {
            throw error ;
       }
 }
 
 module.exports = {
      isLogin,
      isLogout
 }
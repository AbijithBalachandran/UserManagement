const User = require('../models/user')
exports.isAdmin = async(req,res,next)=>{
      try {
            if(req.session.user_id){
                  const currentUser = await User.findById({
                        _id:req.session.user_id
                  });

                  if(currentUser.is_admin){
                        return res.redirect('/admin/home');
                  }
            }
            next();
      } catch (error) {
            console.log(error)
      }
}
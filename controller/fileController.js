const Users = require("../models/userModel");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const fs = require('fs');

exports.upload = catchAsync(async(req,res)=>{

  if (!req.files){
    return  res.json({
      success: false,
      message: "Upload failed",
    });
    }


    const user = await Users.findOneAndUpdate(
      { email: req.user.email },
      { $push: { file:  req.files.map(item => item.filename)} },
    );
    console.log(user);
   
    
 
    res.status(200).json({
      success: true,
      message: "Upload successful",
    });
})


exports.history = catchAsync(async(req,res)=>{
  const user = await Users.findOne({email: req.user.email})
  const result = user.file.map(item => item=process.env.URL + item)
  res.status(200).json({
    success: true,
    files: result
  })

})

exports.delete = catchAsync(async(req,res)=>{

  // const user = await Users.findOneAndUpdate(
  //   { email: req.user.email },
  //   { $pull: { file:  req.params.filename} },
  // );

  const user = await Users.findOne({email:req.user.email })

  if(!user.file.includes(req.params.filename)){
   throw new ApiError(401,"you can't delete files you don't own")
  }
   await Users.updateOne(
    { email: req.user.email },
    { $pull: { file:  req.params.filename} },
  );
  const filePath = './public/'+ req.params.filename; 

fs.unlink(filePath, (err) => {
  if (err) {
    console.error('Đã xảy ra lỗi khi xóa file:', err);
    return;
  }
  console.log('File đã được xóa thành công.');
});
    res.status(200).json({
      success: true,
      user

    })
})
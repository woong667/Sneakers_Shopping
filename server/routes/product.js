const express = require('express');
const router = express.Router();   //require로 보내면 여기서 이렇게 router 로 받나.?
const multer=require('multer');
const {Product}=require('../models/Product');



//=================================
//             Product  -multer을 사용해야 한다.
//=================================


var storage = multer.diskStorage({        //구글에 multer사용법을 찾아보면 나온다.
    destination: function (req, file, cb) {  
      cb(null, 'uploads/')    //파일이 저장되는 위치
    },
    filename: function (req, file, cb) {    //파일을 저장할때 어떠한 이름으로 저장할지에 대한 function
      cb(null, `${Date.now()}_${file.originalname}`)   //이 이름으로 파일을 저장하겠다는 뜻
    }
  })
   

var upload = multer({ storage: storage }).single('file') //이게 multer을 사용하는 방법인가보다...
    

router.post("/image", (req, res) => {   //axios.post로 보냈기때문에 post로 받는다.


    //가져온 이미지를 몽고db에 저장을 해주면됨
    //파일에 대한 정보를 받기 받고 저장하기 위해서는 multer가 필요하다.
    upload(req,res,err=>{
        if(err)
        {
            return res.json({success:false,err});
        }
        return res.json({success:true,filePath:res.req.file.path,fileName:res.req.file.filename})
    })     
});

router.post("/", (req, res) => {   //axios.post로 보냈기때문에 post로 받는다.


    //받아온 정보들을 DB에 넣어준다.
    const product=new Product(req.body)
    console.log(product);
    product.save((err)=>{       //몽고db로 저장한다.
        if(err) return res.status(400).json({success:false,err})  //실패시

        return res.status(200).json({success:true});
    })

});


module.exports = router;

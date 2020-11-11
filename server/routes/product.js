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

router.post('/products',(req,res)=>{                   //잘 기억해놔야함 몽고DB에 저장하는 기본적 틀..
    

  let limit=req.body.limit? parseInt(req.body.limit):100;  //가져온 limit이 있으면 이걸 숫자로 바꿔서 limit으로 대입 없으면 걍 100넣고
  let skip=req.body.skip?parseInt(req.body.skip):0;       //가져온 skip이 있으면 이걸 숫자로 바꿔서 skip으로 대입 없으면 0을 대입
  let term=req.body.searchTerm;

  let findArgs={};
  for(let key in req.body.filters){
    if(req.body.filters[key].length>0)    //category별로 하나 이상씩 눌린게 있으면
    {

          if(key==='price') 
          {
            findArgs[key]=
            {
              $gte:req.body.filters[key][0],     //greater than equal 
              $lte:req.body.filters[key][1]      //less than equal      둘다 몽고DB에서 사용하는 쿼리이다.ㅎ
            }
          }
          else{
            findArgs[key]=req.body.filters[key]
          }
    
    }
  }
  
  console.log(term)
  if(term)    //검색기능에서 보낸 정보가 있으면
  {
    Product.find(findArgs)
    .find({ $text:{ $search: term } })         //여기서는 mongodb에서 제공해주는 text로 찾는 기능을 가져와야한다.
    .populate('writer')         //populate를 해줘야지만 모든 데이터를 가져올 수 있다.
    .skip(skip)
    .limit(limit)               //오호 이런식으로 넣어주는군.
    .exec((err,productInfo)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true,productInfo,postSize:productInfo.length})
    })
  }
  else{     //없으면
    Product.find(findArgs)
    .populate('writer')         //populate를 해줘야지만 모든 데이터를 가져올 수 있다.
    .skip(skip)
    .limit(limit)               //오호 이런식으로 넣어주는군.
    .exec((err,productInfo)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success: true,productInfo,postSize:productInfo.length})
    })
  }
  console.log(findArgs)
  //비디오를 db에서 가져와서 client에 보낸다.
 
})

router.post("/", (req, res) => {   //axios.post로 보냈기때문에 post로 받는다.


    //받아온 정보들을 DB에 넣어준다.
    const product=new Product(req.body)
    console.log(product);
    Product.save((err)=>{       //몽고db로 저장한다.
        if(err) return res.status(400).json({success:false,err})  //실패시

        return res.status(200).json({success:true});
    })

});



router.get("/product_by_id", (req, res) => {   //axios.post로 보냈기때문에 post로 받는다.


       let type=req.query.type;
       let productId=req.query.id;

       Product.find({_id:productId})
       .populate('writer')
       .exec((err,product)=>{
         if(err)
         return res.status(400).send(err);
          return res.status(200).send({ success:true,product});
       })

});


module.exports = router;

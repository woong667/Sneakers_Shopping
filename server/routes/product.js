const express = require('express');
const router = express.Router();   //require로 보내면 여기서 이렇게 router 로 받나.?



//=================================
//             Product
//=================================

router.post("/image", (req, res) => {


    //가져온 이미지를 몽고db에 저장을 해주면됨
    //파일에 대한 정보를 받기 받고 저장하기 위해서는 multer가 필요하다.

    
});


module.exports = router;

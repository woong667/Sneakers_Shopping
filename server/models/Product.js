const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const ProductSchema = mongoose.Schema({
  
    writer:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        maxlength:50
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        default:0
    },
    images:{
        type:Array,
        default:[] //배열이니까 default는 빈 배열 []로.
    },
    sold:{
        type:Number,
        maxlength:100,
        default:0
    },
    views:{
       type:Number,
       default:0
    },
    brand:{
        type:String,
    }

},{timestamps:true}) //timestamp를 true로 놓으면 등록시간과 같은 것들이 자동으로 mongodb에 저장이된다.


const Product = mongoose.model('Product', ProductSchema);
module.exports = {Product}
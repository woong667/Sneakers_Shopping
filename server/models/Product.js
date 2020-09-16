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
        type:Number,
        default:1
    }

},{timestamps:true}) //timestamp를 true로 놓으면 등록시간과 같은 것들이 자동으로 mongodb에 저장이된다.

ProductSchema.index({
    title:'text',
    description:'text'       //찾을때 제목과 설명에 찾는게 포함되어있는지 확인한다.
},{
    weights:{            //이건 중요도를 주는 거 높을수록 중요하게 친다.
        title:5,
        description:1
    }
})

const Product = mongoose.model('Product', ProductSchema);
module.exports = {Product}
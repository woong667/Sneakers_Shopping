import React,{useState,useEffect} from 'react'
import {Typography,Button,Form,Input} from 'antd';
import FileUpload from '../../utils/FileUpload.js';
const {Title}=Typography;
const {TextArea}=Input;


const brand=[
    {key:1, value:'Nike'},
    {key:2, value:'Adidas'},
    {key:3, value:'New Balance'},
    {key:4, value:'Converse'},
    {key:5, value:'etc'}
];

function UploadProductPage() {

    const [title, settitle] = useState("");
    const [detail, setdetail] = useState("");
    const [price, setprice] = useState(0);
    const [Brand, setBrand] = useState(1)

    const titleChangeHandler=(event)=>{
        settitle(event.currentTarget.value);
    }
    const detailChangeHandler=(event)=>{
        setdetail(event.currentTarget.value);
    }
    const priceChangeHandler=(event)=>{
        setprice(event.currentTarget.value);
    }
    const brandChangeHandler=(event)=>{
        setBrand(event.currentTarget.value);
    }

    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                <Title level={2}>상품 업로드</Title>
            </div>
            <Form>
             {/* dropzone */}
             <FileUpload/>
             <br />
             <br />
             <label >상품이름</label>
             <Input onChange={titleChangeHandler} value={title}/>
             <br />
             <br /> 
             <label>설명</label>
             <TextArea onChange={detailChangeHandler} value={detail}/>
             <br />
             <br />
             <label>가격(WON) </label>
             <Input type="number" onChange={priceChangeHandler} value={price}/>
             <br />
             <br />
             <label>신발 브랜드 </label>
             <select onChange={brandChangeHandler} value={Brand}>
                 {brand.map(item=>(
                          <option key={item.key} value={item.key}>{item.value}</option>
                 ))}
             </select>
             <br />
             <br />
             <Button >
                 확인
             </Button>
            </Form>
    
        </div>
    )
}

export default UploadProductPage

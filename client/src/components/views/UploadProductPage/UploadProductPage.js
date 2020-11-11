import React,{useState,useEffect} from 'react'
import {Typography,Button,Form,Input} from 'antd';
import FileUpload from '../../utils/FileUpload.js';
import axios from 'axios'
import { PromiseProvider } from 'mongoose';
const {Title}=Typography;
const {TextArea}=Input;


const brand=[
    {key:1, value:'Nike'},
    {key:2, value:'Adidas'},
    {key:3, value:'New Balance'},
    {key:4, value:'Converse'},
    {key:5, value:'etc'}
];

function UploadProductPage(props) {

    const [title, settitle] = useState("");
    const [Detail, setDetail] = useState("");
    const [Price, setPrice] = useState(0);
    const [Brand, setBrand] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler=(event)=>{
        settitle(event.currentTarget.value);
    }
    const detailChangeHandler=(event)=>{
        setDetail(event.currentTarget.value);
    }
    const priceChangeHandler=(event)=>{
        setPrice(event.currentTarget.value);
    }
    const brandChangeHandler=(event)=>{
        setBrand(event.currentTarget.value);
    }

    const updateImages=(newImages)=>{
          setImages(newImages);
    }


    const submitHandler=(event)=>{

       
        event.preventDefault(); //이걸 해줘야지 submit눌렀을때 자동으로 페이지가 refresh되지않는다.
        if(!title||!Detail||!Price||!Brand||!Images){  //유효성 검사
            return alert('모든 항목을 채워주세요');
        }
        const body={   //서버로 보내기 위함 정보들.
            //로그인된 사람의 아이디를 writer로 넣어주기 위해서 필요함
            writer:props.user.userData._id,
            title:title,
            description:Detail,
            price:Price,
            brand:Brand,
            images:Images
        }

        //서버로 request보낸다.
        axios.post('/api/product',body).then(response=>{
            if(response.data.success)
            {
                alert('Product Upload Complated!! Thank you!! :>')
                props.history.push('/'); //이것을 props을 이용해서 원하는 페이지로 이동하는 방법
            }
            else
            {
                alert('Product Upload Failed...please contact 010-9211-8206');
            }
        })

    }

    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                <Title level={2}>상품 업로드</Title>
            </div>
            <Form >
             {/* dropzone */}
             <FileUpload refreshFunction={updateImages}/>  {/*파일업로드 컴포넌트 utils에 잇음*/}
             <br />
             <br />
             <label >상품이름</label>
             <Input onChange={titleChangeHandler} value={title}/>
             <br />
             <br /> 
             <label>설명</label>
             <TextArea onChange={detailChangeHandler} value={Detail} placeholder='연락처,거래방법,구매날짜,착용횟수는 필수로 작성해주세요
             
             . 제품의 상태를 꼼꼼히 작성해주셔야 추후에 분쟁이 없습니다.'/>
             <br />
             <br />
             <label>가격(WON) </label>
             <Input type="number" onChange={priceChangeHandler} value={Price}/>
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
             <Button type='submit' onClick={submitHandler}>
                 확인
             </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage

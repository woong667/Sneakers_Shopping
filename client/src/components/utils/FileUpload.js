import React,{useState} from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd';
import axios from 'axios'


function FileUpload(props) {



   const [Images, setImages] = useState([]) //사진을 여러개 가져올수 있게 하기위해서 초기값은 배열로 설정해준다.
   const DropHandler=(files)=>{

     ////////////////////////////////////////
     let formData=new FormData();
     const config={
        header:{'content-type':'multipart/form-data'}
     }
     formData.append('file',files[0])
     /////////////////////////////////////// 파일을 보내줄때는 무조건 같이 넣어서 보내줘야하는 코드★


    axios.post('/api/product/image',formData,config).then(response=>{      //서버로 파일의 정보를 보내준다.
      if(response.data.success)    //성공!
      {
           setImages([...Images,response.data.filePath]);  //이게 useState의 배열에 넣는 방법 ...는 무슨의미인지...
           //여기는 이제 파일을 업로드 할때마다 부모 component인 UploadProductPage로 Images 배열을 보내기 위한 구간.
           props.refreshFunction([...Images,response.data.filePath]);
      } 
      else{                        //실패!
        alert('파일저장 실패!');
      }
    })
   }
   const deleteHandler=(image)=>{   //사진을 올렸다가 다시 지우고 싶을때 클릭만으로 사진을 지우게 해주는 핸들러
     
    const currentIndex=Images.indexOf(image);    //지우고자 하는 image의 index를 알기위한 코드
    const newImages=[...Images]  //newImages라는 곳에 모두 Images의 요소들을 모두 복사해서 넣어준다.
    newImages.splice(currentIndex,1); // newImages에 있는 배열의 currentIndex index부터 1개의 요소를 splice(지워준다).
    setImages([...newImages]);  //이렇게 해도되고
    //setImages(newImages);  로 해도 됨
    props.refreshFunction(newImages); //파일을 추가할때외에 지울떄도 부모 component랑 일맥상통 하기 위해서..

  }

    return (
     <div style={{display:'flex',justifyContent:'space-between'}}>
        <Dropzone onDrop={DropHandler}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div style={{width:300 , height: 240,border: '1px solid lightgray',
            display:'flex' ,alignItems:'center',justifyContent:'center'}} 
            {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type='plus' style={{fontSize:'3rem'}}/>
            </div>
          </section>
        )}
       </Dropzone>

       <div style={{display:'flex' ,width:'350px', height:'240px', overflowX:'scroll'}}>

         {Images.map((image,index)=>(
           <div onClick={()=>deleteHandler(image)}key={index}>   {/* onClick={()=>deleteHandler} 를 해준거는 클릭하자마자 즉시실행해서 Handler에 image를 넘겨주기 위해서*/ }
                <img style={{minWidth:'300px' ,width:'300px',height:'240px'}}
                 src={`http://localhost:5000/${image}`} />
          </div>
         ))}

       </div>
     </div>
    )
}

export default FileUpload

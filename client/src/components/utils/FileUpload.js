import React from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd';
import axios from 'axios'


function FileUpload( ) {

 
   const DropHandler=(files)=>{

     ////////////////////////////////////////
     let formData=new FormData();
     const config={
        header:{'content-type':'multipart/fomr-data'}
     }
     formData.append('file',files[0])
     /////////////////////////////////////// 파일을 보내줄때는 무조건 같이 넣어서 보내줘야하는 코드★


    axios.post('/api/product/image',formData,config).then(response=>{      //서버로 파일의 정보를 보내준다.
      if(response.data.success)    //성공!
      {
           
      } 
      else{                        //실패!
        alert('파일저장 실패!');
      }
    })
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
     </div>
    )
}

export default FileUpload

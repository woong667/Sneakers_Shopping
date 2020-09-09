import React,{useState} from 'react'
import {Collapse,Checkbox,Row, Col,Radio} from 'antd'
const {Panel}=Collapse


function RadioBox(props) {

   const [value, setvalue] = useState(0);  //초기값은 0이다 0이 any임 다 볼수 있는것
  


     const rendorRadioBox=()=>(
        props.lists&&props.lists.map(value=>(
             <Radio key={value._id} value={value._id}>                       {/*key는 오류를 없애기 위해서 준다. */}
              {value.name}
             </Radio>
        ))
     )

     const handleChange=(event)=>{
        setvalue(event.target.value);
        props.handleFilters(event.target.value);
     }

    return (
        <div>
             <Collapse defaultActiveKey={['1']} >
         <Panel header="가격범위설정" key="1">
            <Radio.Group onChange={handleChange} value={value}>
             {rendorRadioBox()}
             </Radio.Group>
          </Panel>
       </Collapse>
        </div>

    )
}

export default RadioBox

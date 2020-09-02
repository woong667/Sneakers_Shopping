import React,{useState} from 'react'
import {Collapse,Checkbox,Row, Col} from 'antd'
const {Panel}=Collapse






function CheckBox(props) {

    const [Checked, setChecked] = useState([])     //여기서 작업이 끝나면 이 Checked state는 LandingPage로 보내져야한다.
    console.log(Checked);
    const handleToggle=(value)=>{

        //누른것의 인덱스를 구하고
        
        const currentIndex=Checked.indexOf(value);

        const newChecked=[...Checked];  //...은 전체 배열을 쫙 가져올때 쓰는거야!! 이건 배열 복사이다 왜냐면 나중에 splice는 배열의 수정해버리기 때문에

        if(currentIndex===-1)      //현재 클릭된 인덱스에 들어있지 않으면
        {
           newChecked.push(value);  //
        }
        else{      //들어있다면 이건 클릭했다가 다시 check박스를 해제하는 것이기 때문에 배열에서 지워줘야 한다.
            newChecked.splice(currentIndex,1); //current인덱스부터 1만큼 배열에서 지우는것이기 때문에 자기를 지운다는 의미.
        }
        setChecked(newChecked);
        props.handleFilters(newChecked);        //이게 부모로 전달해주는.....ㄷㄷㄷㄷ


    }


    const renderCheckBoxList=()=>props.lists&&props.lists.map((value,index)=>(          //이런 문법도 다잇네...

        <React.Fragment key='index'>
        <Checkbox onChange={()=>handleToggle(value._id) } 
        checked={Checked.indexOf(value._id)===-1?false:true}/>   {/* checked 는 false이면 체크 x true면 체크 ㅇ */}
          <span> {value.name}</span> 
        </React.Fragment>
     )) //props로 가져왔음
        
    return (
    <div>
       <Collapse defaultActiveKey={['1']} >
         <Panel header="Brand search" key="1">
              {renderCheckBoxList()}
         </Panel>
       </Collapse>
  </div>
    )
}

export default CheckBox

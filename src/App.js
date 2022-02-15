import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './App.css';



const App =({data})=>{
  const [dataBtn, setDataBtn] = useState([]);
  const [selectElement1, setSelectElement1] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(()=> {
    
    const countries = Object.keys(data);
    const capitals = Object.values(data);
   let arrayCountries = countries.concat(capitals); 
   shuffleButtons(arrayCountries);
   setDataBtn(arrayCountries)
    },[data])

   const shuffleButtons = (array)=>{
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const matchCountries = (selectElement1)=>{
    
    if(selectElement1.length > 0){
      
      let [auxSelects1 ,  auxSelects2] = selectElement1;
      auxSelects1.style.background = 'blue';
      

      if(auxSelects2 !== undefined){
        let [selectedName1 , selectedName2] = selectElement1;
        const selecteds = [selectedName1.innerText, selectedName2.innerText] 
        const pairs = Object.entries(data);
        const match =  selecteds.map((e)=>pairs.filter((x)=> x.includes(e)))

        let [select1] = match[0];
        let [select2] = match[1];

        if(select1[0] === select2[0]){
          auxSelects2.style.background = 'blue';
          auxSelects1.style.display = 'none';
          auxSelects2.style.display = 'none';    
        } else {
         auxSelects1.style.background = 'red';
         auxSelects2.style.background = 'red';
        
         setTimeout(()=>{
          auxSelects1.style.background = 'grey';
          auxSelects2.style.background = 'grey';
         }, 1000)
        }

        setCounter(0);
        setSelectElement1([]);
      }
    }  
  }
 
  matchCountries(selectElement1)
  
  return (
    <div className='wrapper-game'>
        <h2 style={{color: 'white'}}>Country game</h2>
  {
    dataBtn.map((btn, index)=>{
      return(
         <Button className='buttons' 
          onClick={
            (e)=>{
              setCounter(counter + 1) ;
               setSelectElement1([...selectElement1, e.target])}} 
          key={index} 
         >
            {btn}
            </Button>
      )
    })
  }
    </div>
  );
}

export default App;

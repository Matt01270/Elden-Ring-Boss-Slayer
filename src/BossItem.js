import React from 'react'; 
import { useState, useEffect} from 'react'; 
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database'; 

const BossItem = (props) => { 
const [bosses, setBosses] = useState([]); 




useEffect(() => { 
    
  const database = getDatabase(firebase); 
  const dbRef = ref(database);

  onValue(dbRef, (response) => { 
    const bossList = []; 
    const data = response.val(); 

    for (let key in data) {  
      bossList.push(data[key]);
    }

    setBosses(bossList[0]);
  })
  }, []) 

  return ( 
    <div> 
      <ul>  
        {bosses.map((boss, index) => { 
          return  ( 
            <li key={boss.id}  className={boss.killed ? 'faded' : ''}> 
              <h3 key={boss.name}> 
                {boss.name}
              </h3> 
              <p className='desc'> {boss.description}</p> 
              <p className='hp'>{boss.healthPoints} HP</p> 
              <img src={boss.image} alt={boss.description}/>  
              <div className="infoSection"> 
                <div className='infoText'>  
                  <h4>Location:</h4>
                  <p className='location'>{boss.location}, {boss.region}</p>  
                </div>
                <div className='infoText'>  
                  <h4>Drops:</h4> 
                  <p className="drops">{boss.drops[0]}</p> 
                  <p className="drops">{boss.drops[1]}</p>  
                </div>
              </div>
              <div> 
                <button  
                className="killed"
                id={index}
                onClick={props.handleButtonClickKilled}>Killed</button> 
                <button 
                className="undo"
                id={index} 
                onClick={props.handleButtonClickUndo}>Undo</button>
              </div>
            </li>  
          )     
        })}
      </ul> 
    </div>
  )
} 

export default BossItem; 






import React from 'react'; 
import { useState, useEffect} from 'react'; 
import firebase from './firebase';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database'; 


const BossItem = () => { 
const [bosses, setBosses] = useState([]);
const [selectedBosses, setSelectedBosses] = useState([]); 
const [changedBossCount, setChangedBossCount] = useState(  localStorage.getItem('ChangedBossCount') || 0);

useEffect(() => { 
  const savedCount = localStorage.getItem('changedBossCount', JSON.stringify(changedBossCount)); 
  if (savedCount) { 
    setChangedBossCount(JSON.parse(savedCount));
  }
}, []); 

useEffect(() => { 
  localStorage.setItem('ChangedBossCount', (changedBossCount));
}, [changedBossCount]);

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

  const handleButtonClickKilled = (e, boss) => {  
    if (selectedBosses.includes(boss)) { 
      setSelectedBosses(selectedBosses.filter(b => b !== boss)); 

    } else { 
      setSelectedBosses([...selectedBosses, boss]); 
      setChangedBossCount(prevCount => Number(prevCount) + 1);
      const updateKilled = () => { 
        const db = getDatabase(); 

        const postData = { 
          changed: true
        } 
 
        const updates = {};  
        updates['/data/' + e.target.id + '/killed'] = postData;
        return update(ref(db), updates); 
      } 

      updateKilled();  
      
    } 
  };  

  const handleButtonClickUndo = (e, boss) => { 
    setSelectedBosses(selectedBosses.filter(b => b !==boss)); 
    setChangedBossCount(changedBossCount - 1);
    const removeChange = () => { 
      const database = getDatabase(firebase); 
        const dbRef = ref(database, '/data/' + e.target.id + '/killed');
        remove(dbRef)
    }; 
    removeChange(); 
    
  } 

  return ( 
    <div> 
       
      <div className="progressContainer">  
      <div className='progressText'>Bosses slain: {changedBossCount} /112</div>
        <div class="progressBar"> 
          <div class="progressBarFill" style={{width: `${(changedBossCount / 112) * 100}%`}}></div>
        </div>
      </div>
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
                checked={boss.killed} 
                onClick={(e) => handleButtonClickKilled(e, boss)}>Killed</button> 
                <button 
                className="undo"
                id={index} 
                onClick={(e) => handleButtonClickUndo(e, boss)}>Undo</button>
              </div>
            </li>  
          )     
        })}
      </ul> 
    </div>
  )
} 

export default BossItem; 






import './App.css'; 
import BossItem from './BossItem';  
import ProgressBar from './ProgressBar';
import { useState, useEffect } from 'react';  
import firebase from './firebase';
import { getDatabase, ref, remove, update } from 'firebase/database';

function App() {  
  const [selectedBosses, setSelectedBosses] = useState([]); 
  const [changedBossCount, setChangedBossCount] = useState( localStorage.getItem('ChangedBossCount') ||   0);

const handleButtonClickKilled = (e, boss) => {   
    if (selectedBosses.includes(boss)) { 
      setSelectedBosses(selectedBosses.filter(b => b !== boss)); 

    } else { 
      setSelectedBosses([...selectedBosses, boss]); };   
      setChangedBossCount(prevCount => Number(prevCount) + 1);
     
  const updateKilled = () => { 
        const db = getDatabase(); 
        const postData = { 
          changed: 'killed'
        } 
 
        const updates = {};  
        updates['/data/' + e.target.id + '/killed'] = postData;
        return update(ref(db), updates); 
      } 
      updateKilled();  
    }  

useEffect ( () => { 
  console.log('changing state.');
}, [])

useEffect(() => { 
  const savedCount = localStorage.getItem('changedBossCount', JSON.stringify(changedBossCount)); 
  if (savedCount) { 
    setChangedBossCount(JSON.parse(savedCount));
  }
}, [changedBossCount]); 

useEffect(() => { 
  localStorage.setItem('ChangedBossCount', (changedBossCount));
}, [changedBossCount]); 

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
    <div className="App">  
    <div className="wrapper">
      <h1>ELDEN RING</h1> 
      <h2>Boss Slayer</h2>  
      <div className="introText"><p>Hail, Tarnished. This tool shall aid thee in thy journey to vanquish each and every monstrous overlord that roams the Lands Between. May thy luck be ever strong.</p></div> 
      <ProgressBar changedBossCount={changedBossCount}/>
      <BossItem handleButtonClickKilled={handleButtonClickKilled} handleButtonClickUndo={handleButtonClickUndo}/> 
    </div> 
      <footer> 
        <p>Developed and Designed by Matt S. <span>This is an unofficial game companion for Elden Ring. The contents of this website are inspired by a video game and are not affiliated with or endorsed by the game's publisher or developer. All characters, images, and events depicted on this website are fictional and are not intended to depict real events or real persons. No copyright or trademark infringement is intended. This website is intended solely for entertainment and informational purposes.</span>   
        </p>
      </footer>
    </div>
  );
}

export default App;

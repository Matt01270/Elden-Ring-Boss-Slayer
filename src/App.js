import './App.css'; 
import BossItem from './BossItem';  
import ProgressBar from './ProgressBar';
import { useState, useEffect } from 'react';  
import { getDatabase, ref, remove, update, onValue, set } from 'firebase/database';

function App() {  
  const [selectedBosses, setSelectedBosses] = useState([]); 
  const [progressBarCount, setProgressBarCount] = useState(0); 

  useEffect(() => { 
    const database = getDatabase(); 
    const dbRef = ref(database, 'progressBarCount'); 
    onValue(dbRef, (snapshot) => { 
      setProgressBarCount(snapshot.val())
    });
  }, []);


const handleButtonClickKilled = (e, boss) => {   
    if (selectedBosses.includes(boss)) { 
      setSelectedBosses(selectedBosses.filter(b => b !== boss)); 

    } else { 
      setSelectedBosses([...selectedBosses, boss]); };   
      setProgressBarCount(prevCount => Number(prevCount) + 1);
     
  const updateKilled = () => { 
        const db = getDatabase(); 
        const dbRef = ref(db, 'progressBarCount'); 
        set(dbRef, progressBarCount + 1)
        const postData = { 
          changed: 'killed'
        } 
 
        const updates = {};  
        updates['/data/' + e.target.id + '/killed'] = postData;
        return update(ref(db), updates); 
      } 
      updateKilled();  
    }  

 const handleButtonClickUndo = (e, boss) => {
  setSelectedBosses(selectedBosses.filter(b => b !== boss));
  const newProgressBarCount = progressBarCount - 1;
  setProgressBarCount(newProgressBarCount); 
  
  
  const database = getDatabase();
  const dbRef = ref(database, 'progressBarCount');
  set(dbRef, newProgressBarCount);
  
  const removeChange = () => {
    const dbRef = ref(database, `data/${e.target.id}/killed`);
    remove(dbRef);
  };
  removeChange();
};

  return ( 
    <div className="App">  
    <div className="wrapper">
      <h1>ELDEN RING</h1> 
      <h2>Boss Slayer</h2>  
      <div className="introText"><p>Hail, Tarnished. This tool shall aid thee in thy journey to vanquish each and every monstrous overlord that roams the Lands Between. May thy luck be ever strong.</p></div> 
      <ProgressBar progressBarCount={progressBarCount}/>
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

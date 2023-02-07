import './App.css'; 
import BossItem from './BossItem';  

function App() {  
  
  return ( 
    <div className="App">  
      <h1>ELDEN RING</h1> 
      <h2>Boss Slayer</h2>  
      <div class="introText"><p>Hail, Tarnished. This tool shall aid thee in thy journey to vanquish each and every monstrous overlord that roams the Lands Between. May thy luck be ever strong.</p></div>
      <BossItem /> 
      <footer> 
        <p>Developed and Designed by Matt S. <span>This is an unofficial game companion for Elden Ring. The contents of this website are inspired by a video game and are not affiliated with or endorsed by the game's publisher or developer. All characters, images, and events depicted on this website are fictional and are not intended to depict real events or real persons. No copyright or trademark infringement is intended. This website is intended solely for entertainment and informational purposes.</span>   </p>
      </footer>
    </div>
  );
}

export default App;

const ProgressBar = (props) => { 
    return( 

        <div className="progressContainer"> 
          <div className='progressText'>Bosses slain: {props.changedBossCount} /112</div> 
            <div className="progressBar"> 
              <div className="progressBarFill" style={{width: `${(props.changedBossCount / 112) * 100}%`}}></div>
            </div> 
        </div>
    )
} 

export default ProgressBar; 
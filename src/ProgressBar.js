const ProgressBar = (props) => { 
    return( 

        <div className="progressContainer"> 
          <div className='progressText'>Bosses slain: {props.progressBarCount} /112</div> 
            <div className="progressBar"> 
              <div className="progressBarFill" style={{width: `${(props.progressBarCount / 112) * 100}%`}}></div>
            </div> 
        </div>
    )
} 

export default ProgressBar; 
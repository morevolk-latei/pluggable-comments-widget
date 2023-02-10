// library imports
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
// custom imports
import Comments from './widgets/Comments';
import doorKnob from './assets/img/wireless-door-knob-3.png'
import doorHandle from './assets/img/door-handle.png'

// stylesheet imports
import './App.scss';


function App() {

  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 3000)
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <p className='title'>Pluggable Comments Widget</p>
        <p className='creator subscript'>
          designed by <i>Rizul Sharma</i>
        </p>
      </header>
      {/* pluggable comments widget */}
      <div className={classNames('loader d-flex', { 'animate': isLoaded })}>
        <aside className='left-door door'>
          {/* <img src={doorHandle} alt='' className='door-handle' /> */}
          <div className='loading-text'>
            <div className='highlight'></div>
            <span>Opening please wait...</span>
          </div>
        </aside>
        <aside className='right-door door'>
          <img src={doorKnob} alt='' className='door-knob' />
          {/* <img src={doorHandle} alt='' className='door-handle' /> */}
        </aside>
      </div>
      {isLoaded && <Comments />}
    </div>
  );
}

export default App;

import React from 'react';
import "./Recorder.css";
import {BsMic, BsStopCircle, BsCheckLg} from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineReload} from "react-icons/ai"
import axios from 'axios'
import { useAudioRecorder } from '@baxibaba/react-audio-recorder'
import {Link} from 'react-router-dom';
import { 
  ShowRecord, //component used to show audio result
  ProcessRecord //component contains state to deal with logic when recording
} from 'react-nextjs-record';

function Recorder(props) {
  const sentences = ["What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry." , "Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.", "Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", 
      ];
const [currentSentence, setCurrentSentence] = React.useState(0);

let {
  blobURL,
  readyRecording,
  isRecording,
  completeRecording,
  startRecording,
  reStartRecording,
  stopRecording,
  onStop,
} = ProcessRecord();
let blob = fetch(blobURL).then(r => r.blob());
console.log(blob)

      
const submitHandler = () => {

  axios.post(`http://localhost:8000/api/upload/`, blobURL)
  .then((res) => {
    console.log(res)
  })
    .catch((err) => {
      console.log(err)
    })
}


// const submitHandler = () => {
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', 'http://localhost:8000/api/upload/', true);
//   xhr.send(blob);
  
// }
console.log(submitHandler());
  return (
    <div className='recorderContainer'>
    <button className='back'><Link to='/'><BiArrowBack size={40}/></Link></button>
      <p className='sentences'>{sentences[currentSentence]}</p>
      <div className='Main'>
      <div>
        <div>
          {isRecording && (
            <div>
              <div>
                <button className='startButton' onClick={stopRecording}><BsStopCircle size={30}/></button>
              </div>
            </div>
          )}
      <div>
        <ShowRecord />{/*Only appears when recording process finishes to show result*/}
      </div>
          {completeRecording && (
            <>
                <button className='startButton' onClick={reStartRecording}><AiOutlineReload size={30}/></button>
                <button className='startButton' onClick={() => submitHandler()}><BsCheckLg size={30}/></button>
            </>
          )}
        </div>
        {readyRecording && (
          <button className='startButton'
            onClick={startRecording}
          >
            <BsMic size={30}/>
          </button>
        )}
      </div>
    </div>    
      <div className='tip'> Үүнийг <BsMic color='#e74c3c'/> дараад уншиж эхэлнэ үү!.</div>
    </div>
  )
}

export default Recorder;
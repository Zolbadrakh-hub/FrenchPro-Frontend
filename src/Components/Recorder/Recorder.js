import React,{useState} from 'react';
import "./Recorder.css";
import {BsMic, BsStopCircle, BsCheckLg} from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineReload} from "react-icons/ai"
import { Modal, Button, Text, Title, Group, Container, Box } from '@mantine/core';
import axios from 'axios'
import {Link} from 'react-router-dom';
import { 
  ShowRecord, //component used to show audio result
  ProcessRecord //component contains state to deal with logic when recording
} from 'react-nextjs-record';

function Recorder(props) {
  const sentences = ["What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry." , "Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.", "Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).", 
      ];
const [currentSentence, setCurrentSentence] = React.useState(0);
const [opened, setOpened] = useState(false);

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

      
const submitHandler = async () => {
  var data = new FormData();

  data.append("wav", await fetch(blobURL).then(r => r.blob()));

  axios.post(`http://localhost:8000/api/upload/`, data)
  .then((res) => {
    console.log(res)
  })
    .catch((err) => {
      console.log(err)
    })
}
  return (
    <Box className='recorderContainer'>
    <Group sx={{display: 'flex', flexDirection: 'column', gap: 0, margin: '1.5rem', 
  fontFamily: 'sans-serif', textAlign: 'center'}}>
    <Title order={3}> Доорх тэкстийг уншина уу! </Title>
    
    <p className='sentences'>{sentences[currentSentence]}</p>
      </Group>
      <div className='Main'>

          {isRecording && (
            <div>
              <div>
                <button className='startButton' onClick={stopRecording}><BsStopCircle size={30}/></button>
              </div>
            </div>
          )}
          {readyRecording && (
          <button className='startButton'
            onClick={startRecording}
          >
            <BsMic size={30}/>
          </button>
        )}
        
      <div>
        <ShowRecord />{/*Only appears when recording process finishes to show result*/}
      </div>
          {completeRecording && (
            <>
                <Modal
                  opened={opened}
                  onClose={() => setOpened(false)}
                  title="Таны үнэлгээ бол :"
                >
                  <Title className='score'>A-</Title>
                </Modal>
                <Group position="center" spacing="xl" className='buttons'>
                    <Button className='startButton' onClick={() => 
                    (submitHandler, setOpened(true))}><BsCheckLg size={30}/></Button>
                    
                    <Button className='startButton' onClick={reStartRecording}><AiOutlineReload size={30}/></Button>
                </Group>
                  </>
          )}
      </div>
      <div className='tip'> Үүнийг <BsMic color='#e74c3c'/> дараад уншиж эхэлнэ үү!.</div>
    </Box>
  )
}

export default Recorder;
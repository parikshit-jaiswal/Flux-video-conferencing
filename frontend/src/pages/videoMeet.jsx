import React, { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const server_url = "http://localhost:8000";

var connections = {};

const peerConfigConnections = {
    "iceServers": [
        {
            "urls": "stun:stun.l.google.com:19302"
        }
    ]
}

function VideoMeetComponent
    () {

    const socketRef = useRef();

    let socketRefId = useRef();

    let localVideoRef = useRef();

    let [videoAvailable, setVideoAvailable] = useState(true);

    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState();

    let [audio, setAudio] = useState();

    let [screen, setScreen] = useState();

    let [showModal, setShowModal] = useState();

    let [screenAvailable, setScreenAvailable] = useState();

    let [messages, setMessages] = useState([]);

    let [message, setMessage] = useState("");

    let [newMessage, setNewMessage] = useState(0);

    let [askForUsername, setAskForUsername] = useState(true);

    let [username, setUsername] = useState("");

    const videoRef = useRef([]);

    let [videos, setVideos] = useState([]);

    // todo
    // if (isChrome() == false) { }

    const getPermissions = async () => {
        try {
            const videeoPermission = await navigator.mediaDevices.getUserMedia({ video: true });

            if (videeoPermission) {
                setVideoAvailable(true)
            } else {
                setVideoAvailable(false);
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });

            if (audioPermission) {
                setAudioAvailable(true)
            } else {
                setAudioAvailable(false);
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            if (videoAvailable || audioAvailable) {
                const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable })


                if (userMediaStream) {
                    window.localStream = userMediaStream;
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = userMediaStream;
                    }
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getPermissions();
    }, []);

    let getUserMediaSuccess = (stream) => { }

    let getUserMedia = () => {
        if ((video && videoAvailable) || (audio && audioAvailable)) {
            navigator.mediaDevices.getUserMedia({ video, audio })
                .then(getUserMediaSuccess)//todo:getUserMediaSuccess
                .then((stream) => { })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            try {
                let tracks = localVideoRef.current.srcObject.getTracks();
                tracks.forEach((track) => {
                    track.stop();
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        if (video != undefined && audio != undefined) {
            getUserMedia();
        }
    }, [audio, video]);

    let getMedia = () => {
        setVideoAvailable(videoAvailable);
        setAudioAvailable(audioAvailable);
        // connectToSocketServer();
    }

    let connect = () => {
        setAskForUsername(false);
        // connectToSocketServer();
    }

    // let connectToSocketServer = () => {
    //     socketRef.current = new WebSocket(server_url);
    //     socketRef.current.onopen = () => {

    // }

    return (
        <div>
            {askForUsername === true ?
                <div>
                    <div className="">
                        <h2>Enter into Lobby</h2>
                        <TextField
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Button variant="contained" onClick={connect}>Join</Button>
                    </div>
                    <div className="">
                        <video ref={localVideoRef} autoPlay muted></video>
                    </div>
                </div>

                :
                <div>

                </div>
            }
        </div>
    )
}

export default VideoMeetComponent

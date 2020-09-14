import React, { useState, useCallback } from 'react';
import axios from 'axios'
import Lobby from './Lobby';
import Room from './Room';

const VideoChat = () => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleEmailChange = useCallback(event => {
    setEmail(event.target.value)
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      await axios.post('/video/token', {
        identity: username,
        room: roomName,
        email
        }).then(({data}) => setToken(data.jwt))},
    [roomName, username, email]
  );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
        handleEmailChange={handleEmailChange}
      />
    );
  }
  return render;
};

export default VideoChat;

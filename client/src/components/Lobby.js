import React from 'react';
import { Container, Form, Button} from 'react-bootstrap'

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  email,
  handleEmailChange
}) => {
  return (
    <Container className="my-5">
      <Form style={{maxWidth: "60%", marginLeft: "20%"}} onSubmit={handleSubmit} >

        <Form.Group controlId="email" >
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Your Email" value={email} required onChange={handleEmailChange} />
        </Form.Group>

        <Form.Group controlId="username" >
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Display name" value={username} required onChange={handleUsernameChange} />
        </Form.Group>

        <Form.Group controlId="room" >
          <Form.Label>Room name</Form.Label>
          <Form.Control type="text" placeholder="Room you want to connect" value={roomName} required onChange={handleRoomNameChange} />
        </Form.Group>
        <Button type="submit">Connect</Button>
      </Form>
    </Container>
  );
};

export default Lobby;

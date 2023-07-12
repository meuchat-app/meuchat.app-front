import React from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FaRobot } from 'react-icons/fa';

import * as S from './styles/Home';

var stompClient = null;
const uniqueId = `${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

function Home() {
  const [privateChats, setPrivateChats] = React.useState([]);
  const [userData, setUserData] = React.useState({
    username: '',
    userid: uniqueId,
    connected: false,
    registered: false,
    message: '',
  });

  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      '/user/' + userData.userid + '/private',
      onPrivateMessage
    );
    if (stompClient.connected) {
      userJoin();
    }
  };

  const userJoin = () => {
    var chatMessage = {
      authorName: '',
      authorId: userData.userid,
      status: 'JOIN',
    };
    stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    privateChats.push(payloadData);
    setPrivateChats(privateChats);
    if (payloadData.message === 'Cadastro realizado com sucesso!') {
      setUserData({ ...userData, registered: true });
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        authorName: userData.username,
        authorId: userData.userid,
        message: userData.message,
        status: userData.registered === false ? 'JOIN' : 'MESSAGE',
      };
      if (userData.message !== '') {
        setPrivateChats([...privateChats, chatMessage]);
        stompClient.send(
          '/app/private-message',
          {},
          JSON.stringify(chatMessage)
        );
        setUserData({ ...userData, message: '' });
      }
    }
  };

  React.useEffect(() => {
    connect();
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
    console.log(userData);
  }, []);

  React.useEffect(() => {
    console.log(privateChats);
  }, [privateChats]);

  return (
    <S.Container>
      {userData.connected && (
        <>
          <S.ChatContent>
            <ul>
              {privateChats.map((chat, index) => (
                <S.Message key={index} author={chat.authorName}>
                  {chat.authorName !== userData.username && (
                    <span>
                      <FaRobot /> EasyChat
                    </span>
                  )}

                  <p>{chat.message}</p>
                </S.Message>
              ))}
              <div style={{ height: 240 }}></div>
            </ul>
          </S.ChatContent>
          <S.MessageBarContainer>
            <input
              type='text'
              className='input-message'
              placeholder='Enter the message'
              value={userData.message}
              onChange={handleMessage}
            />
            <button
              type='button'
              className='send-button'
              onClick={sendPrivateValue}
            >
              <RiSendPlaneFill />
            </button>
          </S.MessageBarContainer>
        </>
      )}
    </S.Container>
  );
}

export default Home;

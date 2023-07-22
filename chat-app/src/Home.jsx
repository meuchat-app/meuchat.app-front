import React from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FaRobot } from 'react-icons/fa';

import * as S from './styles/Home';

var stompClient = null;
const uniqueId = 'author-user';

function Home() {
  const [privateChats, setPrivateChats] = React.useState([]);
  const [userData, setUserData] = React.useState({
    id: uniqueId,
    message: '',
    connected: false,
  });

  const connect = () => {
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe('/user', onPrivateMessage);
    if (stompClient.connected) {
      userJoin();
    }
  };

  const userJoin = () => {
    var chatMessage = {
      authorId: userData.id,
    };
    stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    privateChats.push(payloadData);
    setPrivateChats(privateChats);
    setUserData({ ...userData });
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
        authorId: userData.userid,
        message: userData.message,
      };
      if (userData.message !== '') {
        privateChats.push(chatMessage);
        setPrivateChats(privateChats);
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
  }, []);

  return (
    <S.Container>
      {!userData.connected && (
        <>
          <S.ChatContent>
            <ul>
              {privateChats.map((chat, index) => (
                <S.Message key={index} authorId={chat.authorId}>
                  {chat.authorId !== userData.id && (
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

import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  height: 100vh;
  max-width: 1100px;
  width: 100%;

  position: relative;

  display: flex;
  flex-direction: column;

  padding-left: clamp(1rem, 5%, 10%);
  padding-right: clamp(1rem, 5%, 10%);

  @media only screen and (min-width: 1024px) {
    padding: 0;
  }

  @media only screen and (max-width: 768px) {
    padding-left: 3%;
    padding-right: 3%;
  }
  @media only screen and (max-width: 576px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  header {
  }
`;

export const Register = styled.form`
  margin: auto;
  input {
  }
  button {
  }
`;

export const ChatBox = styled.div``;

export const MemberList = styled.div`
  ul {
  }

  li {
    cursor: pointer;
  }
`;

export const Avatar = styled.div``;

export const MessageBarContainer = styled.form`
  width: 100%;
  position: absolute;
  display: flex;

  bottom: 0;
  left: 0;

  height: 240px;
  align-items: center;
  justify-content: center;

  background-image: linear-gradient(to top, #313238, transparent);

  button {
    width: 6.2rem;
    height: 6.2rem;

    border: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    cursor: pointer;

    background-color: #455559;

    svg {
      color: #46d39e;
      height: 40%;
      width: 40%;
    }
  }

  input {
    width: 100%;
    height: 6.2rem;
    border: none;
    background-color: #455559;

    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    font-size: 20px;
    color: rgba(255, 255, 255, 0.83);

    padding: 15px 0px 15px 20px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.38);
    }
  }
`;

export const Message = styled.li`
  max-width: 90%;
  width: fit-content;

  list-style: none;
  background-color: ${(props) =>
    props.authorId === 'author-server' ? '#3d5a73' : '#38A87D'};
  color: rgba(255, 255, 255, 0.83);

  padding: 10px;
  margin-left: ${(props) =>
    props.authorId === 'author-server' ? 'none' : 'auto'};
  text-align: ${(props) =>
    props.authorId === 'author-server' ? 'start' : 'end'};

  border-radius: 10px;

  span {
    font-weight: 700;
    font-size: 15px;
  }

  p {
    word-wrap: break-word;
  }
`;

export const ChatContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: flex-end;

  ul {
    overflow-y: scroll;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  li + li {
    margin-top: 10px;
  }
`;

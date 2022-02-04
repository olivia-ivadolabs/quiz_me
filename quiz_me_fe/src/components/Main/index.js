import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
} from 'semantic-ui-react';

import mindImg from '../../images/mind.svg';

import {COUNTDOWN_TIME} from '../../constants';
import { shuffle } from '../../utils';

import Offline from '../Offline';

const Main = ({ startQuiz }) => {
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizToPlay, setQuizToPlay] = useState('0');
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);

  console.log(quizToPlay)

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  if (
    quizOptions &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('http://localhost:8000/quiz/quiz/');
      let quizList = await response.json();
      quizList = formatQuiz(quizList)
      setQuizOptions(quizList);
    };
    doFetch();
  }, []);

  const formatQuiz = (quizList) => {
    return quizList.map((quiz) => {
      quiz.text = quiz.quiz_title;
      quiz.value = quiz.id;
      return quiz;
    });
  };

  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);

    const API = 'http://localhost:8000/quiz/questions/quiz_id=' + quizToPlay

    fetch(API)
      .then(respone => respone.json())
      .then(questions =>
        setTimeout(() => {
          questions.forEach(element => {
            element.options = shuffle([
              element.correct_answer,
              ...element.incorrect_answers.replace('[', '').replace(']', '').split(','),
            ]);
          });

          setProcessing(false);
          startQuiz(
            questions,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
        }, 1000)
      )
      .catch(error =>
        setTimeout(() => {
          if (!navigator.onLine) {
            setOffline(true);
          } else {
            setProcessing(false);
            setError(error);
          }
        }, 1000)
      );
  };

  if (offline) return <Offline />;

  return (
    <Container>
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} />
            <Item.Content>
              <Item.Header>
                <h1>Customized Quiz Anytime</h1>
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                <Dropdown
                  fluid
                  selection
                  name="quiz"
                  placeholder="Select Quiz Title"
                  header="Select Quiz Title"
                  options={quizOptions}
                  value={quizToPlay}
                  onChange={(e, { value }) => setQuizToPlay(value)}
                  disabled={processing}
                />
                <br />
                <Dropdown
                  search
                  selection
                  name="hours"
                  placeholder="Select Hours"
                  header="Select Hours"
                  options={COUNTDOWN_TIME.hours}
                  value={countdownTime.hours}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="minutes"
                  placeholder="Select Minutes"
                  header="Select Minutes"
                  options={COUNTDOWN_TIME.minutes}
                  value={countdownTime.minutes}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="seconds"
                  placeholder="Select Seconds"
                  header="Select Seconds"
                  options={COUNTDOWN_TIME.seconds}
                  value={countdownTime.seconds}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? 'Processing...' : 'Play Now'}
                  onClick={fetchData}
                  disabled={!allFieldsSelected || processing}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <br />
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;

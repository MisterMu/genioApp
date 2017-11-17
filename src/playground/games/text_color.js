import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Image, Modal } from 'react-native';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';

import { BgColor } from '../../../assets/color.js';
import Metrics from '../config/metrics.js';
import { PauseScreen } from '../pause.js';
import { FinishedScreen } from '../finished.js';
import { InitialGame } from '../initial.js';

var tmp_text, tmp_color;
var gmaeTime, countDownToGame;
const GAME_TIME = 20;
const CHOICE_QAUNTITY = 4;

export class TextColorGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: Math.floor(Math.random() * CHOICE_QAUNTITY),
      color: Math.floor(Math.random() * CHOICE_QAUNTITY),
      point: 0,
      questionNum: 0,
      isPause: false,
      timeLeft: GAME_TIME,
      countDown: 3
    }
  }

  randomQuestion = () => {
    if (Math.floor(Math.random() * 2) == 0) {
      tmp_text = Math.floor(Math.random() * CHOICE_QAUNTITY)
      do {
        tmp_color = Math.floor(Math.random() * CHOICE_QAUNTITY)
      } while(tmp_color == tmp_text);
    } else {
      tmp_text = Math.floor(Math.random() * CHOICE_QAUNTITY)
      tmp_color = tmp_text
    }
    this.setState({
      text: tmp_text,
      color: tmp_color,
      questionNum: this.state.questionNum + 1
    });
  }

  rightAnswer = () => {
    this.setState({ point: this.state.point + 1 });
    this.randomQuestion();
  }

  wrongAnswer = () => {
    this.randomQuestion();
  }

  _pause = () => {
    this.setState({isPause: true})
  }

  _resume = () => {
    this.setState({isPause: false})
  }

  _restart = () => {
    this.setState({timeLeft: GAME_TIME, point: 0, questionNum: 0, isPause: false, countDown: 3});
    this.randomQuestion();
  }

  _exit = () => {
    this.setState({isPause: false});
    clearInterval(gameTime);
    this.props.exit();
  }

  _right = () => {
    this.refs.view.rubberBand(500).then();
    setTimeout(() => {
      if (this.state.text === this.state.color) {
        this.rightAnswer();
      } else {
        this.wrongAnswer();
      }
    }, 500);
  }

  _wrong = () => {
    if (this.state.text !== this.state.color) {
      this.rightAnswer();
    } else {
      this.wrongAnswer();
    }
  }

  componentDidMount() {
    gameTime = setInterval(() => {
      if (!this.state.isPause && this.state.timeLeft > 0 && this.state.countDown <= 0) {
        this.setState({ timeLeft: this.state.timeLeft - 1 });
        console.log(this.state.timeLeft)
      }
    }, 1000);
    countDownToGame = setInterval(() => {
      if (this.state.countDown > 0) {
        this.setState({countDown: this.state.countDown - 1});
        console.log(this.state.countDown)
      }
    }, 1000);
    console.log(gameTime, countDownToGame)
  }

  render() {
    if (this.state.countDown <= 0) {
      clearInterval(countDownToGame);
    }
    if (this.state.countDown > 0) {
      return (
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.countDown > 0}
          onRequestClose={()=>{}}
        >
          <InitialGame detail={this.props.detail} time={this.state.countDown}/>
        </Modal>
      );
    } else if (this.state.timeLeft <= 0) {
      return (
        <FinishedScreen detail={this.props.detail} exit={this._exit}/>
      );
    }
    return (
      <View>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.isPause}
          onRequestClose={this._resume}
        >
          <PauseScreen resume={this._resume} restart={this._restart} exit={this._exit}/>
        </Modal>
        <View style={styles.top_bar}>
          <TouchableWithoutFeedback style={styles.btn} onPress={this._pause}>
            <Image
              source={require('../../../assets/icons/pause_circle_outline_blue.png')}
              style={styles.pause_btn}
            />
          </TouchableWithoutFeedback>
          <Text style={styles.point_text}>
            {this.state.point} คะแนน
          </Text>
        </View>
        <Progress.Bar
          progress={this.state.timeLeft * (1 / GAME_TIME)}
          width={Metrics.DEVICE_WIDTH}
          height={Metrics.TIME_BAR_HEIGHT}
          //animationType='timing'
          borderRadius={0}
          borderWidth={0}
        />
        <View style={styles.board}>
          <View style={styles.q_board}>
            <Text style={[styles.q_text, {color: color[this.state.color]}]}>{text[this.state.text]}</Text>
          </View>
          <View style={styles.a_board}>
            <TouchableWithoutFeedback onPress={this._wrong}>
              <Animatable.View ref='wrong_btn' style={styles.a_button}>
                <Text style={[styles.a_text, {color: 'red'}]}>ผิด</Text>
              </Animatable.View>
            </TouchableWithoutFeedback>
            <Animatable.View ref='view' style={styles.a_button} useNativeDriver={true}>
              <TouchableWithoutFeedback onPress={this._right}>
                <View style={styles.a_container}>
                  <Text style={[styles.a_text, {color: 'green'}]}>ถูก</Text>
                </View>
              </TouchableWithoutFeedback>
            </Animatable.View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top_bar: {
    height: Metrics.TOP_BAR_HEIGHT,
    backgroundColor: 'white',
    elevation: 2
  },
  btn: {
    width: 40,
    height: 40,
    margin: 8
  },
  pause_btn: {
    margin: 8,
    height: 24,
    width: 24,
  },
  point_text: {
    position: 'absolute',
    right: 16,
    fontFamily: 'sarabun_bold',
    fontSize: 28,
    textAlignVertical: 'center',
    height: Metrics.TOP_BAR_HEIGHT
  },
  time_bar: {
    height: Metrics.TIME_BAR_HEIGHT,
    backgroundColor: 'green'
  },
  board: {
    height: Metrics.BOARD_HEIGHT,
    backgroundColor: BgColor,
    alignItems: 'center'
  },
  q_board: {
    height: Metrics.Q_BOARD_HEIGHT,
    width: Metrics.Q_BOARD_WIDTH,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: Metrics.A_BOARD_HEIGHT * 2.1,
    borderRadius: 5,
    elevation: 4
  },
  q_text: {
    flex: 1,
    fontFamily: 'sarabun_bold',
    fontSize: 64,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  a_board: {
    height: Metrics.A_BOARD_HEIGHT,
    width: Metrics.A_BOARD_WIDTH,
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10
  },
  a_button: {
    height: Metrics.A_BOARD_HEIGHT - 20,
    width: (Metrics.A_BOARD_WIDTH / 2) - 20,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 10,
    elevation: 2
  },
  a_container: {
    flex: 1,
    alignItems: 'center'
  },
  a_text: {
    flex: 1,
    fontFamily: 'sarabun_bold',
    fontSize: 36,
    textAlignVertical: 'center'
  }
})

const text = [
  'สีแดง',
  'สีน้ำเงิน',
  'สีเขียว',
  'สีดำ'
];

const color = [
  'red',
  'blue',
  'green',
  'black'
]
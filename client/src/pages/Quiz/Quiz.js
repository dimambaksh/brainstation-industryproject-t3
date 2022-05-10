import React from "react";
import Question from "../../components/Question/Question";
import { Button } from "@mui/material";
import axios from "axios";
import "./Quiz.css";

const questions = [
  {
    type: "checkbox",
    title: "In the last 10 days, have you experienced any of these symptoms?",
    options: [
      "Fever or chills",
      "Cough or barking cough (croup)",
      "Shortness of breath",
      "Decrease or loss of taste or smell",
      "Muscle aches/joint pain",
      "Extreme tiredness",
      "Sore throat",
      "Runny or stuffy/congested nose",
      "Headache",
      "Nausea, vomiting, and/or diarrhea",
      "None of the above",
    ],
  },
  {
    type: "yes-no",
    title:
      "In the last 14 days, have you travelled outside of Canada and been told to quarantine (per the federal quarantine requirements)?",
    body: "",
  },
  {
    type: "yes-no",
    title:
      "Has a doctor, health care provider, or public health unit told you that you should currently be isolating (staying at home)?",
    body: "This can be because of an outbreak or contact tracing.",
  },
  {
    type: "yes-no",
    title: "In the last 10 days, have you tested positive for COVID-19?",
    body: "This includes a positive COVID-19 test result on a lab-based PCR test, rapid molecular test, rapid antigen test, or home-based self-testing kit.",
  },
  {
    type: "yes-no-bullets",
    title: "Do any of the following apply?",
    upper_title: "You live with someone who is:",
    upper_bullets: [
      "currently isolating because of positive test",
      "currently isolating because of COVID-19 symptoms",
      "currently isolating while waiting for COVID-19 test results",
    ],
    lower_title: `Select "no" if:`,
    lower_bullets: [
      "You are 18 or older and boosted",
      "You are 17 or younger and fully vaccinated",
      "You have completed isolation after testing positive in the last 90 days",
      "Your household member is isolating because of COVID-19 symptoms but has already tested negative on one PCR or rapid molecular test, or two rapid antigen tests",
    ],
  },
];

export default class Quiz extends React.Component {
  state = {
    questionIndex: 0,
    fail: false,
    pass: false,
    question: questions[0],
    reservationId: "",
    reservationDetails: {},
  };

  // Pass all of these questions to earn a checkmark
  getUserReservations = async () => {
    await axios({
      method: "get",
      url: `http://localhost:8080/reserve/${sessionStorage.getItem(
        "loggedIn"
      )}`,
    })
      .then((response) => {
        console.log(response.data.reservations.currentReservations);

        let currentReservation =
          response.data.reservations.currentReservations.filter(
            (reservation) => (reservation.uuid === this.state.reservationId)
          );

        console.log(currentReservation);

        this.setState({
          reservationDetails: currentReservation,
        });
      })
      .catch((error) => {
        //console.error(error);
        alert(`Server Response: User not found.`);
      });
  };

  updateSafetyScreen = async (booleanIn) => {
    await axios({
      method: "put",
      url: `http://localhost:8080/reserve/${this.state.reservationId}`,
      data: {
        safetyScreen: `${booleanIn}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        //console.error(error);
        alert(`Server Response: Reservation not found.`);
      });
  };

  deleteReservation = async () => {
    await axios({
      method: "delete",
      url: `http://localhost:8080/reserve/${this.state.reservationId}`,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        //console.error(error);
        alert(`Server Response: Reservation not found.`);
      });
  };

  componentDidMount() {
    console.log(this.props);
    this.setState(
      { reservationId: this.props.match.params.reservationId },
      this.getUserReservations
    );
  }

  nextQuestion = (aValue) => {
    console.log(`next question: ${aValue}`);
    if (aValue === false) {
      this.setState({ fail: true });
      this.deleteReservation();
    }

    if (aValue === true && this.state.questionIndex < 4) {
      this.setState({
        questionIndex: this.state.questionIndex + 1,
        question: questions[this.state.questionIndex + 1],
      });
    } else if (aValue === true && this.state.questionIndex === 4) {
      //axios update reservation on server to show pass
      //then
      this.updateSafetyScreen(true);
      this.setState({ pass: true, questionIndex: 6 });
    }
  };

  render() {
    return (
      <div className="Quiz">
        {this.state.questionIndex < 5 && this.state.fail === false ? (
          <p className="Quiz__Progress">
            Screening Question {this.state.questionIndex + 1}/5
          </p>
        ) : (
          <></>
        )}

        {/* Fail */}
        {this.state.fail ? (
          <div className="topMargin">
            <h1 className="centered">Your booking has been cancelled</h1>
            <div className="centered extraPadding">
              <svg
                alt="Cancelled icon"
                width="167"
                height="167"
                viewBox="0 0 167 167"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M83.5 0C66.9853 0 50.8414 4.89719 37.1099 14.0723C23.3784 23.2474 12.676 36.2883 6.35609 51.5459C0.0361792 66.8035 -1.6174 83.5926 1.60447 99.79C4.82633 115.987 12.7789 130.866 24.4566 142.543C36.1343 154.221 51.0126 162.174 67.21 165.396C83.4074 168.617 100.196 166.964 115.454 160.644C130.712 154.324 143.753 143.622 152.928 129.89C162.103 116.159 167 100.015 167 83.5C167 72.5346 164.84 61.6766 160.644 51.5459C156.448 41.4152 150.297 32.2103 142.543 24.4566C134.79 16.7029 125.585 10.5523 115.454 6.35606C105.323 2.15979 94.4654 0 83.5 0ZM83.5 150.3C70.2882 150.3 57.3731 146.382 46.3879 139.042C35.4027 131.702 26.8408 121.269 21.7849 109.063C16.7289 96.8571 15.4061 83.4259 17.9836 70.4679C20.5611 57.51 26.9231 45.6074 36.2653 36.2653C45.6074 26.9231 57.5101 20.561 70.468 17.9835C83.4259 15.406 96.8572 16.7289 109.063 21.7848C121.269 26.8408 131.702 35.4027 139.042 46.3879C146.382 57.3731 150.3 70.2882 150.3 83.5C150.3 101.216 143.262 118.207 130.735 130.735C118.207 143.262 101.216 150.3 83.5 150.3Z"
                  fill="#FF5252"
                />
                <path
                  d="M106.128 60.8715C105.352 60.0889 104.429 59.4677 103.411 59.0438C102.393 58.6199 101.302 58.4016 100.2 58.4016C99.0975 58.4016 98.0061 58.6199 96.9886 59.0438C95.971 59.4677 95.0475 60.0889 94.2713 60.8715L83.4998 71.7265L72.7283 60.8715C71.1559 59.2992 69.0234 58.4159 66.7998 58.4159C64.5762 58.4159 62.4436 59.2992 60.8713 60.8715C59.2989 62.4439 58.4156 64.5764 58.4156 66.8C58.4156 69.0236 59.2989 71.1562 60.8713 72.7285L71.7263 83.5L60.8713 94.2715C60.0887 95.0478 59.4675 95.9713 59.0435 96.9888C58.6196 98.0063 58.4014 99.0977 58.4014 100.2C58.4014 101.302 58.6196 102.394 59.0435 103.411C59.4675 104.429 60.0887 105.352 60.8713 106.129C61.6475 106.911 62.571 107.532 63.5886 107.956C64.6061 108.38 65.6975 108.598 66.7998 108.598C67.9021 108.598 68.9935 108.38 70.011 107.956C71.0285 107.532 71.952 106.911 72.7283 106.129L83.4998 95.2735L94.2713 106.129C95.0475 106.911 95.971 107.532 96.9886 107.956C98.0061 108.38 99.0975 108.598 100.2 108.598C101.302 108.598 102.393 108.38 103.411 107.956C104.429 107.532 105.352 106.911 106.128 106.129C106.911 105.352 107.532 104.429 107.956 103.411C108.38 102.394 108.598 101.302 108.598 100.2C108.598 99.0977 108.38 98.0063 107.956 96.9888C107.532 95.9713 106.911 95.0478 106.128 94.2715L95.2733 83.5L106.128 72.7285C106.911 71.9523 107.532 71.0288 107.956 70.0112C108.38 68.9937 108.598 67.9023 108.598 66.8C108.598 65.6977 108.38 64.6063 107.956 63.5888C107.532 62.5713 106.911 61.6478 106.128 60.8715Z"
                  fill="#FF5252"
                />
              </svg>
            </div>
            <h3>
              We are unable to confirm your desk booking due to one or more of
              the following reasons:
            </h3>
            <ul>
              <li>You are exhibiting symptoms of COVID-19</li>
              <li>You have tested positive for COVID-19</li>
              <li>
                You have been in close contact with somone who has tested
                positive for COVID-19 or is exhibiting symptoms
              </li>
            </ul>
            <h3>
              Please contact your local health authority and self-isolate for 10
              days before making another booking.
            </h3>
            <div className="ButtonFlex">
              <Button href="/" variant="contained">
                Cancel reservation
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* Pass */}
        {this.state.pass ? (
          <div className="topMargin">
            <h1 className="centered">Health Screening Passed!</h1>
            <div className="centered extraPadding">
              <svg
                alt="checkmark icon"
                width="158"
                height="158"
                viewBox="0 0 158 158"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M60.8818 73.5867C59.3904 72.1032 57.3676 71.2698 55.2584 71.2698C53.1492 71.2698 51.1264 72.1032 49.635 73.5867C48.1435 75.0703 47.3057 77.0824 47.3057 79.1805C47.3057 81.2785 48.1435 83.2906 49.635 84.7742L73.396 108.41C74.1361 109.14 75.0138 109.717 75.9788 110.109C76.9437 110.502 77.977 110.7 79.0194 110.694C80.1037 110.66 81.1694 110.405 82.1503 109.944C83.1313 109.483 84.0066 108.827 84.7221 108.016L140.164 44.9879C141.445 43.4069 142.062 41.3954 141.887 39.3728C141.713 37.3502 140.761 35.4726 139.228 34.1315C137.696 32.7904 135.703 32.0893 133.664 32.1744C131.625 32.2595 129.698 33.1243 128.284 34.5884L79.0194 91.3133L60.8818 73.5867Z"
                  fill="#0FA958"
                />
                <path
                  d="M150.079 71.1C147.979 71.1 145.964 71.9323 144.479 73.4139C142.993 74.8954 142.159 76.9048 142.159 79C142.159 95.7617 135.483 111.837 123.6 123.689C111.717 135.541 95.5996 142.2 78.7943 142.2C66.2805 142.194 54.0485 138.493 43.6409 131.563C33.2333 124.633 25.116 114.784 20.3126 103.259C15.5092 91.7339 14.2348 79.0482 16.6502 66.8015C19.0655 54.5549 25.0624 43.2958 33.8846 34.444C39.7514 28.5141 46.7451 23.8109 54.4564 20.6096C62.1677 17.4083 70.4417 15.7732 78.7943 15.8C83.8591 15.8316 88.9053 16.4144 93.8434 17.538C94.8767 17.8568 95.9646 17.9611 97.04 17.8445C98.1153 17.7279 99.1553 17.3929 100.096 16.86C101.036 16.3272 101.858 15.6078 102.509 14.7463C103.16 13.8848 103.627 12.8994 103.882 11.8509C104.136 10.8024 104.173 9.71291 103.99 8.64971C103.806 7.5865 103.406 6.57208 102.814 5.66897C102.222 4.76587 101.451 3.99322 100.549 3.39867C99.6462 2.80412 98.6311 2.40026 97.566 2.212C91.4129 0.768217 85.1153 0.0261287 78.7943 0C63.1459 0.0810819 47.8723 4.78361 34.9008 13.5142C21.9294 22.2447 11.8415 34.612 5.91013 49.0553C-0.0212073 63.4986 -1.53015 79.3707 1.57374 94.6685C4.67762 109.966 12.2552 124.004 23.3503 135.011C38.0563 149.686 57.9921 157.952 78.7943 158C99.8009 158 119.947 149.677 134.801 134.861C149.655 120.046 158 99.9521 158 79C158 76.9048 157.166 74.8954 155.68 73.4139C154.195 71.9323 152.18 71.1 150.079 71.1Z"
                  fill="#0FA958"
                />
              </svg>
            </div>
            <h3 className="centered">
              Your desk booking for {this.state.reservationDetails[0].desk.split("-")[0]} on {this.state.reservationDetails[0].reservationdate} is confirmed
            </h3>
            <div className="extraPadding">
              <h4>Health and Safety Tips</h4>
              <ul>
                <li>
                  Keep a distance of at least 2 metres from people you do not
                  live with
                </li>
                <li>
                  Make sure you wear a face covering or mask while indoors (and
                  outdoors when you cannot physically distance) and that it
                  covers your mouth, nose, and chin
                </li>
              </ul>
            </div>
            <div className="ButtonFlex">
              <Button href="/" variant="contained">
                Return to Home
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* Run through quiz questions*/}
        {!this.state.fail && !this.state.pass ? (
          <Question
            question={this.state.question}
            listener={this.nextQuestion}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

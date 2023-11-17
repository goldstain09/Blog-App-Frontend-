import { fork } from "redux-saga/effects";
import { postSaga } from "./PostSaga";
import { userSaga } from "./UserSaga";

function* rootSaga() {
  // yield fork(postSaga);
  yield fork(userSaga);
}

export { rootSaga };

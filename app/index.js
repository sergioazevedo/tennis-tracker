import GameUI from "./game-ui";
import Match from "./match";
import permissionHelper from "./permission-helper";
import { me as appbit } from "appbit";
import exercise from "exercise";

const runApp = (match) => {
  // prevents the app to be killed after 2 min of inactivity
  appbit.appTimeoutEnabled = false;

  if (permissionHelper.exerciseAvailable) {
    exercise.start("tennis", { gps: false });
    // ensure that the exercise will be finished before the app closes
    appbit.addEventListener('unload', () => {
      if (exercise.state == "started") {
        exercise.stop();
      }
    })
  };

  new GameUI(match);
}

const currentMatch = new Match();
runApp(currentMatch);

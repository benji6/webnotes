import { Paper, ShareButton } from "eri";
import {
  BUILD_TIME,
  GH_USER_URL,
  REPO_ISSUES_URL,
  REPO_URL,
} from "../../constants";
import { formatDistanceToNow } from "date-fns";

export default function About() {
  return (
    <Paper.Group>
      <Paper>
        <h2>About</h2>
        <p>
          Webnotes is a free and open source web app that lets you create and
          manage notes. It&apos;s simple to use, works offline and because it
          runs in your browser you can use it across all your devices!
        </p>
        <p>
          You can find the source code{" "}
          <a href={REPO_URL} rel="noopener noreferrer" target="_blank">
            here
          </a>{" "}
          and if you have any ideas, feedback or bugs you can raise them{" "}
          <a href={REPO_ISSUES_URL} rel="noopener noreferrer" target="_blank">
            here
          </a>
          .
        </p>
        <p>
          The UI was put together using a component library I built called{" "}
          <a
            href={`${GH_USER_URL}/eri`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Eri
          </a>
          .
        </p>
        <p>
          The version you&apos;re currently using was last updated{" "}
          <b>{formatDistanceToNow(new Date(BUILD_TIME))} ago</b>.
        </p>
        <p>I hope you enjoy the app 🙂</p>
        <ShareButton />
      </Paper>
    </Paper.Group>
  );
}

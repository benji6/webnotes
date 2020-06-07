import { RouteComponentProps } from "@reach/router";
import { Paper } from "eri";
import * as React from "react";

export default function SeeAlso(_: RouteComponentProps) {
  return (
    <Paper.Group>
      <Paper>
        <h2>See also</h2>
        <p>
          <a
            href="https://meditation-timer.link"
            rel="noopener"
            target="_blank"
          >
            Meditate
          </a>{" "}
          is a free and open source web app that allows you to time your
          meditations. It's simple to use, works offline and aims to be the
          perfect aide for your meditation practice!
        </p>
      </Paper>
    </Paper.Group>
  );
}

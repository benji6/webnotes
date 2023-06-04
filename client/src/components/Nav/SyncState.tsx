import { Icon, Spinner } from "eri";
import * as React from "react";
import { StateContext } from "../AppState";

export default function SyncState() {
  const {
    isSyncingFromServer,
    isSyncingToServer,
    syncFromServerError,
    syncToServerError,
  } = React.useContext(StateContext);

  return (
    <div className="w-nav__sync-state">
      <p className="center">
        {syncFromServerError || syncToServerError ? (
          <>
            Data saved locally
            <Icon draw margin="start" name="save" />
          </>
        ) : isSyncingFromServer ? (
          isSyncingToServer ? (
            <>
              Syncing
              <Spinner inline margin="start" />
            </>
          ) : (
            <>
              Syncing from server
              <Spinner inline margin="start" />
            </>
          )
        ) : isSyncingToServer ? (
          <>
            Syncing to server
            <Spinner inline margin="start" />
          </>
        ) : (
          <>
            Synced with server
            <Icon draw margin="start" name="check" />
          </>
        )}
      </p>
      <hr />
    </div>
  );
}

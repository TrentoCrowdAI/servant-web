import React from "react";
import {Card, ProgressBar} from "react-bootstrap";

import ResultDownloader from "./ResultDownloader";
import LoadingButton from "../../../../../common/LoadingButton";
import "./RunsControls.css";

export default (props) => (
  <div>
    {
      !props.readOnly &&
      <ExecutionCard {...props}/>
    }

    <ResultsCard {...props}/>
  </div>
);

const ExecutionCard = ({runnable, downloadLinkFactory, onStart, isStarting, startText}) => (
  <Card>
    <Card.Header>Execution</Card.Header>

    <Card.Body>
      {
        runnable.isRunning() &&
        <div>
          Workflow is currently running (run #{runnable.getLatestRun().getRunId()}).<br/>
          Progress:<br/>
          <RunsProgressBar runnable={runnable}/>
        </div>
      }

      <LoadingButton block onClick={onStart}
                     disabled={!runnable.canStart()}
                     isLoading={isStarting}>{startText}</LoadingButton>

    </Card.Body>
  </Card>
);

const ResultsCard = ({runnable, downloadLinkFactory, downloadNameFactory}) => (
  <Card className="mt-2">
    <Card.Header>Results</Card.Header>
    <Card.Body>
      <ResultDownloader downloadLinkFactory={downloadLinkFactory}
                        downloadNameFactory={downloadNameFactory}
                        runnable={runnable}/>
    </Card.Body>
  </Card>
);

const RunsProgressBar = ({runnable}) => {
  const finishedPercentage = Math.ceil(runnable.getFinishedBlocksCount() / runnable.getRunnableBlocksCount() * 100);
  const runningPercentage = Math.ceil(runnable.getRunningBlocksCount() / runnable.getRunnableBlocksCount() * 100);
  return (
    <div>
      <ProgressBar className="progress-bars-container">
        <ProgressBar animated variant="primary" now={Math.max(1, finishedPercentage)} key={1}/>
        <ProgressBar animated variant="success" now={runningPercentage} key={2}/>
      </ProgressBar>

      {/* Legend */}
      <div className="progress-bar-legend">
        <div className="legend-item">
          <div className="progress-bar-sample progress-bar bg-primary progress-bar-striped"/>
          Finished blocks
        </div>
        <div className="legend-item">
          <div className="progress-bar-sample progress-bar bg-success progress-bar-striped"/>
          Running blocks
        </div>
      </div>
    </div>
  );
};

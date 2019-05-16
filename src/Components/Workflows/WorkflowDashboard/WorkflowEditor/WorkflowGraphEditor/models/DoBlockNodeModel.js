import {BlockNodeModel} from "./BlockNodeModel";
import {RunStates} from "../../../../../../models/BlockRun";

const {FAILED, RUNNING, FINISHED} = RunStates;

export class DoBlockNodeModel extends BlockNodeModel {


  setRuns(runs) {
    this._runs = runs;
    this.latestBlockRun = runs.getLatestRun() ? new DoBlockRunAdapter(runs.getLatestRun(), this.getId()) : null;
    this.blockRuns = DoBlockRunAdapter.adaptRuns(runs, this.getId());
  }

}


class DoBlockRunAdapter {

  blockId;
  publishRun;
  waitRun;

  constructor(run, blockId) {
    this.blockId = blockId;
    this.publishRun = run.getBlockRun(blockId);
    this.waitRun = run.getBlockRun(`${blockId}_wait`);
  }

  static adaptRuns (runs, blockId) {
    return runs.runs.map(run => new DoBlockRunAdapter(run, blockId));
  }

  getBlockId = () => this.blockId;

  getRunId = () => this.publishRun.getRunId();

  getCacheId = () => this.publishRun.getCacheId();

  isRunning = () => this.publishRun.getState() === RUNNING || this.waitRun.getState() === RUNNING;

  isFailed = () => this.publishRun.getState() === FAILED || this.waitRun.getState() === FAILED;

  isFinished = () => this.publishRun.getState() === FINISHED && this.waitRun.getState() === FINISHED;

}


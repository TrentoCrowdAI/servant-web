import {getJSON, postJSON, putJSON, sendDelete} from "./utils";
import {APP_URL} from "../config";


const WORKFLOWS_URL = `${APP_URL}/workflows`;

export const Errors = {
  INVALID_WORKFLOW_DATA: 'invalid_workflow_data'
};

const JSONtoWorkflow = ({id, id_project, data}) => {
  const workflow = {
    id,
    projectId: parseInt(id_project),
    ...data
  };

  if (workflow.graph) {
    workflow.graph.nodes.forEach(node => {
      node.type = node.nodeType;
      delete node.nodeType;
      return node;
    });
  }
  return workflow;
};


const workflowToJSON = ({id, projectId, name, description, graph}) => {
  const json = {
    id,
    id_project: projectId,
    data: {
      name,
      description,
    }
  };

  if (graph) {
    json.data.graph = {...graph};
    json.data.graph.nodes = json.data.graph.nodes.map(node => {
      const jsonNode = {
        ...node,
        nodeType: node.type
      };
      delete jsonNode.type;
      return jsonNode;
    });
  }

  return json;
};


export default {
  async getWorkflowsOfProject(project) {
    const jsonList = await getJSON(`${WORKFLOWS_URL}?projectId=${project.id}`);
    return jsonList.map(JSONtoWorkflow);
  },

  async getWorkflow(id) {
    const workflow = await getJSON(`${WORKFLOWS_URL}/${id}`);
    return JSONtoWorkflow(workflow);
  },

  async createWorkflow(workflow) {
    const json = workflowToJSON(workflow);
    return await postJSON(WORKFLOWS_URL, json);
  },

  async updateWorkflow(workflow) {
    try {
      const json = workflowToJSON(workflow);
      console.info('[WorkflowService] updateWorkflow', json);
      return await putJSON(`${WORKFLOWS_URL}/${workflow.id}`, json);
    } catch (e) {
      if (e.response === 400) {
        throw new Error(Errors.INVALID_WORKFLOW_DATA);
      } else {
        throw e;
      }
    }
  },

  async deleteWorkflow(workflow) {
    return await sendDelete(`${WORKFLOWS_URL}/${workflow.id}`);
  },

  async startWorkflow(workflow) {
    const res = await postJSON(`${WORKFLOWS_URL}/${workflow.id}/start`);
    console.log('[WorkflowService] startWorkflow result:', res);
  }

}

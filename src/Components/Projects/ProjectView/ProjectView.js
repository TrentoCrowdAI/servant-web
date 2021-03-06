import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Breadcrumb, Col, Container, Row, Tab, Tabs} from "react-bootstrap";

import {LinkBreadcrumb, SimpleBreadcrumb} from "../../common/Breadcrumbs";
import ProjectsService from "../../../Services/rest/ProjectsService";
import {makeCancellable} from "../../../Services/rest/utils";
import {redirectToProjectsList} from "../utils/route";
import {PROJECTS_PATH} from "../Projects";
import EmbeddableWorkflowsList from "../../Workflows/WorkflowsList/EmbeddableWorkflowsList";
import {ItemsView} from "../../Items/ItemsView/ItemsView";
import LoadingContainer from "../../common/LoadingContainer";


export default class ProjectView extends Component {

  state = {};

  componentDidMount = () => this.fetchProject();

  componentWillUnmount = () => this.pendingProjectRequest.cancel();

  async fetchProject() {
    const id = this.props.match.params.id;

    try {
      this.pendingProjectRequest = makeCancellable(ProjectsService.getProject(id));
      const project = await this.pendingProjectRequest.result;

      this.setState({project});
    } catch (e) {
      redirectToProjectsList(this);
    }
  }

  render() {
    return (
      <Container>
        <Breadcrumb>
          <LinkBreadcrumb to={PROJECTS_PATH}>Projects</LinkBreadcrumb>
          <SimpleBreadcrumb>
            {this.state.project ? this.state.project.data.name : '...'}
          </SimpleBreadcrumb>
        </Breadcrumb>

        <LoadingContainer loading={!this.state.project}>
            <Row>
              <ProjectData project={this.state.project}/>

              <div style={{width: '100%'}}>
                <hr/>

                <Tabs defaultActiveKey="workflow">
                  <Tab eventKey="workflow" title="Workflows">
                    <EmbeddableWorkflowsList project={this.state.project}/>
                  </Tab>

                  <Tab eventKey="items" title="Items">
                    <ItemsView project={this.state.project}/>
                  </Tab>
                </Tabs>
              </div>
            </Row>
        </LoadingContainer>

      </Container>
    );
  }
}

function ProjectData({project}) {
  return (
    <Container>
      <Row className="header-row">
        <Col>
          <h2>{project.data.name}</h2>
        </Col>
        <Col className="d-flex flex-row-reverse">
          <div>
            <Link to={`${PROJECTS_PATH}/${project.id}/edit`} className="btn btn-primary">Edit</Link>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>{project.data.description}</Col>
      </Row>
    </Container>
  );
}


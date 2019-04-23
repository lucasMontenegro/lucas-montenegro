import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import { LinkContainer } from 'react-router-bootstrap';

export const PureProjectsDropDown = ({ t }) => (
  <Dropdown>
    <Dropdown.Toggle id="my-projects-dropdown">
      {t('myProjects.title')}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <LinkContainer key="todo" exact to="/todo">
        <Dropdown.Item>
          {t('myProjects.apps.todo.title')}
        </Dropdown.Item>
      </LinkContainer>
      <LinkContainer key="json-editor" exact to="/json-editor">
        <Dropdown.Item>
          {t('myProjects.apps.jsonEditor.title')}
        </Dropdown.Item>
      </LinkContainer>
    </Dropdown.Menu>
  </Dropdown>
);

export const LazyProjectsDropDown = () => {
  const { t } = useTranslation();
  return <PureProjectsDropDown t={t} />;
}

const ProjectsDropDown = () => (
  <Suspense fallback={<span>...</span>}>
    <LazyProjectsDropDown />
  </Suspense>
);

export default ProjectsDropDown;

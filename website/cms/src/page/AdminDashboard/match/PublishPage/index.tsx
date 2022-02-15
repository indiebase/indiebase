import '@/components/Wysiwyg';
import { PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import {
  SurveyCreator,
  TabbedMenuComponent,
  SurveyCreatorComponent,
} from 'survey-creator-react';
import 'survey-creator-react/survey-creator-react.min.css';

export const PublishPage = function (props) {
  const [content, setContent] = useState('');

  const options = {
    showLogicTab: true,
    showTranslationTab: true,
    isAutoSave: true,
  };

  const creator = new SurveyCreator(options);
  console.log(creator);

  return (
    <PageContainer>
      <SurveyCreatorComponent creator={creator} />
    </PageContainer>
  );
};

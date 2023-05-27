import React, { useReducer, FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/layout';
import './App.css';
import { DarkTheme } from './ux/theme';
import { AppContext, ApplicationState, getDefaultState } from './models/applicationState';
import appReducer from './reducers';
import { TodoContext } from './components/todoContext';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { ThemeProvider } from '@fluentui/react';
import Telemetry from './components/telemetry';

import { datadogRum } from '@datadog/browser-rum';

import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '223fa8ce-0bf7-4c05-b305-70c0d3d7e736',
    clientToken: 'pubeb3b240651ac1d9a19858e865d7a23f4',
    site: 'datadoghq.com',
    service:'todolist',
    env:'test',
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel:'allow',
    allowedTracingUrls: ["https://app-web-geqfqepl66kso.azurewebsites.net","https://app-api-geqfqepl66kso.azurewebsites.net"]
});
    
datadogRum.startSessionReplayRecording();

export const App: FC = () => {
  const defaultState: ApplicationState = getDefaultState();
  const [applicationState, dispatch] = useReducer(appReducer, defaultState);
  const initialContext: AppContext = { state: applicationState, dispatch: dispatch }

  initializeIcons();

  return (
    <ThemeProvider applyTo="body" theme={DarkTheme}>
      <TodoContext.Provider value={initialContext}>
        <BrowserRouter>
          <Telemetry>
            <Layout />
          </Telemetry>
        </BrowserRouter>
      </TodoContext.Provider>
    </ThemeProvider>
  );
};

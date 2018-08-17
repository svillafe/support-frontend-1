// @flow

// ----- Imports ----- //

import { routes } from 'helpers/routes';
import * as cookie from 'helpers/cookie';
import { getSession } from 'helpers/storage';

import { userActions } from './userActions';


// ----- Functions ----- //

const init = (dispatch: Function) => {

  const windowHasUser = window.guardian && window.guardian.user;
  const userAppearsLoggedIn = cookie.get('GU_U');

  const uatMode = window.guardian && window.guardian.uatMode;

  function getEmailFromBrowser(): ?string {
    if (window.guardian && window.guardian.email) {
      return window.guardian.email;
    }
    return getSession('gu.email');
  }

  const emailFromBrowser = getEmailFromBrowser();

  const isUndefinedOrNull = x => x === null || x === undefined;

  const testUserCondition = (isUndefinedOrNull(uatMode) && cookie.get('_test_username')) || uatMode;

  if (testUserCondition) {
    dispatch(setTestUser(true));
  }

  if (testUserCondition && cookie.get('_post_deploy_user')) {
    dispatch(setPostDeploymentTestUser(true));
  }

  if (windowHasUser) {
    dispatch(userActions().setId(window.guardian.user.id));
    dispatch(userActions().setEmail(window.guardian.user.email));
    dispatch(userActions().setDisplayName(window.guardian.user.displayName));
    dispatch(userActions().setFirstName(window.guardian.user.firstName));
    dispatch(userActions().setLastName(window.guardian.user.lastName));
    dispatch(userActions().setFullName(`${window.guardian.user.firstName} ${window.guardian.user.lastName}`));
    dispatch(userActions().setIsSignedIn(true));
  } else if (userAppearsLoggedIn) {
    fetch(routes.oneOffContribAutofill, { credentials: 'include' }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          if (data.id) {
            dispatch(userActions().setIsSignedIn(true));
            dispatch(userActions().setId(data.id));
          }
          if (data.name) {
            dispatch(userActions().setFullName(data.name));
          }
          if (data.email) {
            dispatch(userActions().setEmail(data.email));
          }
          if (data.displayName) {
            dispatch(userActions().setDisplayName(data.displayName));
          }
        });
      }
    });
  } else if (emailFromBrowser) {
    dispatch(userActions().setEmail(emailFromBrowser));
  }
};


// ----- Exports ----- //

export { init };

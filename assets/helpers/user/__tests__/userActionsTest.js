// @flow
import { userActions } from '../userActions';


describe('actions', () => {

  it('should create SET_DISPLAY_NAME action', () => {
    const name: string = 'My Name';
    const expectedAction = {
      type: 'SET_DISPLAY_NAME',
      name,
    };
    expect(userActions().setDisplayName(name)).toEqual(expectedAction);
  });

  it('should create SET_FIRST_NAME action', () => {
    const name: string = 'John';
    const expectedAction = {
      type: 'SET_FIRST_NAME',
      name,
    };
    expect(userActions().setFirstName(name)).toEqual(expectedAction);
  });

  it('should create SET_LAST_NAME action', () => {
    const name: string = 'Doe';
    const expectedAction = {
      type: 'SET_LAST_NAME',
      name,
    };
    expect(userActions().setLastName(name)).toEqual(expectedAction);
  });

  it('should create SET_FULL_NAME action', () => {
    const name: string = 'John Doe';
    const expectedAction = {
      type: 'SET_FULL_NAME',
      name,
    };
    expect(userActions().setFullName(name)).toEqual(expectedAction);
  });

  it('should create SET_EMAIL action', () => {
    const email: string = 'johndoe@example.com';
    const expectedAction = {
      type: 'SET_EMAIL',
      email,
    };
    expect(userActions().setEmail(email)).toEqual(expectedAction);
  });

  it('should create SET_STATEFIELD action', () => {
    const stateField: string = 'CA';
    const expectedAction = {
      type: 'SET_STATEFIELD',
      stateField,
    };
    expect(userActions().setStateField(stateField)).toEqual(expectedAction);
  });

  it('should create SET_TEST_USER action', () => {
    const testUser: boolean = true;
    const expectedAction = {
      type: 'SET_TEST_USER',
      testUser,
    };
    expect(userActions().setTestUser(testUser)).toEqual(expectedAction);
  });

  it('should create SET_POST_DEPLOYMENT_TEST_USER action', () => {
    const postDeploymentTestUser: boolean = true;
    const expectedAction = {
      type: 'SET_POST_DEPLOYMENT_TEST_USER',
      postDeploymentTestUser,
    };
    expect(userActions().setPostDeploymentTestUser(postDeploymentTestUser)).toEqual(expectedAction);
  });

  it('should create SET_GNM_MARKETING action', () => {
    const preference: boolean = false;
    const expectedAction = {
      type: 'SET_GNM_MARKETING',
      preference,
    };
    expect(userActions().setGnmMarketing(preference)).toEqual(expectedAction);
  });

  it('should create SET_IS_SIGNED_IN action', () => {
    const isSignedIn: boolean = true;
    const expectedAction = {
      type: 'SET_IS_SIGNED_IN',
      isSignedIn,
    };
    expect(userActions().setIsSignedIn(isSignedIn)).toEqual(expectedAction);
  });
});

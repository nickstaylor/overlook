import domUpdates from '../src/domUpdates';
import {
  expect
} from 'chai';
const chai = require('chai'),
  spies = require('chai-spies');

chai.use(spies);

describe('domUpdates', function() {

  let message;
  let showPage;
  let hidePage;
  let user;
  let users;
  let specificUser;
  let manager;
  let availRooms;
  let todaysRevenue;
  let todayforDisplay;
  let date;
  let room;
  let roomsAvail;

  this.beforeEach(function() {
    message = ""
    showPage = 'element'
    hidePage = 'element'
    user = {};
    room = {}
    users = [user];
    specificUser = {};
    manager = {};
    availRooms = [];
    roomsAvail = [room];
    todayforDisplay = "Apr 21st 2020"
    date = "2020/04/21";
    todaysRevenue = 458.16;

  })

  afterEach(function() {
    chai.spy.restore(domUpdates)
  });

  it('Should test if togglePage was invoked', function() {
    chai.spy.on(domUpdates, 'togglePage', ()  => {});
    domUpdates.togglePage(showPage, hidePage);
    expect(domUpdates.togglePage).to.have.been.called(1);
  });

  it('Should test if displayLoginError was invoked', function() {
    chai.spy.on(domUpdates, 'displayLoginError', () => {});
    domUpdates.displayLoginError(message);
    expect(domUpdates.displayLoginError).to.have.been.called(1);
  });

  it('Should test if displayUserBookings was invoked', function() {
    chai.spy.on(domUpdates, 'displayUserBookings', () => {});
    domUpdates.displayUserBookings(user, manager);
    expect(domUpdates.displayUserBookings).to.have.been.called(1);
    expect(domUpdates.displayUserBookings).to.have.been.called.with.exactly(user, manager);
  });

  it('Should test if hideUserSearch was invoked', function() {
    chai.spy.on(domUpdates, 'hideUserSearch', () => {});
    domUpdates.hideUserSearch();
    expect(domUpdates.hideUserSearch).to.have.been.called(1);
  });

  it('Should test if displayManagerTodayInformation was invoked', function() {
    chai.spy.on(domUpdates, 'displayManagerTodayInformation', () => {});
    domUpdates.displayManagerTodayInformation(availRooms, todaysRevenue, todayforDisplay);
    expect(domUpdates.displayManagerTodayInformation).to.have.been.called(1);
    expect(domUpdates.displayManagerTodayInformation).to.have.been.called.with.exactly(availRooms, todaysRevenue, todayforDisplay);
  });

  it('Should test if missingDateErrorMessage was invoked', function() {
    chai.spy.on(domUpdates, 'missingDateErrorMessage', () => {});
    domUpdates.missingDateErrorMessage();
    expect(domUpdates.missingDateErrorMessage).to.have.been.called(1);
  });

  it('Should test if displayRoomsAvail was invoked', function() {
    chai.spy.on(domUpdates, 'displayRoomsAvail', () => {});
    domUpdates.displayRoomsAvail(date, roomsAvail, manager);
    expect(domUpdates.displayRoomsAvail).to.have.been.called(1);
    expect(domUpdates.displayRoomsAvail).to.have.been.called.with.exactly(date, roomsAvail, manager);

  });

  it('Should test if displayNeedUser was invoked', function() {
    chai.spy.on(domUpdates, 'displayNeedUser', () => {});
    domUpdates.displayNeedUser();
    expect(domUpdates.displayNeedUser).to.have.been.called(1);
  });

  it('Should test if noDeleteAlert was invoked', function() {
    chai.spy.on(domUpdates, 'noDeleteAlert', () => {});
    domUpdates.noDeleteAlert();
    expect(domUpdates.noDeleteAlert).to.have.been.called(1);
  });

  it('Should test if loadUsers was invoked', function() {
    chai.spy.on(domUpdates, 'loadUsers', () => {});
    domUpdates.loadUsers(users);
    expect(domUpdates.loadUsers).to.have.been.called(1);
    expect(domUpdates.loadUsers).to.have.been.called.with.exactly(users);
  });

  it('Should test if futureDateAlert was invoked', function() {
    chai.spy.on(domUpdates, 'futureDateAlert', () => {});
    domUpdates.futureDateAlert();
    expect(domUpdates.futureDateAlert).to.have.been.called(1);
  });

  it('Should test if displayUserForManager was invoked', function() {
    chai.spy.on(domUpdates, 'displayUserForManager', () => {});
    domUpdates.displayUserForManager(specificUser);
    expect(domUpdates.displayUserForManager).to.have.been.called(1);
      expect(domUpdates.displayUserForManager).to.have.been.called.with.exactly(specificUser);
  });

  it('Should test if reloadUsers was invoked', function() {
    chai.spy.on(domUpdates, 'reloadUsers', () => {});
    domUpdates.reloadUsers(users);
    expect(domUpdates.reloadUsers).to.have.been.called(1);
    expect(domUpdates.reloadUsers).to.have.been.called.with.exactly(users);
  });

});

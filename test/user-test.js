import chai from 'chai';
const expect = chai.expect;

// const spies = require('chai-spies');
// chai.use(spies);

import User from '../src/User';
// import Bookings from '../src/Bookings'
import Hotel from '../src/Hotel'
// import Booking from '../src/Booking'

describe ('User', function() {
    let user;
    let bookings;
    let hotelRooms;

    beforeEach(function() {
      // chai.spy.on(domUpdates, ['displaySidebarInfo', 'displayFriendList'], () => true);
      hotelRooms = [{
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4
      },
      { number: 4,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 429.44
      },
      { number: 6,
        roomType: "junior suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 397.02,
      }]

    bookings = [{
      id: "5fwrgu4i7k55hl6xm",
      userID: 23,
      date: "2020/02/16",
      roomNumber: 4,
      roomService: []
    },
    {
      id: "5fwrgu4i7k55hl6z6",
      userID: 23,
      date: "2020/02/05",
      roomNumber: 6,
      roomService: []
    }]

  user = new User({
    id: 23,
    name: "Angus Swift"
  }, bookings, hotelRooms);
})

it('should be a function', function() {
      expect(User).to.be.a("function")
    });


it('should be an instance of User', function() {
  expect(user).to.be.an.instanceof(User);
});

it('should take in a user id', function(){
  expect(user.id).to.eq(23)
});

it('should have a name', function(){
  expect(user.name).to.eq("Angus Swift")
});

it('should have an array of bookings', function(){
  expect(user.myBookings).to.deep.eq([
  {
    id: "5fwrgu4i7k55hl6xm",
    userID: 23,
    date: "2020/02/16",
    roomNumber: 4,
    roomService: []
  },
  {
    id: "5fwrgu4i7k55hl6z6",
    userID: 23,
    date: "2020/02/05",
    roomNumber: 6,
    roomService: []
  }])
  console.log(user.myBookings);
});

it('should caclulate total spent on rooms', function(){
  user.totalSpentAtHotel(hotelRooms)
  expect(user.totalSpent).to.eq(826.46)

})


})

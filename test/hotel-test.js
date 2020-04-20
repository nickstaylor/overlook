import chai from 'chai';
const expect = chai.expect;
// const spies = require('chai-spies');
// chai.use(spies);

import Hotel from '../src/Hotel.js';
import Room from '../src/Room.js';
import Booking from '../src/Booking.js';


describe('Hotel', function(){
  let hotel;
  let date;
  let id;
  let room1
  let room2
  let room3
  let booking1
  let booking2
  let booking3


  beforeEach(function(){

    hotel = new Hotel()
    date = "2020/02/11"
    id = 42
    room1 = new Room({
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
    })
    room2 = new Room ({
      number: 2,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38
    })
    room3 = new Room ({
      number: 3,
      roomType: "single room",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 491.14
    })
    booking1 = new Booking({
      id: "5fwrgu4i7k55hl7f7",
      userID: 42,
      date: "2020/02/11",
      roomNumber: 2,
      roomService: []
    })
    booking2 = new Booking({
      id: "5fwrgu4i7k55hl7g9",
      userID: 42,
      date: "2020/02/16",
      roomNumber: 3,
      roomService: []
    })
    booking3 = new Booking({
      id: "5fwrgu4i7k55hl6u3",
      userID: 24,
      date: "2020/02/11",
      roomNumber: 3,
      roomService: []
    })

})

it('should be a function', function(){
  expect(Hotel).to.be.a("function")
});

it('should instantiate our friend, the hotel', function(){
  expect(hotel).to.be.an.instanceof(Hotel);
})

it('should be able to hold a room', function(){
  hotel.allRooms.push(room1)
  expect(hotel.allRooms).to.deep.eq([room1]);
})

it('should be able to hold multiple rooms', function(){
  hotel.allRooms.push(room1)
  expect(hotel.allRooms).to.deep.eq([room1]);
  hotel.allRooms.push(room2, room3)
  expect(hotel.allRooms).to.deep.eq([room1, room2, room3]);
})

it('should also be able to hold a booking', function(){
  hotel.allBookings.push(booking1)
  expect(hotel.allBookings).to.deep.eq([booking1]);
})

it('should be able to hold multiple bookings', function(){
  hotel.allBookings.push(booking1, booking2, booking3)
  expect(hotel.allBookings).to.deep.eq([booking1, booking2, booking3]);
})

describe('Hotel Methods', function(){

it('should be able to filter bookings by user ID', function(){
  hotel.allBookings.push(booking1, booking2, booking3)
  let userBookings = hotel.checkUserBookings(id)
  expect(userBookings).to.deep.eq([{
    id: "5fwrgu4i7k55hl7f7",
    userID: 42,
    date: "2020/02/11",
    roomNumber: 2,
    roomService: undefined
  },
  {
    id: "5fwrgu4i7k55hl7g9",
    userID: 42,
    date: "2020/02/16",
    roomNumber: 3,
    roomService: undefined
  }])
})

it('should be able to check rooms available for a given date', function(){
  hotel.allRooms.push(room1, room2, room3)
  hotel.allBookings.push(booking1, booking2, booking3)
  let availRooms = hotel.checkRoomsAvailableForDay(date)
  expect(availRooms).to.eq(1)
})

it('should be able to get all bookings for a given date', function(){
  hotel.allRooms.push(room1, room2, room3)
  hotel.allBookings.push(booking1, booking2, booking3)
  let roomsBooked = hotel.getTodaysBookings(date)
  expect(roomsBooked).to.deep.eq([{
    id: "5fwrgu4i7k55hl7f7",
    userID: 42,
    date: "2020/02/11",
    roomNumber: 2,
    roomService: undefined
  },
  {
    id: "5fwrgu4i7k55hl6u3",
    userID: 24,
    date: "2020/02/11",
    roomNumber: 3,
    roomService: undefined
  }
  ])
})

it('should be able to caclulate revenue for a given day', function(){
  hotel.allRooms.push(room1, room2, room3)
  hotel.allBookings.push(booking1, booking2, booking3)
  let dailyRevenue = hotel.calculateRevenueForDay(date)
  expect(dailyRevenue).to.eq(968.52)
})

})
});

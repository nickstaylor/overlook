// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import $ from 'jquery';
import moment from 'moment';

// import './css/style.scss';
import './css/base.scss';
import Room from './Room.js';
import Manager from './Manager.js';
import User from './User.js';
import Booking from './Booking.js';
import Hotel from './Hotel';
import domUpdates from './domUpdates.js'

let room;
let user;
let booking
let manager
let today = moment().format("YYYY/MM/DD")
let todayforDisplay = moment().format("MMM Do YYYY")
let hotel = new Hotel()

$('#enter').click(startLogin)



function startLogin() {
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
    .then(promise => promise.json())
    .then(data => checkLogin(data.users))
    .catch(err => console.log('error', err))
}

function loadManager(){
  manager = new Manager()
  let availRooms = hotel.checkRoomsAvailableForDay(today)
  let todaysRevenue = hotel.calculateRevenueForDay(today)
  console.log(manager);
  domUpdates.togglePage($('.manager-page'), $('.welcome-page'))
  domUpdates.displayManagerTodayInformation(availRooms, todaysRevenue, todayforDisplay)
}

function checkLogin(data){
    let username = $('#login').val()
    let usernameValid = username.split('').splice(0, 8).join('');
    let id = parseInt(username.split('').splice(8).join(''))
    let password = $('#password').val()
    let validPW = validatePassword(password)
    if (username === 'manager' && validPW){
        let currentUser = 'manager'
        getBookingData(currentUser)
    } else {
      let isValid = validateUserName(username, usernameValid, id)
      if (isValid && validPW){
      let currentUser = findUser(id, data)
      getBookingData(currentUser)
      domUpdates.togglePage($('.user-page'), $('.welcome-page'));
     }
    }
}

function validatePassword(password){
  if (password !== "overlook2020"){
    domUpdates.displayLoginError('Password incorrect. Please enter info again')
    return false
  }
  return true
}

function validateUserName(username, usernameValid, id){
  if (username === 'manager'){
    return true
  }
  if (usernameValid !== 'customer'){
    domUpdates.displayLoginError('Username incorrect. Please enter info again')
    return false
  }
  if (username.length < 9 || username.length > 10){
    domUpdates.displayLoginError('Username incorrect. Please enter info again')
    return false
  }
  if (id > 50 || id < 1){
    domUpdates.displayLoginError('ID incorrect. Please enter info again')
    return false
  }
  return true
}

function findUser(id, data){
  let myUser = data.find(user=> user.id === id)
 return myUser
}


function getBookingData(currentUser) {
  Promise.all([
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings").then(promise => promise.json()),
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms").then(promise => promise.json())
  ]).then(data => fetchHelper(data[0].bookings, data[1].rooms, currentUser))
    .catch(err => console.log('error', err))
}

function fetchHelper(apiBookings, apiRooms, currentUser){
  assignApiBookings(apiBookings)
  assignApiRooms(apiRooms)
  if (currentUser !== 'manager'){
  assignCurrentUser(currentUser)
  } else {
  loadManager()
  }
}

function assignApiBookings(apiBookings){
  apiBookings.forEach(item=>{
  booking = new Booking(item)
  hotel.allBookings.push(booking)
  })
}

function assignApiRooms(apiRooms){
  apiRooms.forEach(item=>{
  room = new Room(item)
  hotel.allRooms.push(room)
  })
  console.log(hotel)
}

function assignCurrentUser(currentUser){
  let userBookings = hotel.checkUserBookings(currentUser.id)
  user = new User(currentUser, userBookings, hotel.allRooms)
  domUpdates.displayUserBookings(user)
  console.log('userBookings', userBookings);
  console.log(user);
}

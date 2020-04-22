import $ from 'jquery';
import moment from 'moment';

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
let users = []
let today = moment().format("YYYY/MM/DD")
let todayforDisplay = moment().format("MMM Do YYYY")
let hotel = new Hotel()

$('#enter').click(startLogin)
$('.find-room-btn').click(findUserRooms)
$('.room-selection').click(postBooking)
$('.list-of-users').click(getUserAsManager)


$('.search-for-users').on('click', function() {
  if ($('button').hasClass('search-other-users')) {
    domUpdates.reloadUsers(users)
  }
})


function getUserAsManager(event) {
  if ($('button').hasClass('select-user-btn')) {
    let userID = parseInt(event.target.id)
    let specificUser = users.find(user => user.id === userID)
    let userBookings = hotel.checkUserBookings(specificUser.id)
    user = new User(specificUser, userBookings, hotel.allRooms)
    domUpdates.displayUserBookings(user, manager)
    domUpdates.displayUserForManager(specificUser)
    return
  }
  if ($('button').hasClass('delete-btn')) {
    let date = event.target.id
    let date1 = moment(date).format('L').split('/').join('')
    date1 = parseInt(date1)
    let today1 = moment().format('L').split('/').join('')
    today1 = parseInt(today1)
    if (today1 > date1) {
      domUpdates.noDeleteAlert()
      return
    }
    let bookingID = parseInt(event.target.dataset.id)
    manager.deleteBooking(bookingID)
    return
  }

}

$('.search-users-entry').on('keyup', function() {
  let filter = $('.search-users-entry').val().toUpperCase();
  let users = [...document.getElementsByTagName('li')]
  users.forEach(name => {
    if (name.innerText.toUpperCase().indexOf(filter) > -1) {
      name.style.display = "";
    } else {
      name.style.display = 'none';
    }
  })
})

function postBooking(event) {
  let userID = $('.manager-as-user-id').text()
  if (userID === '' && user === undefined) {
    domUpdates.displayNeedUser()
    return
  }
  userID = parseInt(userID)
  if ($('button').hasClass('book-room')) {
    let roomNumber = event.target.id
    let date = event.target.dataset.id
    let date1 = moment(date).format('L').split('/').join('')
    date1 = parseInt(date1)
    let today1 = moment().format('L').split('/').join('')
    today1 = parseInt(today1)
    if (date1 < today1) {
      domUpdates.futureDateAlert()
      return
    }
    if (manager === undefined) {
      user.createBooking(date, roomNumber)
    } else {
      user.createBooking(date, roomNumber, userID)
    }
  }
}

function findUserRooms() {
  let date = $('.select-a-date').val()
  let roomType = $('.roomType').val()
  if (date === '') {
    date = $('#manager-date').val()
    roomType = $('#manager-roomType').val()
  }
  date = date.split('-').join('/')
  if (date === '') {
    domUpdates.missingDateErrorMessage()
    return
  }
  if (roomType !== "All Types") {
    let filteredRoomsAvail = hotel.filterRoomsByType(date, roomType)
    domUpdates.displayRoomsAvail(date, filteredRoomsAvail, manager)
  } else {
    let roomsAvail = hotel.findAvailableRoomsByDate(date)
    domUpdates.displayRoomsAvail(date, roomsAvail, manager)
  }
}


function startLogin() {
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
    .then(promise => promise.json())
    .then(data => checkLogin(data.users))
    .catch(err => console.log('error', err))
}

function loadManager() {
  domUpdates.loadUsers(users)
  if (manager === undefined) {
    domUpdates.togglePage($('.manager-page'), $('.welcome-page'))
    manager = new Manager()
  }
  let availRooms = hotel.checkRoomsAvailableForDay(today)
  let todaysRevenue = hotel.calculateRevenueForDay(today)
  domUpdates.displayManagerTodayInformation(availRooms, todaysRevenue, todayforDisplay)
}

function checkLogin(data) {
  data.forEach(user => users.push(user))
  let username = $('#login').val()
  let usernameValid = username.split('').splice(0, 8).join('');
  let id = parseInt(username.split('').splice(8).join(''))
  let password = $('#password').val()
  let validPW = validatePassword(password)
  if (username === 'manager' && validPW) {
    let currentUser = 'manager'
    getBookingData(currentUser)
  } else {
    let isValid = validateUserName(username, usernameValid, id)
    if (isValid && validPW) {
      let currentUser = findUser(id, data)
      getBookingData(currentUser)
      domUpdates.togglePage($('.user-page'), $('.welcome-page'));
    }
  }
}

function validatePassword(password) {
  if (password !== "overlook2020") {
    domUpdates.displayLoginError('Password incorrect. Please enter info again')
    return false
  }
  return true
}

function validateUserName(username, usernameValid, id) {
  if (username === 'manager') {
    return true
  }
  if (usernameValid !== 'customer') {
    domUpdates.displayLoginError('Username incorrect. Please enter info again')
    return false
  }
  if (username.length < 9 || username.length > 10) {
    domUpdates.displayLoginError('Username incorrect. Please enter info again')
    return false
  }
  if (id > 50 || id < 1) {
    domUpdates.displayLoginError('ID incorrect. Please enter info again')
    return false
  }
  return true
}

function findUser(id, data) {
  let myUser = data.find(user => user.id === id)
  return myUser
}


function getBookingData(currentUser) {
  Promise.all([
      fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings").then(promise => promise.json()),
      fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms").then(promise => promise.json())
    ]).then(data => fetchHelper(data[0].bookings, data[1].rooms, currentUser))
    .catch(err => console.log('error', err))
}

function fetchHelper(apiBookings, apiRooms, currentUser) {
  assignApiBookings(apiBookings)
  assignApiRooms(apiRooms)
  if (currentUser !== 'manager') {
    assignCurrentUser(currentUser)
  } else {
    loadManager()
  }
}

function assignApiBookings(apiBookings) {
  apiBookings.forEach(item => {
    booking = new Booking(item)
    hotel.allBookings.push(booking)
  })
}

function assignApiRooms(apiRooms) {
  apiRooms.forEach(item => {
    room = new Room(item)
    hotel.allRooms.push(room)
  })
}

function assignCurrentUser(currentUser) {
  let userBookings = hotel.checkUserBookings(currentUser.id)
  user = new User(currentUser, userBookings, hotel.allRooms)
  domUpdates.displayUserBookings(user)
}

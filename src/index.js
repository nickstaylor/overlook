// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import $ from 'jquery';
// import './css/style.scss';
import './css/base.scss';
import Room from './Room.js';
import Manager from './Manager.js';
import User from './User.js';
import Booking from './Booking.js';
import Bookings from './Bookings.js';
import Hotel from './Hotel';
import domUpdates from './domUpdates.js'

let room;
let user;
let users = []
let booking
let bookings = new Bookings ()
let hotel = new Hotel()
let manager

$('#enter').click(startLogin)



function startLogin() {
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users")
    .then(promise => promise.json())
    .then(data => checkLogin(data.users))
    .catch(err => console.log('error', err))
}


function checkLogin(data){
    let username = $('#login').val()
    let password = $('#password').val()
    $('.error-message').html('')

     if (password !== "overlook2020"){
       return $('.error-message').html('Please enter info again')
     }
     let userID = checkUserID(username)
     let currentUser = findUser(userID, data)


     if (username === 'manager'){
       let manager = 'manager'
       getBookingData(manager)
       // domUpdates.displayPage()
     } else {
       getBookingData(currentUser)
       //domUpdates.displayPage()
     }
}


function findUser(userID, data){
  console.log(userID);
  console.log(data);
  let myUser = data.find(user=> user.id === userID)
 console.log(myUser);
 return myUser
}

function checkUserID(username){
  console.log(username);
  let id1;
  username = username.split('');
  if (username.length < 9 || username.length > 10){
    return $('.error-message').html('Please enter info again')
  } else if (username.length === 9) {

    id1 = (username[username.length - 1])
    id1 = parseInt(id1)
    return id1
  } else if (username.length === 10) {
    id1 = username[username.length - 2] + username[username.length - 1]
    id1 = parseInt(id1)
    return id1
  } else {
     $('.error-message').html('Please enter info again')
  }
}


      // let id = 0
      // login = login.join('')
      // if (login.length === 9 && parseInt(login[login.length-1]) !== 'NaN' && login.includes('customer')) {
      //   console.log("got here 9")
      //   id = parseInt(login[login.length -1])}
      //   $('#login').val('')
      //   $('#password').val('')
      //
      // if (login.length === 10 && parseInt(login[login.length-2]) !== 'NaN' && parseInt(login[login.length-1]) !== 'NaN' && login.includes('customer')){
      //    console.log("got here 10")
      //       id = parseInt(login[login.length -2] + login[login.length -1])
      //  }
      //  // else { $('.error-message').html('Please enter info again')}
      //   console.log(id)



function getBookingData(person) {
  Promise.all([
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings").then(promise => promise.json()),
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms").then(promise => promise.json())
  ]).then(data => fetchHelper(data[0].bookings, data[1].rooms, person))
    .catch(err => console.log('error', err))
}

function fetchHelper(apiBookings, apiRooms, person){
  assignApiBookings(apiBookings)
  assignApiRooms(apiRooms)
  assignCurrentUser(person)
}

function assignApiBookings(apiBookings){
  apiBookings.forEach(item=>{
  booking = new Booking(item)
  bookings.allBookings.push(booking)
})
console.log(bookings)
}

function assignApiRooms(apiRooms){
  apiRooms.forEach(item=>{
  room = new Room(item)
  hotel.allRooms.push(room)
})
console.log(hotel)
}

function assignCurrentUser(person){
  console.log(person);
  if (person === 'manager'){
    manager = new Manager(person)
  } else {
    user = new User(person)
  }
  console.log(manager)
  console.log(user);
}
// console.log(bookings)

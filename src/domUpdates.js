import $ from 'jquery';
import moment from 'moment';


const domUpdates = {

  togglePage(showPage, hidePage) {
    $(showPage).toggleClass('hidden')
    $(hidePage).toggleClass('hidden')
  },

  displayLoginError(message) {
    $('#login').val('')
    $('#password').val('')
    $('.error-message').html(message)
  },

  displayUserBookings(user, manager) {
    $('.left-side-user-history').html('')
    let name = user.name.split(' ').shift()
    let userBookings = "<ul>"
    user.myBookings.forEach(booking => {
      userBookings = userBookings + '<li><b>Reservation Date:</b>: ' + booking.date + ' <b>Room</b>: ' +
        booking.roomNumber + '<button class="delete-btn hidden" id="' + booking.date + '" data-id="' +
        booking.id + '" arial-label="delete-user">Delete Booking</button></li>'
    });
    userBookings = userBookings + '</ul>'
    if (manager !== undefined) {
      this.hideUserSearch()
      $('.list-of-users').html('')
      $('.list-of-users').prepend(
        `<h3><span>${name}</span> Bookings Below:</h3>
            <section class="user-bookings">
            ${userBookings}
            </section>
            <h3>Total Spent: $${user.totalSpent}</h3>`)
      $('.delete-btn').removeClass('hidden')
    } else {
      $('.left-side-user-history').prepend(
        `<h2>Hi <span>${name}</span>! Your Bookings Below:</h2>
          <section class="user-bookings">
          ${userBookings}
          </section>
          <h2>Total Spent: $${user.totalSpent}</h2>
          `)
    }
  },

  hideUserSearch() {
    $('.date-selector').html('')
    $('.date-selector').prepend(`
            <button class="search-other-users" type="button" name="button">Search Other Users</button>
            `)
  },

  displayManagerTodayInformation(availRooms, todaysRevenue, todayforDisplay) {
    let percentBooked = Math.round(((25 - availRooms) / 25) * 100)
    $('.manager-today').prepend(
      `<h2><span>Today:</span> ${todayforDisplay}</h2>
            <h2><span>Rooms Available:</span>   ${availRooms}</h2>
            <h2><span>% of Rooms Booked:</span>   ${percentBooked}% </h2>
            <h2><span>Total Revenue:</span>   $${todaysRevenue}</h2>
            `)
  },

  missingDateErrorMessage() {
    $('.room-selection').html('')
    $('.room-selection').prepend(
      `<h2 class="date-missing">Please enter a date above</h2>`
    )
  },

  displayRoomsAvail(date, roomsAvail, manager) {
    let newDate = moment(date).format("MMM Do YYYY")
    $('.room-selection').html('')
    if (roomsAvail.length === 0) {
      $('.room-selection').prepend(
        `<h2 class="">We do apologize, but the Overlook is booked full on ${newDate}.</h2>
              <p class="">Please choose another date to book with us.</p>`
      )
      return
    }
    if (manager === undefined) {
      let displayRooms = `<h3>Rooms Available for ${newDate}</h3>`
      roomsAvail.forEach(room => {
        displayRooms = displayRooms + '<section class="rooms-display"><div class="left-room-display"><h2><b> ' + room.roomType +
          '</b></h2><ul><li><b>Bed</b>: ' + room.bedSize + '</li><li><b>Number of Beds</b>: ' + room.numBeds +
          ' </li><li><b>Bidet</b>: ' + room.bidet + '</li></div><div class="right-room-display"><p><b>Nightly Rate</b>: $' +
          room.costPerNight + '</p><button class="book-room" data-id="' + date + '" id="' + room.number +
          '" type="button" name="button">Book Room!</button></div></section>'
      });
      $('.room-selection').prepend(
        `${displayRooms}`
      )
    } else {
      let displayRooms = `<h3>Rooms Available for ${newDate}</h3>`
      roomsAvail.forEach(room => {
        displayRooms = displayRooms + '<section class="rooms-display"><div class="left-room-display"><h2><b> ' + room.roomType +
          '</b></h2><ul><li><b>Bed</b>: ' + room.bedSize + '</li><li><b>Number of Beds</b>: ' + room.numBeds +
          ' </li><li><b>Bidet</b>: ' + room.bidet + '</li></div><div class="right-room-display-manager"><p><b>Nightly Rate</b>: $' +
          room.costPerNight + '</p><p><b>Room Number </b> ' + room.number + '</p><button class="book-room book-room-client" data-id="' +
          date + '" id="' + room.number + '" type="button" name="button">Book Room for Client</button></div></section>'
      });
      $('.room-selection').prepend(
        `${displayRooms}`
      )
    }
  },

  displayNeedUser() {
    alert("Hi BossHog.  Please select a User before booking")
    return
  },

  noDeleteAlert() {
    alert("Hi BossHog. This booking already happened so deleting is a no-no.")
  },

  futureDateAlert() {
    alert("Sorry, this date has already passed.  Please book a room for today or for a future date")
  },

  loadUsers(users) {
    let userList = "<h2>Hotel Guests</h2><ul>"
    users.forEach(user => {
      userList = userList + '<li class="user-list" display=""> ' + user.name + '<b> ID </b>: ' + user.id +
        '<button class="select-user-btn" id="' + user.id + '" arial-label="select-user" type="button">Select</button></li>'
    })
    userList = userList + '</ul>'
    $('.list-of-users').prepend(`
            ${userList}
            `)
  },

  displayUserForManager(specificUser) {
    $('.manager-as-user-div').html('')
    $('.manager-as-user-div').prepend(`
            <p class="manager-as-user" id = ${specificUser.id}><b>Book for User</b>:
            ${specificUser.name}, <b>ID</b>:<span class="manager-as-user-id"> ${specificUser.id}</span></p>`)
  },

  reloadUsers(users) {
    $('.search-for-users').html('')
    $('.search-for-users').prepend(`<label for="search-users">Search Users By Name</label>
          <input placeholder="search users here.." text="text" class="search-users-entry">`)
    this.loadUsers(users)
  }


}

export default domUpdates;

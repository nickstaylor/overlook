import $ from 'jquery';
import User from './User.js'


  const domUpdates = {

      togglePage(showPage, hidePage) {
        $(showPage).toggleClass('hidden')
        $(hidePage).toggleClass('hidden')
      },

      displayLoginError(message){
        $('#login').val('')
        $('#password').val('')
        $('.error-message').html(message)
      },

      displayUserBookings(user){
        let userBookings = "<ul>"
        user.myBookings.forEach(booking=>{
          userBookings = userBookings + '<li><b>Date of Reservation</b>: ' + booking.date + ' <b>Room</b>: '
          + booking.roomNumber + '</li>'
        });
        userBookings = userBookings + '</ul>'

        $('.left-side-user-history').prepend(
          `<h2>Your Booking Information</h2>
          <section class="user-bookings">
          ${userBookings}
          </section>
          <h2>Total Spent: $${user.totalSpent}</h2>
          `)
        }


  }

  export default domUpdates;

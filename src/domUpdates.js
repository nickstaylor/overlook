import $ from 'jquery';
import User from './User.js'
// import Hotel from './Hotel.js'

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
          userBookings = userBookings + '<li><b>Reservation Date:</b>: ' + booking.date + ' <b>Room</b>: '
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
        },

        displayManagerTodayInformation(availRooms, todaysRevenue, todayforDisplay){
          console.log(availRooms)
          console.log(todaysRevenue);
          let percentBooked = Math.round(((25-availRooms)/25) * 100)
          console.log(percentBooked);


          $('.left-side-manager-today').prepend(
            `<h2><span>Today:</span> ${todayforDisplay}</h2>
            <h2><span>Rooms Available:</span>   ${availRooms}</h2>
            <h2><span>% of Rooms Booked:</span>   ${percentBooked}% </h2>
            <h2><span>Total Revenue:</span>   $${todaysRevenue}</h2>
            `)
        }


  }

  export default domUpdates;

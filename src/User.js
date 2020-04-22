


class User {
  constructor(user, bookings, hotelRooms) {
    this.id = user.id;
    this.name = user.name;
    this.myBookings = bookings
    this.totalSpent = this.totalSpentAtHotel(hotelRooms)
  }

  createBooking(date, roomNumber, userID) {
    if (userID === undefined) {
      userID = this.id
    }
    roomNumber = parseInt(roomNumber)
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: userID,
          date: date,
          roomNumber: roomNumber
        })
      })
      .then(response => response.json())
      .then(data => console.log("success", data))
      .then(data => window.alert("Your room has been booked!"))
      .catch(err => console.log("error", err.message))
  }

  totalSpentAtHotel(hotelRooms) {
    let costofAllBookings = this.myBookings.reduce((sum, booking) => {
      hotelRooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          sum += room.costPerNight
        }
      })
      return Number(sum.toFixed(2))
    }, 0)
    return costofAllBookings
  }


}


export default User

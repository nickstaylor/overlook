import Hotel from './Hotel.js'
import Manager from './Manager.js'
import domUpdates from './domUpdates.js'

class User {
  constructor(user, bookings, hotelRooms){
    this.id = user.id;
    this.name = user.name;
    this.myBookings = bookings
    this.totalSpent = this.totalSpentAtHotel(hotelRooms)
  }


  createBooking(){

  }

  checkMyBookings(){

  }
  //move this function to DOM and limit user exposure to hotel data
  totalSpentAtHotel(hotelRooms){
    let costofAllBookings = this.myBookings.reduce((sum, booking) =>{
      hotelRooms.forEach(room =>{
        if (booking.roomNumber === room.number){
          sum += room.costPerNight
        }
      })
      return Number(sum.toFixed(2))
    }, 0)
    return costofAllBookings
  }




}


export default User

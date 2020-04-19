// import domUpdates from '.domUpdates'
import User from './User.js'
import Hotel from './Hotel.js'

class Manager {
  constructor(user){
    // super(user, bookings, hotelRooms, totalSpent)
    this.name = user.id || "BossHog"
    this.isBossy = true;
  }


  createBooking(){

  }

  deleteBooking(){

  }

  findUser(){
    //drop down of users.
  }

}


export default Manager

import moment from 'moment';

class Hotel {
  constructor(){
    this.allRooms = []
    this.allBookings = []
  }

  calculateRevenueForDay(date){
    let roomsBooked = this.getTodaysBookings(date)
    console.log(date);
    console.log('roomsBooked', roomsBooked);
    let revenueForDay = roomsBooked.reduce((sum, booking)=>{
        this.allRooms.forEach(room=>{
          if (booking.roomNumber === room.number){
            sum += room.costPerNight
          }
        })
        return Number(sum.toFixed(2))
    }, 0)
    console.log('revenueForDay', revenueForDay);
    return revenueForDay
  }

  filterRoomsByType(){
   //move to manager
  }

  getTodaysBookings(date){
    let roomsBooked = this.allBookings.reduce((acc, booking)=>{
        if (booking.date === date){
          acc.push(booking)
        }
        return acc
    }, [])
    return roomsBooked
  }

  //for today or any date
  checkRoomsAvailableForDay(date){
    let roomsBooked = this.getTodaysBookings(date)
    let availRooms = this.allRooms.length - roomsBooked.length
    // console.log('availRooms', availRooms);
    return availRooms
  }


  checkUserBookings(id){
    return this.allBookings.filter(booking => booking.userID === id)
    }

}


export default Hotel

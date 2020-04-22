
class Hotel {
  constructor() {
    this.allRooms = []
    this.allBookings = []
  }

  calculateRevenueForDay(date) {
    let roomsBooked = this.getTodaysBookings(date)
    let revenueForDay = roomsBooked.reduce((sum, booking) => {
      this.allRooms.forEach(room => {
        if (booking.roomNumber === room.number) {
          sum += room.costPerNight
        }
      })
      return Number(sum.toFixed(2))
    }, 0)
    return revenueForDay
  }

  filterRoomsByType(date, roomType) {
    roomType = roomType.toLowerCase()
    let roomsAvail = this.findAvailableRoomsByDate(date)
    let filteredRooms = roomsAvail.filter(room => {
      return room.roomType === roomType
    })
    return filteredRooms
  }

  findAvailableRoomsByDate(date) {
    date = `${date}`
    let roomsBooked = this.getTodaysBookings(date)
    let newHotel = [...this.allRooms]
    roomsBooked.forEach(booking => {
      newHotel.forEach(room => {
        if (room.number === booking.roomNumber) {
          const value = newHotel.indexOf(room)
          newHotel.splice(value, 1)
        }
      })
    })
    return newHotel
  }

  getTodaysBookings(date) {
    let roomsBooked = this.allBookings.reduce((acc, booking) => {
      if (booking.date === date) {
        acc.push(booking)
      }
      return acc
    }, [])
    return roomsBooked
  }

  checkRoomsAvailableForDay(date) {
    let roomsBooked = this.getTodaysBookings(date)
    let availRooms = this.allRooms.length - roomsBooked.length
    return availRooms
  }


  checkUserBookings(id) {
    return this.allBookings.filter(booking => booking.userID === id)
  }

}


export default Hotel

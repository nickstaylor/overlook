


class Booking {
  constructor(reservation){
    this.id = reservation.id;
    this.userID = reservation.userID;
    this.date = reservation.date;
    this.roomNumber = reservation.roomNumber;
    this.roomService = reservation.roomServiceCharges;
  }

}


export default Booking

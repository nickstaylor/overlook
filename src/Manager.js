class Manager {
  constructor() {
    this.name = "BossHog"
    this.isBossy = true;
  }

  deleteBooking(bookingID) {
    fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: bookingID
        })
      })
      .then(response => response.json())
      .then(data => console.log("success", data))
      .then(data => window.alert("You have deleted this booking"))
      .catch(err => console.log("error", err.message))
  }

}




export default Manager

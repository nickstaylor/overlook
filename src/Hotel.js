import moment from 'moment';

class Hotel {
  constructor(){
    this.allRooms = []
    this.allBookings = []
    this.todaysBookings = []
    this.todaysDate = moment().format("YYYY/MM/DD")

  }
  // this.todaysBookings = findTodaysBookings()

  calculateRevenue(){
    //caclulate revenue
  }

  filterRoomsByType(){
   //move to manager
  }

  checkRoomsAvailable(date){
    //for today or any date
  }

  checkUserBookings(id){
    return this.allBookings.filter(booking => booking.userID === id)


    }


  // generateFullIngredientList(partialIngredients) {
  //       return partialIngredients.map(ingredient => {
  //
  //       let matchedIngredient = rawIngredientsDataPantry.find(rawIngredient =>{
  //           return ingredient.ingredient === rawIngredient.id
  //         })
  //
  //         return {name:matchedIngredient.name,
  //                 id: matchedIngredient.id,
  //                 estimatedCostInCents: matchedIngredient.estimatedCostInCents,
  //                 amount: ingredient.amount
  //               };
  //     })
  //   }




//manager can use this and input any ID they want.

  caclulateUserCost(id){

  }

}


export default Hotel

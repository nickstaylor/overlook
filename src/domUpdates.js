import $ from 'jquery';


  const domUpdates = {

      displayAllInfo(userData) {},

     validateUserLogin(login, password, users) {
       // console.log('users', users)
       $('.error-message').html('')
        if (password !== "overlook2020"){
          return $('.error-message').html('Please enter info again')
        }
         login = login.split('')
         if (login.length < 9 || login.length > 10){
           return $('.error-message').html('Please enter info again')
         }
         let id = 0
         login = login.join('')
         if (login.length === 9 && parseInt(login[login.length-1]) !== 'NaN' && login.includes('customer')) {
           console.log("got here")
           id = parseInt(login[login.length -1])}
           $('#login').val('')
           $('#password').val('')
         if (login.length === 10 && parseInt(login[login.length-1]) !== 'NaN' && parseInt(login[login.length-1]) !== 'NaN' && login.includes('customer')){
            console.log("got here 10")
               id = parseInt(login[login.length -2] + login[login.length -1])
          } else { $('.error-message').html('Please enter info again')}
           console.log(id)
      },
  }

  export default domUpdates;

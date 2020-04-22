import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/Booking';


describe('Booking', function() {
  let booking1
  let booking2



  beforeEach(function() {
    booking1 = new Booking({
      id: "5fwrgu4i7k55hl7f7",
      userID: 42,
      date: "2020/02/11",
      roomNumber: 2,
      roomService: undefined
    })
    booking2 = new Booking({
      id: "5fwrgu4i7k55hl7g9",
      userID: 42,
      date: "2020/02/16",
      roomNumber: 3,
      roomService: undefined
    })
  })

  it('should be a function', function() {
    expect(Booking).to.be.a("function")
  });

  it('should instantiate our lovely friend, booking', function() {
    expect(booking1).to.be.an.instanceof(Booking);
  })

  it('should be able to have a unique id', function() {
    expect(booking1.id).to.eq("5fwrgu4i7k55hl7f7")
  })

  it('should be able to have a roomNumber', function() {
    expect(booking2.roomNumber).to.eq(3)
  })

  it('should be able to hold a userID', function() {
    expect(booking1.userID).to.eq(42)
  })

  it('should be able to hold a date', function() {
    expect(booking2.date).to.eq("2020/02/16")
  })

  it('should be start off with an empty array of room service', function() {
    expect(booking2.roomService).to.deep.eq(undefined)
  })


})

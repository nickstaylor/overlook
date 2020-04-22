import chai from 'chai';
const expect = chai.expect;
import Room from '../src/Room';


describe('Room', function() {
  let room1
  let room2

  beforeEach(function() {
    room1 = new Room({
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
    })
    room2 = new Room({
      number: 2,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38
    })
  })

  it('should be a function', function() {
    expect(Room).to.be.a("function")
  });

  it('should instantiate our lovely friend, the room', function() {
    expect(room1).to.be.an.instanceof(Room);
  })

  it('should be able to have a unique roomNumber', function() {
    expect(room2.number).to.eq(2)
  })

  it('should be able to have a roomNumber', function() {
    expect(room2.roomType).to.eq("suite")
    expect(room1.roomType).to.eq("residential suite")
  })

  it('might have a bidet in the room!', function() {
    expect(room1.bidet).to.eq(true)
    expect(room2.bidet).to.eq(false)
  })

  it('should be able to have a bed size', function() {
    expect(room2.bedSize).to.eq("full")
  })

  it('should be able to have the cost per night', function() {
    expect(room2.costPerNight).to.eq(477.38)
    expect(room1.costPerNight).to.eq(358.4)
  })

  it('should have the number of beds in the room', function() {
    expect(room2.numBeds).to.eq(2)
    expect(room1.numBeds).to.eq(1)
  })

})

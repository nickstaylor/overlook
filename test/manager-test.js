import chai from 'chai';
const expect = chai.expect;
import Manager from '../src/Manager';



describe('Manager', function() {
  let manager
  let manager2

  beforeEach(function() {
    manager = new Manager({
      name: "BossHog",
      isBossy: true
    })
    manager2 = new Manager({
      name: "BossHog",
      isBossy: true
    })
  })

  it('should be a function', function() {
    expect(Manager).to.be.a("function")
  });

  it('should instantiate our lovely bossy Manager, the Manager', function() {
    expect(manager).to.be.an.instanceof(Manager);
  })

  it('should be able to have a boss-like name', function() {
    expect(manager2.name).to.eq("BossHog")
  })

  it('should start off as Bossy', function() {
    expect(manager.isBossy).to.eq(true)
    expect(manager2.isBossy).to.eq(true)
  })

})

const { MarkovMachine } = require('./markov');

describe('makeChains function', function () {
  let mm;
  beforeEach(function () {
    mm = new MarkovMachine('the cat in the hat');
  });
  test('on creation should create chains', function () {
    expect(mm.chains.get('hat')).toContain(null);
  });

  test('maketext should return the number of words passed into the function or less', () => {
    expect(mm.makeText(5).split(' ').length).toBeLessThanOrEqual(5);
  });

  test('Check if makeText output is type string', () => {
    expect(mm.makeText()).toEqual(expect.any(String));
  });
});

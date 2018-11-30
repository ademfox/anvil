import {
  Num
} from '../../../src/anvil/Core/Num';

describe('Num average', () => {

  it('should throw an error if array with less than 2 element is given', () => {
    expect(() => Num.average([1])).toThrow();
  });

  it('should return the average of the given array of numbers.', () => {
    const numbers = [1, 2, 3];
    // average is 6 / 3 = 2
    expect(Num.average(numbers)).toBe(2);
  });

});

describe('Num constrain', () => {

});
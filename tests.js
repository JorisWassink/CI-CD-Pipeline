// tests.js

// Use Chai's expect for assertions
const expect = chai.expect;

describe('convertToRoman', function() {
  it('should convert 1 to "I"', function() {
    expect(convertToRoman(1, true)).to.equal('I');
  });

  it('should convert 2 to "II"', function() {
    expect(convertToRoman(2, true)).to.equal('II');
  });

  it('should convert 4 to "IV"', function() {
    expect(convertToRoman(4, true)).to.equal('IV');
  });

  it('should convert 5 to "V"', function() {
    expect(convertToRoman(5, true)).to.equal('V');
  });

  it('should convert 6 to "VI"', function() {
    expect(convertToRoman(6, true)).to.equal('VI');
  });

  it('should convert 1666 to "MDCLXVI"', function() {
    expect(convertToRoman(1666, true)).to.equal('MDCLXVI');
  });

    it('should convert 9 to "IX"', function() {
    expect(convertToRoman(9, true)).to.equal('IX');
  });

  it('should convert 14 to "XIV"', function() {
    expect(convertToRoman(14, true)).to.equal('XIV');
  });

  it('should convert 40 to "XL"', function() {
    expect(convertToRoman(40, true)).to.equal('XL');
  });

  it('should convert 49 to "XLIX"', function() {
    expect(convertToRoman(49, true)).to.equal('XLIX');
  });

  it('should convert 90 to "XC"', function() {
    expect(convertToRoman(90, true)).to.equal('XC');
  });

  it('should convert 400 to "CD"', function() {
    expect(convertToRoman(400, true)).to.equal('CD');
  });

  it('should convert 900 to "CM"', function() {
    expect(convertToRoman(900, true)).to.equal('CM');
  });

  it('should convert 1994 to "MCMXCIV"', function() {
    expect(convertToRoman(1994, true)).to.equal('MCMXCIV');
  });

  it('should convert 3000 to "MMM"', function() {
    expect(convertToRoman(3000, true)).to.equal('MMM');
  });

  it('should convert 3999 to "MMMCMXCIX"', function() {
    expect(convertToRoman(3999, true)).to.equal('MMMCMXCIX');
  });

  it('should throw an error for numbers less than 1', function() {
    expect(() => convertToRoman(0, true)).to.throw("No valid roman equivalent.");
  });

  it('should throw an error for negative numbers', function() {
    expect(() => convertToRoman(-1, true)).to.throw("No valid roman equivalent.");
  });

  it('should throw an error for numbers over 3999', function() {
    expect(() => convertToRoman(4000, true)).to.throw("Input must be a valid Roman numeral.");
  });

  it('should throw an error for fractions', function() {
    expect(() => convertToRoman(0.5, true)).to.throw("No valid roman equivalent.");
  });

  it('should throw an error for non-numbers', function() {
    expect(() => convertToRoman("MX", true)).to.throw("No valid roman equivalent.");
  });

  it('should throw an error for null', function() {
    expect(() => convertToRoman(null, true)).to.throw();
  });

  it('should throw an error for undefined', function() {
    expect(() => convertToRoman(undefined, true)).to.throw();
  });

  it('should throw an error for an array', function() {
    expect(() => convertToRoman([], true)).to.throw();
  });


});

describe('convertToInt', function() {
  it('should convert "I" to 1', function() {
    expect(convertToInt('I', true)).to.equal(1);
  });

  it('should convert "II" to 2', function() {
    expect(convertToInt('II', true)).to.equal(2);
  });

  it('should convert "XV" to 15', function() {
    expect(convertToInt('XV', true)).to.equal(15);
  });

  it('should convert "XIV" to 14', function() {
    expect(convertToInt('XIV', true)).to.equal(14);
  });

  it('should convert "XL" to 40', function() {
    expect(convertToInt('XL', true)).to.equal(40);
  });

  it('should convert "XLIX" to 49', function() {
    expect(convertToInt('XLIX', true)).to.equal(49);
  });

  it('should convert "XC" to 90', function() {
    expect(convertToInt('XC', true)).to.equal(90);
  });

  it('should convert "CD" to 400', function() {
    expect(convertToInt('CD', true)).to.equal(400);
  });

  it('should convert "CM" to 900', function() {
    expect(convertToInt('CM', true)).to.equal(900);
  });

  it('should convert "MCMXCIV" to 1994', function() {
    expect(convertToInt('MCMXCIV', true)).to.equal(1994);
  });

  it('should convert "MMM" to 3000', function() {
    expect(convertToInt('MMM', true)).to.equal(3000);
  });

  it('should convert "MMMCMXCIX" to 3999', function() {
    expect(convertToInt('MMMCMXCIX', true)).to.equal(3999);
  });

  it('should convert "IV" to 4', function() {
    expect(convertToInt('IV', true)).to.equal(4);
  });

  it('should convert "IX" to 9', function() {
    expect(convertToInt('IX', true)).to.equal(9);
  });

  it('should convert "XLIX" to 49', function() {
    expect(convertToInt('XLIX', true)).to.equal(49);
  });

  it('should convert "CD" to 400', function() {
    expect(convertToInt('CD', true)).to.equal(400);
  });

  it('should convert "CM" to 900', function() {
    expect(convertToInt('CM', true)).to.equal(900);
  });

  it('should convert "MCMXCIV" to 1994', function() {
    expect(convertToInt('MCMXCIV', true)).to.equal(1994);
  });

  it('should convert "MMMCMXCIX" to 3999', function() {
    expect(convertToInt('MMMCMXCIX', true)).to.equal(3999);
  });

  it('should normalise lowercase "mcmxciv" to 1994', function() {
    expect(convertToInt('mcmxciv', true)).to.equal(1994);
  });

  it('should throw an error for non valid roman numerals', function() {
    expect(() => convertToInt('IIII', true)).to.throw("Input must be a valid Roman numeral.");
  });

  it('should throw an error for non existing numerals', function() {
    expect(() => convertToInt('P', true)).to.throw("Input must be a valid Roman numeral.");
  });

  it('should throw an error for wrong symbols', function() {
    expect(() => convertToInt('?', true)).to.throw("Input must be a valid Roman numeral.");
  });

  it('should throw an error for empty input', function() {
    expect(() => convertToInt('', true)).to.throw("Input must be a valid Roman numeral.");
  });

  it('should throw an error for numbers above 3999', function() {
    expect(() => convertToInt('MMMM', true)).to.throw("Input too large.");
  });

  it('should throw an error for empty input', function() {
    expect(() => convertToInt('', true)).to.throw("Input must be a valid Roman numeral.");
  });

  it('should throw an error for a number input', function() {
    expect(() => convertToInt(1, true)).to.throw("Input must be a valid Roman numeral.");
  });

  it('should throw an error for null', function() {
    expect(() => convertToInt(null, true)).to.throw("Input must be a valid Roman numeral.");
  });

  it('should throw an error for undefined', function() {
    expect(() => convertToInt(undefined, true)).to.throw("Input must be a valid Roman numeral.");
  });

  it('should throw an error for an array', function() {
    expect(() => convertToInt([], true)).to.throw("Input must be a valid Roman numeral.");
  });

  it('should throw for "VV" (V cannot repeat)', function() {
    expect(() => convertToInt('VV', true)).to.throw();
  });

  it('should throw for "LL" (L cannot repeat)', function() {
    expect(() => convertToInt('LL', true)).to.throw();
  });

  it('should throw for "DD" (D cannot repeat)', function() {
    expect(() => convertToInt('DD', true)).to.throw();
  });

  it('should throw for "IC" (invalid subtractive pair)', function() {
    expect(() => convertToInt('IC', true)).to.throw();
  });

  it('should throw for "IL" (invalid subtractive pair)', function() {
    expect(() => convertToInt('IL', true)).to.throw();
  });

  it('should throw for "VX" (V cannot be used subtractively)', function() {
    expect(() => convertToInt('VX', true)).to.throw();
  });

  it('should throw for "IVI" (malformed numeral order)', function() {
    expect(() => convertToInt('IVI', true)).to.throw();
  });

  it('should throw for null', function() {
    expect(() => convertToInt(null, true)).to.throw();
  });

  it('should throw for a number input', function() {
    expect(() => convertToInt(42, true)).to.throw();
  });
});


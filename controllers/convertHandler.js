/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

  this.units = [
    {name: 'gallons', from: 'gal', to: 'l'},
    {name: 'liters', from: 'l', to: 'gal'},
    {name: 'miles', from: 'mi', to: 'km'},
    {name: 'kilometers', from: 'km', to: 'mi'},
    {name: 'pounds', from: 'lbs', to: 'kg'},
    {name: 'kilograms', from: 'kg', to: 'lbs'}
  ];
  
  this.getNum = input => {
    if (!input) return 'invalid number and unit';

    if(input.split('/').length > 2) return 'invalid number';

    input = input.toLowerCase();
    for(let i = 0; i < this.units.length; i++) {
      if(input === this.units[i].from) return 1;
      if(input.includes(this.units[i].from))
        return parseFloat(eval(input.split(this.units[i].from)[0]).toFixed(5));
    }

    return 'invalid number';
  }
  
  this.getUnit = input => {
    if (!input) return 'invalid number and unit';
    
    input = input.toLowerCase().match(/[a-z]+/g);

    for(let i = 0; i < this.units.length; i++) {
      if(input.includes(this.units[i].from))
        return this.units[i].from;
    }

    return 'invalid unit';
  }
  
  this.getReturnUnit = initUnit => {
    for(let i = 0; i < this.units.length; i++) {
      if(this.units[i].from === initUnit)
        return this.units[i].to;
    }
  }
  
  this.spellOutUnit = unit => {
    for(let i = 0; i < this.units.length; i++) {
      if(this.units[i].from === unit)
        return this.units[i].name;
    }
  }
  
  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = 0;

    switch(initUnit.toLowerCase()) {
      case 'gal': 
        result = initNum * galToL;
        break;
      case 'l': 
        result =  initNum / galToL;
        break;
      case 'lbs': 
        result =  initNum * lbsToKg;
        break;
      case 'kg': 
        result =  initNum / lbsToKg;
        break;
      case 'mi': 
        result =  initNum * miToKm;
        break;
      case 'km': 
        result =  initNum / miToKm;
        break;
    }

    return parseFloat(result.toFixed(5));
  };
  
  this.getString = (initNum, initUnit, returnNum, returnUnit) =>
    `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
}

module.exports = ConvertHandler;

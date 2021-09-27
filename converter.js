selectLeft = document.getElementById('select-left')
selectRight = document.getElementById('select-right')
selectUnit = document.getElementById('unit-select')

inputLeft = document.getElementById('input-left')
inputRight = document.getElementById('input-right')

// Option Class
class Option{
    constructor(value, text, tVal, isBase = false){
        this.isBase = isBase
        this.value = value;
        this.text = text;
        this.tVal = tVal
        this.content = () =>{
            let cont = document.createElement("option")
            cont.name = value
            cont.value = value
            cont.text = text

            return cont
        }
    }
}
// Unit Option Class
class UnitOption extends Option{
    constructor(value, text,base_units){
        super(value, text)
        this.base_units = base_units
    }
}

// Unit Options
uOptions = [
    new UnitOption('weight', 'Weight', {
                                    'kilogram':   new Option('kilogram', 'Kilogram', 1, true),
                                    'gram':       new Option('gram', 'Gram', 1000),
                                    'milligram':  new Option('milligram', 'Milligram', 1000000),
                                    'metricTon':  new Option('metricTon', 'Metric Ton', 0.001),
                                    'longTon':    new Option('longTon', 'Long Ton', 0.0009842073),
                                    'shortTon':   new Option('shortTon', 'Short Ton', 0.0011023122),
                                    'pounds':     new Option('pounds', 'Pounds', 2.2046244202),
                                    'ounce':      new Option('ounce', 'Ounce', 35.273990723)
                                    }),
    new UnitOption('time', 'Time', {
                                    'second':     new Option('second', 'Second', 1, true),
                                    'millisecond':new Option('millisecond', 'Millisecond', 1000),
                                    'minute':     new Option('minute', 'Minute', 0.0166666667),
                                    'hour':       new Option('hour', 'Hour', 0.0002777778),
                                    'day':        new Option('day', 'Day', 0.0000115741),
                                    'week':       new Option('week', 'Week', 0.0000016534),
                                    'month':      new Option('month', 'Month', 3.802570537E-7),
                                    'year':       new Option('year', 'Year', 3.168808781E-8)
                                    }),
    new UnitOption('area', 'Area',  {
                                    'squaremeter':      new Option('squaremeter', 'Square Meter', 1, true),
                                    'squarekilometer':  new Option('squarekilometer', 'Square Kilometer', 0.000001),
                                    'squarecentimeter': new Option('squarecentimeter', 'Square Centimeter', 10000),
                                    'hectar':           new Option('hectare', 'Hectare', 0.0001),
                                    'squaremile':        new Option('squaremile', 'Square Mile', 3.861018768E-7),
                                    'squareyard':       new Option('squareyard', 'Square Yard', 1.1959900463),
                                    'squareinch':       new Option('squareinch', 'Square Inch', 1550.0031)
                                    }),
    new UnitOption('volume', 'Volume', {
                                    'cubicmeter':   new Option('cubicmeter', 'Cubic Meter', 1, true),
                                    'cubickilometer':   new Option('cubickilometer', 'Cubic Kilometer', 1.E-9),
                                    'cubiccentimeter':  new Option('cubiccentimeter', 'Cubic Centimeter', 1000000),
                                    'liter':            new Option('liter', 'Liter', 1000),
                                    'milliliter':       new Option('milliliter', 'Milliliter', 1000000),
                                    'cubicmile':        new Option('cubicmile', 'Cubic Mile', 2.270421382E-13),
                                    'cubicyard':        new Option('cubicyard', 'Cubic Yard', 0.0012377823),
                                    'cubicfoot':        new Option('cubicfoot', 'Cubic Foot', 0.0334201231),
                                    'cubicinch':        new Option('cubicinch', 'Cubic Inch', 57.749972783)
                                    }),
    new UnitOption('length', 'Length', {
                                    'meter':    new Option('meter', 'Meter', 1, true),
                                    'kilometer':    new Option('kilometer', 'Kilometer', 0.001),
                                    'centimeter': new Option('centimeter', 'Centimeter', 100),
                                    'millimeter':   new Option('millimeter', 'Millimeter', 1000),
                                    'micrometer': new Option('micrometer', 'Micrometer', 1000000),
                                    'nanometer':    new Option('nanometer', 'Nanometer', 1000000000),
                                    'mile':         new Option('mile', 'Mile', 0.0006213689),
                                    'yard':         new Option('yard', 'Yard', 1.0936132983),
                                    'foot':         new Option('foot', 'Foot', 3.280839895),
                                    'inch':         new Option('inch', 'Inch', 39.37007874),
                                    'lightyear':    new Option('lightyear', 'Light Year', 1.057008707E-16)
                                    })
]



function convert(inputNum, leftBaseUnit, rightBaseUnit){    
    if (leftBaseUnit.isBase){
        return rightBaseUnit.tVal * inputNum
    }else{
        return (rightBaseUnit.tVal*inputNum)/
                (leftBaseUnit.tVal*inputNum) * 
                 inputNum
    }
}

// Adds all Unit Options in Select Unit
for (let uopt of uOptions){
    selectUnit.appendChild(uopt.content())
}

// Iterate through Unit Options
for (let opt of uOptions){
    // If iterated Unit Option is equal to already selected unit
    if (selectUnit.value == opt.value){
        // Iterate through 
        for (let base_unit in opt.base_units){
            selectLeft.appendChild(opt.base_units[base_unit].content())
            selectRight.appendChild(opt.base_units[base_unit].content())
        }
    }
}
currUnitIndex = 0
sUnitOptions = Array.from(selectUnit.options)
// Change Left and Right Selects according to Unit Value
document.body.addEventListener('input', e => {


    // Changes Base Units if Unit will change
    if (e.target == selectUnit){
        selectLeft.innerHTML = ""
        selectRight.innerHTML = ""
        for (let opt of uOptions){
            // If iterated Unit Option is equal to already selected unit
            if (selectUnit.value == opt.value){
                // Iterate through 
                for (let base_unit in opt.base_units){
                    selectLeft.appendChild(opt.base_units[base_unit].content())
                    selectRight.appendChild(opt.base_units[base_unit].content())
                }
            }
        }
    }

        // Changes Input/Output Values when Base Units are changed
        sUnitOptions = Array.from(selectUnit.options)

        sUnitOptions.forEach(unitt => {
            if(unitt.name == selectUnit.value){
                currUnitIndex = sUnitOptions.indexOf(unitt)
                leftB = uOptions[currUnitIndex].base_units[selectLeft.value]
                rightB = uOptions[currUnitIndex].base_units[selectRight.value]
            }
        })
        
        // Puts result to right input every change
        if(inputLeft.value != undefined || inputLeft.value != ""){
            inputRight.value = convert(inputLeft.value, leftB, rightB)
        }

})
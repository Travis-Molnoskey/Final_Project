// order of the array [carat, cut, color, clarity, depth, table_ratio, x, y ,z]
const uiArray_4C = [];

let btn4C = d3.select('#filter-btn');
let form = d3.select('form');

function updateUserInputFilters() {
    // get user inputs
    let uiCarat = parseFloat(d3.select('#carat_weight').property('value'));
    let uiCut = d3.select('#cut').property('value');
    let uiColor = d3.select('#color').property('value');
    let uiClarity = d3.select('#clarity').property('value');
    // let uiXLength = d3.select('#x_length').property('value');
    // let uiYWidth = d3.select('#y_width').property('value');
    // let uiZDepth = d3.select('#z_depth').property('value');
    // let uiDepthPercent = (2 * uiZDepth)/(uiXLength + uiYWidth);
    // let uiTable = d3.select('#table_width').property('value');

    submitOK = 'true';

    // data validation
    if (uiCarat < 0 || uiCarat > 10) {
        alert("The carat weight must be between 0 and 10");
        submitOK = 'false';
    };
    // if (uiXLength < 0 || uiXLength > 15) {
    //     alert("The x length must be between 0 and 15");
    //     submitOK = 'false';
    // };
    // if (uiYWidth < 0 || uiYWidth > 15) {
    //     alert("The y length must be between 0 and 75");
    //     submitOK = 'false';
    // };
    // if (uiZDepth < 0 || uiZDepth > 15) {
    //     alert("The z depth must be between 0 and 40");
    //     submitOK = 'false';
    // };
    // if (uiTable < 0 || uiTable > 15) {
    //     alert("The table width must be between 0 and 100");
    //     submitOK = 'false';
    // };
    
    if (submitOK === 'false') {
        return false;
    };

    // create update user model array
    let uiArray_4C = [uiCarat, uiCut, uiColor, uiClarity];
    // console.log(uiArray_4C);
};

function runModel(){
    updateUserInputFilters()
    console.log('uiArray_4C', uiArray_4C)
};

// call the function when the button is clicked
btn4C.on("click",runModel);
form.on("submit",runModel);
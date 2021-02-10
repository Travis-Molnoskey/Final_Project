
let form = d3.select('form');
let price_btn = d3.select('#price-btn');
let data = '../data/diamonds.csv'

function fetch_price(){
    let price = parseFloat(d3.select('#desired_price').property('value'));
    console.log(price)
    return price
};



function load_database(){
    let database = []
    d3.csv(data, function(d){
        database.push(d)
    })

//     var AWS = require('aws-sdk');
//     AWS.config.update(
//   {
//     accessKeyId: ".. your key ..",
//     secretAccessKey: ".. your secret key ..",
//   }
//     );
//     var s3 = new AWS.S3();
//     s3.getObject(
//     { Bucket: "ucsd-diamond-project", Key: "diamonds.csv" },
//     function (error, data) {
//         if (error != null) {
//         alert("Failed to retrieve an object: " + error);
//         } else {
//         alert("Loaded " + data.ContentLength + " bytes");
//             database = data.Body
//         }
//     }
//     );

}

function runModel(){
    let price = fetch_price()
    //console.log('price', price)
    
    console.log(database)

};


price_btn.on("click",runModel);
form.on("submit",runModel);
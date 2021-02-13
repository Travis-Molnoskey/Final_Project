
let form = d3.select('form');
let price_btn = d3.select('#price-btn');
let data = '../data/diamonds.csv'
let database = []



function fetch_price(){
    let price = parseFloat(d3.select('#desired_price').property('value'));
    return price
};

function avg(list){
    let sum = 0
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        sum=sum+element
    }
    let average = sum/list.length
    return average
}

function load_database(){

    d3.csv(data, function(d){
        database.push(d)
    })

};

function cut_avg(list){
    //"Fair": 1, "Good": 2, "Very Good": 3, "Premium": 4, "Ideal": 5
    let total = 0
    for (let i = 0; i < list.length; i++) {
        const element = list[i];

        switch(element){
            case "Fair":
                num=1
                break;
            case "Good":
                num=2
                break;
            case "Very Good":
                num=3
                break;
            case "Premium":
                num=4
                break;
            case "Ideal":
                num=5
                break;
        }

        total=total+num
    }
    let average = total/list.length
    
    switch(Math.round(average)){
        case 1:
            cut="Fair"
            break;
        case 2:
            cut="Good"
            break;
        case 3:
            cut="Very Good"
            break;
        case 4:
            cut="Premium"
            break;
        case 5:
            cut="Ideal"
            break;
        default:
            cut="unavailable"
        }

    return cut
};

function color_avg(list){
    //"J": 1, "I": 2, "H": 3, "G": 4, "F": 5, "E": 6, "D":7
    let total = 0
    for (let i = 0; i < list.length; i++) {
        const element = list[i];

        switch(element){
            case "J":
                num=1
                break;
            case "I":
                num=2
                break;
            case "H":
                num=3
                break;
            case "G":
                num=4
                break;
            case "F":
                num=5
                break;
            case "E":
                num=6
                break;
            case "D":
                num=7
                break;
        }

        total=total+num
    }
    let average = total/list.length
    
    switch(Math.round(average)){
        case 1:
            color="J"
            break;
        case 2:
            color="I"
            break;
        case 3:
            color="H"
            break;
        case 4:
            color="G"
            break;
        case 5:
            color="F"
            break;
        case 6:
            color="E"
            break;
        case 7:
            color="D"
            break;
        default:
            color="unavailable"
    }

    return color
};

function clarity_avg(list){
    //"I1": 1, "SI2": 2, "SI1": 3, "VS2": 4, "VS1": 5, "VVS2": 6, "VVS1":7, "IF":8
    let total = 0
    for (let i = 0; i < list.length; i++) {
        const element = list[i];

        switch(element){
            case "I1":
                num=1
                break;
            case "SI2":
                num=2
                break;
            case "SI1":
                num=3
                break;
            case "VS2":
                num=4
                break;
            case "VS1":
                num=5
                break;
            case "VVS2":
                num=6
                break;
            case "VVS1":
                num=7
                break;
            case "IF":
                num=8
                break;
        }

        total=total+num
    }
    let average = total/list.length
    
    switch(Math.round(average)){
        case 1:
            clarity="I1"
            break;
        case 2:
            clarity="SI2"
            break;
        case 3:
            clarity="SI1"
            break;
        case 4:
            clarity="VS2"
            break;
        case 5:
            clarity="VS1"
            break;
        case 6:
            clarity="VVS2"
            break;
        case 7:
            clarity="VVS1"
            break;
        case 8:
            clarity="IF"
            break;
        default:
            clarity="unavailable"
    }

    return clarity
};

function runModel(){
    let price = fetch_price()
    console.log('price', price)
    let result = []

    console.log(database)
    database = database.sort((a,b)=>parseFloat(a.price)-parseFloat(b.price));
    console.log(database)

    result = database.filter(function(d){
        return d.price == price
    });
    let j = 0
   
    while (result.length == 0 && j < 100){
        price = price+5
        result = database.filter(function(d){
            return d.price == price
        });
        j=j+1
    }

    if (j >= 100){
        console.log('working')
        price = fetch_price()
        while (result.length == 0){
            price = price-5
            result = database.filter(function(d){
                return d.price == price
            });
        }
    }
    

    let min_id = 0
    let id_match = result.map(d=>parseInt(d.id))
    min_id = id_match.reduce((a,b)=>Math.max(a,b))
    let id_array = []

    for (let i = 0; i < 20; i++) {
        id_array.push(min_id+i)
    }
    
    let final_result = []
    id_array.forEach(d => {
        final_result.push(database[d-2])
    });

    console.log(final_result)

    /*
    number correlations
    "Fair": 1, "Good": 2, "Very Good": 3, "Premium": 4, "Ideal": 5
    "J": 1, "I": 2, "H": 3, "G": 4, "F": 5, "E": 6, "D":7
    "I1": 1, "SI2": 2, "SI1": 3, "VS2": 4, "VS1": 5, "VVS2": 6, "VVS1":7, "IF":8
    */  
    let average_price = avg(final_result.map(d=>parseFloat(d.price)))
    let price_table = document.getElementById("price_row");
    price_table.textContent = numeral(average_price).format('0.00')


    // code for average carat: avg(result.map(d=>parseFloat(d.carat)))
    let average_carat = avg(final_result.map(d=>parseFloat(d.carat)))
    let carat_table = document.getElementById("carat_row");
    carat_table.textContent = numeral(average_carat).format('0.00')
    //console.log(avg(final_result.map(d=>parseFloat(d.carat))))

    //calculate average clarity
    let average_clarity = clarity_avg(final_result.map(d=>d.clarity))
    let clarity_table = document.getElementById("clarity_row");
    clarity_table.textContent = average_clarity
    //console.log(clarity_avg(final_result.map(d=>d.clarity)))

    //calculate average cut
    let average_cut = cut_avg(final_result.map(d=>d.cut))
    let cut_table = document.getElementById("cut_row");
    cut_table.textContent = average_cut
    //console.log(cut_avg(final_result.map(d=>d.cut)))

    //calculate average color
    let average_color = color_avg(final_result.map(d=>d.color))
    let color_table = document.getElementById("color_row");
    color_table.textContent = average_color
    //console.log(color_avg(final_result.map(d=>d.color)))



};


price_btn.on("click",runModel);
form.on("submit",runModel);
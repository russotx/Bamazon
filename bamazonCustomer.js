var mysql = require('mysql');
var inquire = require('inquirer');
var prompt = require('prompt');
var cliTable = require('cli-table');

function parseSQL(array,fields=[]) {
    // traverse array of objects
    array.forEach(function(element){
        var outputGroup = '';
        // traverse object
        for (x in element) {
            // check if object property matches a desired field for output
            if (fields.indexOf(x) != -1) {
                // add value of the property to the outputGroup string
                outputGroup += x+': '+element[x] + '   ';
            }
        }
        // log the string of property: values
        console.log(outputGroup.trim());
        console.log(' ');
    });
}

var bamDB = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // your username
    user: 'root',

    // your password
    password: 'root',
    database: 'Bamazon'
});


var bamazonApp = {

    transaction : [],

    userPrompt : function() {
        inquire.prompt([
            {
                name: 'productID',
                type: 'input',
                message: 'Enter the ID of the item you would like to purchase: '
            },{
                name: 'quantity',
                type: 'input',
                message: 'How much would you like to buy? '
            }
        ]).then(function(answer){
            bamazonApp.queryDB(answer);   
        });
    },    

    logDB : function(){
        var productList = new cliTable({
            head: ['ID','Product','Department','Price','In Stock'],
            colWidths: [10,30,20,10,10]
        });
        bamDB.query('SELECT * FROM products',function(err,res,fields){
            if (err) {
                return undefined;
            } else {
                res.forEach(function(product){
                    var inputRow = [];
                    for (x in product) {
                        inputRow.push(product[x]);
                    }
                    productList.push(inputRow);
                }); 
                console.log(productList.toString());  
                bamazonApp.transaction = bamazonApp.userPrompt();     
            }
        });
    },

    queryDB : function(userChoices){
        bamDB.query('SELECT * FROM products WHERE ?',{item_id : userChoices.productID},function(err,res){
            if (err){
                console.log('That is not a valid product.');
                bamazonApp.engine();
            } else {
                if (res[0].stock_quantity < userChoices.quantity) {
                    console.log('Sorry, insufficient '+res[0].product_name+' in stock.');
                    bamazonApp.engine();
                } else {
                    var cost = res[0].price * userChoices.quantity;
                    var newQuantity = res[0].stock_quantity - userChoices.quantity; 
                    bamDB.query('UPDATE products SET stock_quantity= ? WHERE item_id=?',[newQuantity,userChoices.productID],function(err,res){
                        if (err) {
                            console.log('There was a problem with the request');
                        } else {
                            console.log('Transaction complete. Your cost is $'+cost);
                            bamazonApp.engine();
                        }
                    });
                }
            }
        });
        
    },

    engine : function() {
        this.logDB();
    }
};

bamDB.connect(function(err) {
    if (err) throw err;
    //console.log('connected as id '+ bam.threadId);
    bamazonApp.engine();
});



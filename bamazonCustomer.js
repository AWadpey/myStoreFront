let mysql = require('mysql');
let inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('');
    console.log('Welcome to my store!!');
    console.log('');
    showProducts();

});

function showProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        
        for (i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].item_id + "\n" + ' Product Name: ' + res[i].product_name + '\n' + ' Department: ' + res[i].department_name + '\n' + ' Price: $' + res[i].price + '\n' + ' In Stock: ' + res[i].stock_quantity);
        };
        enterOrder();
    });
};

function enterOrder() {
    inquirer.prompt([
        {
            name: "productId",
            type: "input",
            message: "Please enter the ID of the product you wish to purchase.",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "quantityPurchased",
            type: "input",
            message: "How many units of this product would you like to purchase?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        let productId = answer.productId;
        let quantityPurchased = answer.quantityPurchased;


        connection.query('SELECT * FROM products WHERE item_id=' + productId, function (err, res) {
            if (err) throw err;
            if (res[0].stock_quantity - quantityPurchased >= 0) {
                console.log(' ')
                console.log('Congratulations! Your are now the proud owner of ' + quantityPurchased + ' ' + res[0].product_name + 's!');
                console.log('Your total for this transaction is: $' + (quantityPurchased * res[0].price) + '.')
                console.log(' ')

                connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [res[0].stock_quantity - quantityPurchased, productId],
                    function (err, res) {
                        if (err) throw err;
                        enterOrder();
                        showProducts();
                    });
            }
            else { 
                console.log(' ')
                console.log('Sorry, but we cannot fulfill you order of ' + quantityPurchased + ' ' + res[0].product_name + '. ' + 'We only have ' + res[0].stock_quantity + ' ' + res[0].product_name + ' in stock. \n Please enter a lower quantity, or choose a different product. Thank you for shopping with us!');
                console.log(' ')

                enterOrder();
                showProducts();
            }
        });
    });
};
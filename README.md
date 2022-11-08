# Vending Machine
 A REST API simulation of a vending machine. The project is done using NodeJS Express with Typescript. The Server is not coupled with any database.

## How To Run
 The server runs by default at port 80 can be changed by supplying the environment varible PORT to use your desired port.
 A live server to interact with may be available using the following link https://sam-vending-machine.herokuapp.com/

### Using Node 
 Clone the code to your system, ensure nodejs is installed. Then run the  following commands to start the server. Default port is 80

    npm install; npm run build; npm start
### Using Docker
    docker image build -t vendingmachine .
    docker run --name=vendingmachine -p 80:80 -d vendingmachine
  Using docker compose, you can use the ready dockercompose file

    docker-compose -f docker-compose.yml up -d

## How To Use
 A POSTMAN API collections are included within the source which include or the available requests the server can receive.

## Products and Purchase
 This are the end points the customer or client will be engaging with
 Swap the server url with the necessary values

  Gets all products

    <hostURL:PORT>/api/public/products

 Get A product using its ID

    <hostURL:PORT>/api/public/products/<productID>
    
 Complete Purchase 
 
 Required values: id(productID), quantity, amountJSON(money)
 
 Using POST method:
    
    POST method: <hostURL:PORT>/api/products/purchase<productID>
    Required Body values
    id: productID
    quantity: number of product
    amountJSON: amount of money in denominations eg 1 500$ Note 2 20$ coins {"500":1, "20":2}


Using GET Method (For easing testing with browser) similar with post

    <hostURL:PORT>/api/products/purchase/get?id=<productID>&quantity=<quantity>&amountJSON=<amountJSON>

## Maintainance
### 1 Adding a new product slot  to the vending machine

    PUT method: <hostURL:PORT>/api/maintainance/prodcut/create
Required body values

    name: product name
    price: the price of the product
    quantity: the quantity of products in the slot


Using GET Method (For easing testing with browser) similar to the post version

    <hostURL:PORT>/api/maintainance/product/create?id=<productID>&name=<name>&quantity=<quantity>&price=<price>


### 2 Updating price and quantity of a certain product

    PATCH method: <hostURL:PORT>/api/maintainance/prodcut/update/<productID>
Required values
    
    id: product id
    price: the price of the product
    quantity: the quantity of products in the slot

Using GET Method (For easing testing with browser) -- similar as post

    <hostURL:PORT>/api/maintainance/product/update/<productID>?quantity=<quantity>


### 3 Checking the current change inventory status
    
    GET method: <hostURL:PORT>/api/maintainance/change


### 4 Adding or Dedcuting denominations of money from the change inventory

      PATCH method: <hostURL:PORT>/api/maintainance/change
Requred Values

    update: boolean value. if yes add or subtract the change amounts as specified in the changeJSON eg {"1000":-1} remove 1 1000$ note/coin if no the server will set the new value of denomination amount as withing the provided change JSON

    changeJSON: JSON representation of the change denomination eg   {"1000":20, "50":32} view reference below for all available fields

Using GET Method (For easing testing with browser)

    <hostURL:PORT>/api/maintainance/change/update?update=<update>&changeJSON=<changeJSON>


### Reference
 Change JSON refence
 Can be modified by changing the model schema to support different denominations for different currencies

    changeJSON = {
    "1000": 10,
    "500": 6,
    "200": 8,
    "100": 4,
    "50": 12,
    "40": 11,
    "20": 31,
    "10": 23,
    "5": 32,
    "1": 43
    }
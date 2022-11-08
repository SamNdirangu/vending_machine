# Vending Machine
 A REST API simulation of a vending machine. The project is done using NodeJS Express with Typescript. The Server is not coupled with any database.

## How To Run
 The server runs by default at port 80 can be changed by supplying the environment varible PORT to use your desired port.
 A live server to interact with may be available using the following link https://samvendingmachine.herokuapp.com/

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

### Products and Purchase
 This are the end points the customer or client will be engaging with
 Swap the <> with the necessary values

  Gets all products

    <hostURL:PORT>/api/products

 Get A product using its ID

    <hostURL:PORT>/api/products/<productID>
    
 Complete Purchase 
 
 Required values: id(productID), quantity, amount(money)
 
 Using POST method:
    
    POST method: <hostURL:PORT>/api/products/purchase<productID>

Using GET Method (For easing testing with browser)

    <hostURL:PORT>/api/products/purchase/get?id=<productID>&quantity=<quantity>&amount=<amount>

### Maintainance
 Adding a new product type  to the vending machine

    PUT method: <hostURL:PORT>/api/maintainance/prodcut

Using GET Method (For easing testing with browser)

    <hostURL:PORT>/api/maintainance/product/create?id=<productID>&name=<name>&quantity=<quantity>&price=<price>


 Adding the quantity of a certain product

    PATCH method: <hostURL:PORT>/api/maintainance/prodcut/<productID>

Using GET Method (For easing testing with browser)

    <hostURL:PORT>/api/maintainance/product/add/<productID>?quantity=<quantity>


 Checking the current change inventory status
    
    GET method: <hostURL:PORT>/api/maintainance/change

 Reseting the change inventory

     PUT method: <hostURL:PORT>/api/maintainance/change

Using GET Method (For easing testing with browser)

    <hostURL:PORT>/api/maintainance/change/set?changeJSON=<changeJSON>


 Adding or Dedcuting denominations of money from the change inventory
 Required Valuues: deduct(true/false), changeJSON

      PATCH method: <hostURL:PORT>/api/maintainance/change

Using GET Method (For easing testing with browser)

    <hostURL:PORT>/api/maintainance/change/update?deduct=<deduct>&changeJSON=<changeJSON>


### Reference
 Change JSON refence

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






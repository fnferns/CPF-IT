# Five Star E-Commerce API Documentation
Sports equipment online store webservice providing data of items in the store and users' account.

## /homepage
**Request Format:** /homepage

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** Address and Coordinate. 

  **Example Request:** /homepage

  ```json
[
  {
    "coordinate":"123.213124124,12312.123124123",
    "address":"Grand Place, Royal Palace, Pranakorn"
  }
]
```

**Example Response:**



**Error Handling:**
Responds with a 400 status plain text message if limit is below 1 or if category is invalid.

__________________________________________________________________________________________________________________________________________________________________________

# Account APIs

## /create_account
**Request Format:** /create_account

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** add user info to database

  **Example Request:** /create_account

  ```json
  {
    "name": "Thanat",
    "surname": "Preukkumwong",
    "birthdate": "05-11-1997",
    "phone_num": "0898098404",
    "email": "book_thanat@gmail.com",
    "password": "MyNameIsBookie",
    "register_time": "03-11-2020 11:42:35",
    "address": {
      "address_name": "CP Tower",
      "street": "245/33 CP Tower, Silom",
      "sub_district": "Bangkhlo",
      "district": "Bangkholaem",
      "province": "Bangkok",
      "postal_code": "10120",
      "notes": "go stright left right",
      "coordinate": {
         "latitude": "131.111111",
         "longtitude": "12.22222222"
      }
    }
  }
```

**Example Response:**
"created account for [username]"


**Error Handling:**
Responds with a 400 status plain text message if limit is below 1 or if category is invalid.

__________________________________________________________________________________________________________________________________________________________________________

## /log_in
**Request Format:** /log_in

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** get user account info

  **Example Request:** /log_in
  
  ```json
  {
    "phone_num": "0898098404",
    "password": "MyNameIsBookie"
  }
```

**Example Response:**

  ```json
  {
    "name": "Thanat",
    "surname": "Preukkumwong",
    "birthdate": "05-11-1997",
    "phone_num": "0898098404",
    "email": "book_thanat@gmail.com",
    "address": {
      "address_name": "CP Tower",
      "street": "245/33 CP Tower, Silom",
      "sub_district": "Bangkhlo",
      "district": "Bangkholaem",
      "province": "Bangkok",
      "postal_code": "10120",
      "notes": "go stright left right",
      "coordinate": {
         "latitude": "131.111111",
         "longtitude": "12.22222222"
      }
    }
  }
```

**Error Handling:**
Responds with a 400 status plain text message if limit is below 1 or if category is invalid.

__________________________________________________________________________________________________________________________________________________________________________

# Menu APIs

## /menu/master
**Request Format:** /menu/master

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Get centralized menu

**Example Request:** /menu/master

**Example Response:**

```json
[
  {
    "menu_id": 1,
    "name": "CHICKEN RICE",
    "price": 69.95,
    "pic_URL":"frkforkofr.com"
  },
  {
    "menu_id": 2,
    "name": "CHICKEN STICKY RICE",
    "price": 69.69,
    "pic_URL":"69420.com"
  }
]
```

**Error Handling:**
Responds with a 400 status plain text message if limit is below 1 or if category is invalid.

__________________________________________________________________________________________________________________________________________________________________________

## /menu/branch
**Request Format:** /menu/branch[?branch=*branch*]

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Get franchise-specific menu, including promotions

**Example Request:** /menu/branch[?branch=TrokChan]

**Example Response:**

```json
[
  {
    "menu_id": 1,
    "name": "CHICKEN RICE",
    "price": 69.95,
    "pic_URL":"frkforkofr.com"
  },
  {
    "menu_id": 2,
    "name": "CHICKEN STICKY RICE",
    "price": 69.69,
    "pic_URL":"69420.com"
  }
]
```

**Error Handling:**
Responds with a 400 status plain text message if limit is below 1 or if category or gender is invalid.

__________________________________________________________________________________________________________________________________________________________________________

## /menu/product
**Request Format:** /menu/product[?product=*product*]

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** get product details

**Example Request:**  /menu/product[?product=*product*]

**Example Response:**

```json
[
  {
    "menu_id": 1,
    "name": "CHICKEN RICE",
    "price": 69.95,
    "pic_URL":"frkforkofr.com",
    "description": "very good chicken and rice"
  },
  {
    "menu_id": 2,
    "name": "CHICKEN STICKY RICE",
    "price": 69.69,
    "pic_URL":"69420.com",
    "description": "nice sticky rice "
  }
]
```

**Error Handling:**
Responds with a 400 status plain text message if limit is below 1 or if category or gender is invalid.


__________________________________________________________________________________________________________________________________________________________________________


## /cart
**Request Format:** /cart[?id=*id*]

**Request Type:** GET

**Returned Data Format**: JSON


**Description:** lists items in cart of a user


**Example Request:**  /cart[?id=1234789327654]

**Example Response:**

```json
  {
    "member_id": 1,
    "member_name": "THanat",
    "items":[{
        "menu_id": 1,
        "name": "CHICKEN RICE",
        "price": 69.95,
        "pic_URL":"frkforkofr.com/redredredredredred",
        "description": "very good chicken and rice"
    }, {
        "menu_id": 2,
        "name": "CHICKEN STICKY RICE",
        "price": 69.69,
        "pic_URL":"69420.com",
        "description": "nice sticky rice "
    }]
  }
```

**Error Handling:**
Responds with a 400 status plain text message if limit is below 1 or if category or gender is invalid.


__________________________________________________________________________________________________________________________________________________________________________









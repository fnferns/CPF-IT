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
    "coordiante":"123.213124124,12312.123124123",
    "Address":"Grand Place, Royal Palace, Pranakorn"
  }
]
```

**Example Response:**



**Error Handling:**
Responds with a 400 status plain text message if limit is below 1 or if category is invalid.

__________________________________________________________________________________________________________________________________________________________________________


## /:menu/master
**Request Format:** /menu/master

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Menu: - Picture URL
Menu Name
Price

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

**Description:** Menu: - Picture URL
Menu Name
Price

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

**Description:** Menu: - Picture URL
Menu Name
Price

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


## /menu/product
**Request Format:** /menu/product[?product=*product*]

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Menu: - Picture URL
Menu Name
Price

**Example Request:**  /menu/product[?product=*product*]

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "CHICKEN RICE",
    "price": 69.95,
    "pic_URL":"frkforkofr.com",
    "description": "very good chicken and rice"
  },
  {
    "id": 2,
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


**Description:** lists items in cart


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



## /cart
**Request Format:** /cart[?id=*id*]

**Request Type:** GET

**Returned Data Format**: JSON


**Description:** lists items in cart


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











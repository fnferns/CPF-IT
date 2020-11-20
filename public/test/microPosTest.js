"use strict";

const baseUrl = "http://localhost:3000";

window.addEventListener("load", () => {
    document.getElementById("getStoresAll")
        .addEventListener("click", getStoresAll);
    document.getElementById("getProductsAll")
        .addEventListener("click", () => {
        getProductsAll('2020-11-13', ['0036', '0023']);
    });
    document.getElementById("checkOrderStatus")
        .addEventListener("click", () => {
        checkOrderStatus('35599999999201113100000', '0999999999');
    });
    document.getElementById("sendOrder")
        .addEventListener("click", () => {
        sendOrder();
    });
    document.getElementById("orderTransactionEnquiry")
        .addEventListener("click", () => {
        orderTransactionEnquiry('35599999999201113100000', '0999999999');
    });
    document.getElementById("checkOrderItems")
        .addEventListener("click", () => {
        checkOrderItems('35520201116152628', '0998882222');
    });
    document.getElementById("cancelOrder")
        .addEventListener("click", () => {
        cancelOrder('35599999999201113100000', '0999999999', 'Im full');
    });
});

function getStoresAll() {
    fetch(baseUrl + "/getStoresAll")
    .then(checkStatus)
    .then(resp => resp.text())
    .then(data => {
        let stores = JSON.parse(data).data.stores;
        document.getElementById("content").textContent = data;
    })
    .catch(err => {
       console.log(err);
    });
}

function getProductsAll(date, stores) {
    let form = new FormData();
    form.append('businessDate', date);
    for (var i = 0; i < stores.length; i++) {
        form.append('stores[]', stores[i]);
    }
    
    fetch(baseUrl + '/getProductsAll', { method : "POST", body : form })
    .then(checkStatus)
    .then(resp => resp.text())
    .then(data => {
        document.getElementById("content").textContent = data;
    })
    .catch(err => {
        console.log(err);
    });
}

function checkOrderStatus(order_num, mobile) {
    fetch(baseUrl + '/checkOrderStatus?order_num=' + order_num + '&mobile=' + mobile)
    .then(checkStatus)
    .then(resp => resp.text())
    .then(data => {
        document.getElementById("content").textContent = data;
    })
    .catch(err => {
        console.log(err);
    });
}

// TODO: testing
function sendOrder() {
    let order_data = {
        order_number: '35599999999201113100000',
        company_code: '355',
        store_code: '9999',
        order_date: '2020-11-13 00:00:00',
        start_time: '2020-11-13 10:00:00',
        end_time: '2020-11-13 11:00:00',
        mobile: '0999999999',
        status: 'P',
        amount: 20.0,
        delivery_type: 'D',
        delivery_fee: 20.0,
        delivery_addr: {
            type_name: 'บ้าน',
            customer_name: 'Tanatip Sawangsri',
            home_number: '696969',
            address1: '696969 Chan Road',
            address2: '',
            latitude: '100.1212',
            longitude: '13.1313',
            note: 'Ring da bell',
            post_code: '10230',
            mobile: '0999999999'
        },
        order_details: [{
            seq: 1,
            product_code: '202011161526283529941',
            product_name: 'Chicken legs',
            quantity: 2.0,
            unit_price: 10.0,
            amount: 20.0,
            net_amount: 20.0,
            item_status: 'N',
            combo_flag: 'N'
        }]
    }
    
    let form = new FormData();
    form.append('order_data', JSON.stringify(order_data));
    
    fetch(baseUrl + '/sendOrder', { method : "POST", body : form })
    .then(checkStatus)
    .then(resp => resp.text())
    .then(data => {
        document.getElementById("content").textContent = data;
    })
    .catch(err => {
        console.log(err);
    });
}

function orderTransactionEnquiry(order_num, mobile) {
    fetch(baseUrl + '/orderTransactionEnquiry?order_num=' + order_num + '&mobile=' + mobile)
    .then(checkStatus)
    .then(resp => resp.text())
    .then(data => {
        document.getElementById("content").textContent = data;
    })
    .catch(err => {
        console.log(err);
    });
}

function checkOrderItems(order_num, mobile) {
    fetch(baseUrl + '/checkOrderItems?order_num=' + order_num + '&mobile=' + mobile)
    .then(checkStatus)
    .then(resp => resp.text())
    .then(data => {
        document.getElementById("content").textContent = data;
    })
    .catch(err => {
        console.log(err);
    });
}

function cancelOrder(order_num, mobile, reason) {
    let form = new FormData();
    form.append('order_number', order_num);
    form.append('mobile_number', mobile);
    form.append('reason', reason);

    fetch(baseUrl + '/cancelOrder', { method : "POST", body : form })
    .then(checkStatus)
    .then(resp => resp.text())
    .then(data => {
        let dataObj = JSON.parse(data);
        if (dataObj.message != 'SUCCESS') {
            console.log(dataObj.message);
        }
        document.getElementById("content").textContent = data;
    })
    .catch(err => {
        console.log(err);
    });
}

function checkStatus(response) {
    if (!response.ok) { // response.status >= 200 && response.status < 300
        throw new Error("Error:" + response.status + " in request: " + response.statusText);
    }
    return response;
}
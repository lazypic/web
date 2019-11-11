
function calculate() {
    let product = document.getElementById("productCost");
    let cost = product.options[product.selectedIndex].value;
    let rate = document.getElementById("rate").value;
    let per = document.getElementById("per").value;
    let month = document.getElementById("month").value;
    let vat = 1;
    let server = 0;
    if (document.getElementById("setServer").checked) {
        server += 5000000;
    }
    if (document.getElementById("setVAT").checked) {
        vat = 1.1;
    }
    let total = ((cost * per * month * rate) + server) * vat;
    let result = numberWithCommas(floor(total));
    document.getElementById("result").innerHTML = result;
}

function numberWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 클라이언트가 입급하기 편하도록 만원단위로 절삭한다.
function floor(n) {
	return Math.floor(n*0.0001) * 10000
}
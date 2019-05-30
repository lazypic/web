const netIncome = 1.1; // 순이익율
const incomeTax = 0.03; // 소득세
const localIncomeTax = 0.003; // 지방소득세

var doc = {
	title:"",
	num:"",
	writedate:"",
	unit:"￦",
	items:[],
};

function initItem() {
    document.getElementById("doctitleInput").value = "";
    document.getElementById("title").value = "";
    document.getElementById("type").value = "Service";
    document.getElementById("hour").value = 1;
    document.getElementById("pers").value = 4;
    document.getElementById("charge").value = 55457;
}

function numberWithCommas(n) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function newTitle() {
    var title = document.getElementById("doctitleInput").value;
	if ( title == "" ) {
		return
	};
	document.getElementById("doctitle").innerHTML = "Title : " + title;
	// init doc title
    document.getElementById("doctitleInput").value = "";
}

function newItem() {
    let title = document.getElementById("title").value;
	if ( title == "" ) {
		return
	};
	let d = new Date();
	let id = d.getTime();
	let type = document.getElementById("type").value;
	let hour = Number(document.getElementById("hour").value);
	let pers = Number(document.getElementById("pers").value);
	let charge = Number(document.getElementById("charge").value);
	let sar = 1.0
	if ( pers > 4 ) {
		sar = 1.0 + (pers * 0.0005)
	}
	let subtotal = Math.round(hour * sar * charge);
	let total = Math.round(netIncome * subtotal);
    let tbody = document.getElementById("list");
    let tr = document.createElement("tr");
	let item = {};
	item["id"] = id;
	item["type"] = type;
	item["title"] = title;
	item["hour"] = hour;
	item["pers"] = pers;
	item["charge"] = charge;
	item["subtotal"] = subtotal;
	item["netIncome"] = netIncome;
	item["total"] = total;
	doc.items.push(item);
	tr.setAttribute("id", id);
	tr.setAttribute("class","item");
	let subTotalWithCommas = doc.unit + " " + numberWithCommas(subtotal);
	let chargeWithCommas = doc.unit + " " + numberWithCommas(charge);
	let totalWithCommas = doc.unit + " " + numberWithCommas(total);
    let iType = document.createElement("td");
	iType.appendChild(document.createTextNode(type));
	iType.setAttribute("class","text-center");
	let iTitle = document.createElement("td");
	iTitle.setAttribute("class","text-center");
	iTitle.appendChild(document.createTextNode(title));
    let iHour = document.createElement("td");
	iHour.setAttribute("class","text-right");
	iHour.appendChild(document.createTextNode(hour));
    let iPers = document.createElement("td");
	iPers.setAttribute("class","text-right");
	iPers.appendChild(document.createTextNode(pers));
    let iSar = document.createElement("td");
	iSar.setAttribute("class","text-right");
	iSar.appendChild(document.createTextNode(sar));
    let iCharge = document.createElement("td");
	iCharge.setAttribute("class","text-right");
	iCharge.appendChild(document.createTextNode(chargeWithCommas));
    let iSubTotal = document.createElement("td");
	iSubTotal.setAttribute("class","text-right");
	iSubTotal.appendChild(document.createTextNode(subTotalWithCommas));
    let iDiscount = document.createElement("td");
	iDiscount.setAttribute("class","text-right");
	iDiscount.appendChild(document.createTextNode(netIncome));
    let iTotal = document.createElement("td");
	iTotal.setAttribute("class","text-right");
	iTotal.appendChild(document.createTextNode(totalWithCommas));

	tr.appendChild(iType);
	tr.appendChild(iTitle);
	tr.appendChild(iHour);
	tr.appendChild(iPers);
	tr.appendChild(iSar);
	tr.appendChild(iCharge);
	tr.appendChild(iSubTotal);
	tr.appendChild(iDiscount);
	tr.appendChild(iTotal);
    tr.onclick = removeItem;
    tbody.appendChild(tr);
	initItem();
	updateTotal();
}

function removeItem(e) {
	id = e.target.parentElement.getAttribute("id");

	// remove items
	for ( i = 0; i < doc.items.length; i++){ 
	   	if ( doc.items[i]["id"] == id) {
			 doc.items.splice(i, 1); 
	   	};
	};
	// remove self
    e.target.parentElement.remove(e.target);
	updateTotal();
}

// 클라이언트가 입급하기 편하도록 만원단위로 절삭한다.
function floor(n) {
	return Math.floor(n*0.0001) * 10000
}

function updateTotal() {
	var itemsHour = 0;
	var itemsCharge = 0;
	var itemsSubTotal = 0;
	var itemsTotal = 0;
	var tax = 0;
	var localTax = 0;
	for (i = 0; i < doc.items.length; i++) {
		itemsHour += doc.items[i]["hour"];
		itemsCharge += doc.items[i]["charge"];
		itemsSubTotal += doc.items[i]["subtotal"];
		itemsTotal += doc.items[i]["total"];
	}
	floorItemsTotal = floor(itemsTotal);
	document.getElementById("preTax").innerHTML = doc.unit + " " + numberWithCommas(floorItemsTotal);
	tax = floorItemsTotal * incomeTax;
	document.getElementById("incomeTax").innerHTML = doc.unit + " " + numberWithCommas(tax);
	localTax = floorItemsTotal * localIncomeTax;
	document.getElementById("localIncomeTax").innerHTML = doc.unit + " " + numberWithCommas(localTax);
	document.getElementById("afterTax").innerHTML = doc.unit + " " + numberWithCommas(floorItemsTotal - tax - localTax);
	// DETAIL FOR CONSOLIDATED BILL 항목 업데이트
	document.getElementById("itemsHour").innerHTML = itemsHour;
	document.getElementById("itemsCharge").innerHTML = doc.unit + " " + numberWithCommas(itemsCharge);
	document.getElementById("itemsSubTotal").innerHTML = doc.unit + " " + numberWithCommas(itemsSubTotal);
	document.getElementById("itemsTotal").innerHTML = doc.unit + " " + numberWithCommas(itemsTotal);
}

function inputForm() {
	var inputTitleForm = document.getElementById('doctitleInput');
	inputTitleForm.style.display='block';
	var inputItemForm = document.getElementById('itemInput');
	inputItemForm.style.display='block';
	var link = document.getElementById('link');
	link.style.display='block';
}

function printMode() {
	var inputTitleForm = document.getElementById('doctitleInput');
	inputTitleForm.style.display='none';
	var inputItemForm = document.getElementById('itemInput');
	inputItemForm.style.display='none';
	var link = document.getElementById('link');
	link.style.display='none';

	window.print();
}

function writeDate() {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	doc.writedate = `Created : ${y}. ${m}. ${d}`;
	document.getElementById("writeDate").innerHTML = doc.writedate;
}

function docNum() {
	var d = new Date();
	var year = d.getFullYear();
	var month = (d.getMonth() + 1).toString();
	var day = d.getDate().toString();
	var hour = d.getHours().toString();
	if (month.length === 1) {
		month = "0" + month;
	}
	if (day.length === 1) {
		day = "0" + day;
	}
	if (hour.length === 1) {
		hour = "0" + hour;
	}
	doc.num = "No. " + year + month + day + hour;
	document.getElementById("docnum").innerHTML = doc.num;
}

// enter를 치거나 add버튼을 클릭한다면 아이템이 보여야 한다.
document.body.onkeyup = function(e) {
    if (e.keyCode == 13) {
        newItem();
		newTitle();
    }
};
document.getElementById('add').addEventListener('click',newItem);

// auto load
window.onload=writeDate()
window.onload=docNum()

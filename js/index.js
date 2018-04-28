$(document).ready(function() {
	$('input[type="text"]').live('focus', function() {
	    var inp = this;
	    //alert("HI");
	    setTimeout(function() {
	        inp.select();
	    }, 1);
	});

});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function showPurchase(newValue) {
	var pp = newValue
	document.getElementById("range").value = "$"+numberWithCommas(pp);
	var dp = document.getElementById("range2").value;
	document.getElementById("range3").value = "$"+numberWithCommas(((parseInt(dp,10)/100)*pp).toFixed(0));	//no decimals
	verify();
}
function showDownPay(newValue) {
	var pp;
	var dp = newValue;
	pp = parseInt((document.getElementById("range").value).toString().replace(/[^a-zA-Z 0-9]+/g,''),10);	//remove all special chars
	document.getElementById("range2").value = dp+" %";
	document.getElementById("range3").value = "$"+numberWithCommas(((parseInt(dp,10)/100)*pp).toFixed(0));
	document.getElementById("range").value = "$"+numberWithCommas(pp);
	verify();
}
function changedPP(newValue) {
    var pp = parseInt(newValue.toString().replace(/[^a-zA-Z 0-9]+/g,''),10);
    if (isNaN(pp)) {
        pp = "0";
    }
    document.getElementById("range").value = "$"+numberWithCommas(pp);
    var dp = document.getElementById("range2").value;
    document.getElementById("range3").value = "$"+numberWithCommas(((parseInt(dp,10)/100)*pp).toFixed(0));    //no decimals
    verify();
}
function changedDP(newValue) {
	//alert("changedDP");	
	var dp = newValue;
	var pp = parseInt((document.getElementById("range").value).toString().replace(/[^a-zA-Z 0-9]+/g,''),10);

	document.getElementById("range2").value = dp;
	document.getElementById("range3").value = "$"+numberWithCommas(((parseInt(dp,10)/100)*pp).toFixed(0));
	verify();
}
function focusoutDP(newValue) {
	//alert("focusoutDP");
	var dp = newValue.replace(/%/gi,'');
    if (isNaN(dp)) {
        dp = "0";
        document.getElementById("range3").value = "$0";
    }
	document.getElementById("range2").value = dp+" %";
	verify();
}
function changedDPV(newValue) {
    var dpv = parseInt(newValue.toString().replace(/[^a-zA-Z 0-9]+/g,''),10);
    var pp = parseInt((document.getElementById("range").value).toString().replace(/[^a-zA-Z 0-9]+/g,''),10);
    if (isNaN(dpv)) {
        dpv = "0";
    }
    document.getElementById("range2").value = numberWithCommas(((dpv/pp)*100).toFixed(0))+" %";
    document.getElementById("range3").value = "$"+numberWithCommas(dpv);
    verify();
}
function changedIR(newValue) {
	var ir = newValue;
	document.getElementById("interest").value = ir+" %";
	verify();
}
function focusoutIR(newValue) {
	var ir = newValue.replace(/%/gi,'');
	document.getElementById("interest").value = ir+" %";
	verify();
}
function calculate() {
	var mt;
	if (document.getElementById('m1').checked) {
		mt = parseInt(document.getElementById('m1').value,10);
	} else if(document.getElementById('m2').checked) {
		mt = parseInt(document.getElementById('m2').value,10);
	}
	var pp = parseInt((document.getElementById("range").value).toString().replace(/[^a-zA-Z 0-9]+/g,''),10);
	var dpv = parseInt((document.getElementById("range3").value).toString().replace(/[^a-zA-Z 0-9]+/g,''),10);
	var ir = parseFloat(document.getElementById("interest").value,10);
}
function show() {
	var mt;
	if (document.getElementById('m1').checked) {
		mt = parseInt(document.getElementById('m1').value,10);
	} else if(document.getElementById('m2').checked) {
		mt = parseInt(document.getElementById('m2').value,10);
	}
	var pp = parseInt((document.getElementById("range").value).toString().replace(/[^a-zA-Z 0-9]+/g,''),10);
	var dpv = parseInt((document.getElementById("range3").value).toString().replace(/[^a-zA-Z 0-9]+/g,''),10);
	var ir = parseFloat(document.getElementById("interest").value,10);
	var princ = pp - dpv;
	var intRate = (ir/100)/12;
    var months = mt * 12;
	document.getElementById("range4").innerHTML = "$"+numberWithCommas((((princ*intRate)/(1-Math.pow(1+intRate,(-1*months)))*100)/100).toFixed(2));
}
function verify() {
	if(document.getElementById("interest").value.trim() != "") {
		document.getElementById("calc").disabled = false;
		show();
	} else {
		document.getElementById("calc").disabled = true;
	}
}
function enterCheck() {
	if(characterCode == 13) {
		show();
	}
}
var proportion = 2;
var padd = 20;

function printBase() {
	var canvas = document.getElementById('pictBase');
	var ctx = canvas.getContext("2d");
	ctx.font = "14px Arial";
	ctx.fillStyle = "#FFF";
	ctx.strokeStyle = "#000";
	
	ctx.fillRect  (0, 0, canvas.width, canvas.height);
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000";

	var baseW = proportion * parseInt(this.baseW.value,10);
	var baseH = proportion * parseInt(this.baseH.value,10);
	var baseD = proportion * parseInt(this.baseD.value,10);
	
	// ctx.fillText('1% ' + baseW, 80, 10);
	ctx.fillText(baseW/proportion + ' см', padd + baseW/2, padd - 5);
	ctx.fillText(baseH/proportion + ' см', padd + 5 + baseW, padd + baseH/2);
	
	ctx.strokeRect(padd, padd, baseW, baseH);
	
	ctx.fillStyle = "#EEE";
	var baseHI = baseH;
	var countD = 0;
	while (baseHI > baseH / 2) {
		baseHI = baseHI - baseD;
	}
	
	// left
	ctx.strokeRect(padd, padd + baseD, baseD, baseHI - baseD);
	ctx.fillRect  (padd, padd + baseD, baseD, baseHI - baseD);

	// right
	ctx.strokeRect(padd + baseW - baseD, padd + baseD, baseD, baseHI - baseD);
	ctx.fillRect  (padd + baseW - baseD, padd + baseD, baseD, baseHI - baseD);

	// top
	ctx.strokeRect(padd, padd, baseW, baseD);
	ctx.fillRect  (padd, padd, baseW, baseD);
	countD++;

	// bottom
	var baseHI = baseH;
	while (baseHI > baseH / 2) {
		ctx.strokeRect(padd, padd + baseHI - baseD, baseW, baseD);
		ctx.fillRect  (padd, padd + baseHI - baseD, baseW, baseD);
		countD++;
		baseHI = baseHI - baseD;
	}

	ctx.fillStyle = "#000";
	ctx.fillText(baseH/proportion + 'x' + baseD/proportion + ' см' + '    x    2 шт', padd, baseH + 2*padd);
	ctx.fillText(baseW/proportion + 'x' + baseD/proportion + ' см' + '    x    ' + countD + ' шт', padd, baseH + 3*padd);
	ctx.fillText('Всего: ' + ((baseW/proportion)*(countD) + (baseH/proportion)*2) + 'x' + baseD/proportion + ' см', padd, baseH + 4*padd);
}

function printFront() {
	var canvas = document.getElementById('pictFront');
	var ctx = canvas.getContext("2d");
	ctx.font = "14px Arial";
	ctx.fillStyle = "#FFF";
	ctx.strokeStyle = "#000";
	
	ctx.fillRect  (0, 0, canvas.width, canvas.height);
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000";
	
	var baseW = proportion * parseInt(this.baseW.value,10);
	var baseB = proportion * parseInt(this.baseB.value,10);
	var baseD = proportion * parseInt(this.baseD.value,10);

	var doorW = proportion * parseInt(this.doorW.value,10);
	var doorH = proportion * parseInt(this.doorH.value,10);
	var isgiH = proportion * parseInt(this.isgiH.value,10);
	var angel = parseInt(this.angel.value,10);

	var w = canvas.width;
	var h = canvas.height;
	
	ctx.strokeRect(w/2 - baseW/2, h - 2*baseB - padd, baseW, baseB);
	ctx.strokeRect(w/2 - baseW/2, h - baseB - padd, baseD, baseB);
	ctx.strokeRect(w/2 + baseW/2 - baseD, h - baseB - padd, baseD, baseB);
	
	var np1 = (baseW - doorW)/2;
	var dk1 = doorH + 2*baseB;
	var dk2 = doorW + 6*baseB;
	var pk1 = (isgiH / Math.cos(Math.PI/(180/angel))).toFixed(2);
	var pk1_a = (pk1 * Math.sin(Math.PI/(180/angel)));

	ctx.fillText(np1/proportion + ' см', w/2 - baseW/2 - 3*padd, h - 2*baseB - padd);
	ctx.fillText(dk1/proportion + ' см', w/2 - baseW/2 + np1 + baseB, h - 2*baseB - padd - dk1/2);
	ctx.fillText(dk2/proportion + ' см', w/2, h + baseB - padd - dk1);	
	ctx.fillText(pk1/proportion + ' см', w/2 - baseW/2 - 5*padd, h - 5*baseB  - isgiH/2 - padd);
	
	ctx.fillStyle = "#EEE";

	// np1 left
	ctx.strokeRect(w/2 - baseW/2, h - 3*baseB - padd, np1, baseB);
	ctx.fillRect  (w/2 - baseW/2, h - 3*baseB - padd, np1, baseB);
	
	// np1 right
	ctx.strokeRect(w/2 + baseW/2 - np1, h - 3*baseB - padd, np1, baseB);
	ctx.fillRect  (w/2 + baseW/2 - np1, h - 3*baseB - padd, np1, baseB);
	
	// dk1 left
	ctx.strokeRect(w/2 - baseW/2 + np1 - baseB, h - 2*baseB - padd - dk1, baseB, dk1);
	ctx.fillRect  (w/2 - baseW/2 + np1 - baseB, h - 2*baseB - padd - dk1, baseB, dk1);
	
	// dk1 rigth
	ctx.strokeRect(w/2 + baseW/2 - np1, h - 2*baseB - padd - dk1, baseB, dk1);
	ctx.fillRect  (w/2 + baseW/2 - np1, h - 2*baseB - padd - dk1, baseB, dk1);
	
	// dk2
	ctx.strokeRect(w/2 - dk2/2, h - 2*baseB - padd - dk1, dk2, baseB);
	ctx.fillRect  (w/2 - dk2/2, h - 2*baseB - padd - dk1, dk2, baseB);
	
	// pk1 left
	ctx.beginPath();
	ctx.moveTo(w/2 - baseW/2, h - 3*baseB - padd);
	ctx.lineTo(w/2 - baseW/2 - pk1_a, h - 3*baseB - padd - isgiH);
	ctx.lineTo(w/2 - baseW/2 - pk1_a + baseB, h - 3*baseB - padd - isgiH);
	ctx.lineTo(w/2 - baseW/2 + baseB, h - 3*baseB - padd);
	ctx.lineTo(w/2 - baseW/2, h - 3*baseB - padd);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	
	// pk1 right
	ctx.beginPath();
	ctx.moveTo(w/2 + baseW/2 - baseB, h - 3*baseB - padd);
	ctx.lineTo(w/2 + baseW/2 + pk1_a, h - 3*baseB - padd - isgiH);
	ctx.lineTo(w/2 + baseW/2 + pk1_a + baseB, h - 3*baseB - padd - isgiH);
	ctx.lineTo(w/2 + baseW/2, h - 3*baseB - padd);
	ctx.lineTo(w/2 + baseW/2, h - 3*baseB - padd);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	
	// dk1
	// ctx.fillRect  (padd, padd + baseHI - baseD, baseW, baseD);
/*	var baseW = proportion * parseInt(this.baseW.value,10);
	var baseH = proportion * parseInt(this.baseH.value,10);
	var baseD = proportion * parseInt(this.baseD.value,10);*/
}


function printBack() {
	var canvas = document.getElementById('pictBack');
	var ctx = canvas.getContext("2d");
	ctx.font = "14px Arial";
	ctx.fillStyle = "#FFF";
	ctx.strokeStyle = "#000";
	
	var w = canvas.width;
	var h = canvas.height;
	ctx.fillRect  (0, 0, w, h);
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000";

	var baseW = proportion * parseInt(this.baseW.value,10);
	var baseB = proportion * parseInt(this.baseB.value,10);


	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	
/*	
	var baseH = proportion * parseInt(this.baseH.value,10);
	var baseD = proportion * parseInt(this.baseD.value,10);*/
}

function printPict() {
	printBase();
	printFront();
	printBack();
};

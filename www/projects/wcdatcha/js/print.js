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

function crossed(ctx, x, y, baseB) {
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + baseB, y);
	ctx.lineTo(x, y + baseB);
	ctx.lineTo(x + baseB, y + baseB);
	ctx.lineTo(x, y);
	ctx.lineTo(x, y + baseB);
	ctx.lineTo(x + baseB, y + baseB);
	ctx.lineTo(x + baseB, y);
	ctx.closePath();
	ctx.stroke();
}

function rect(ctx, x1, y1, w, h) {
	ctx.strokeRect(x1, y1, w, h);
	ctx.fillRect  (x1, y1, w, h);
}

function rect2(ctx, x1, y1, x2, y2, x3, y3, x4, y4) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.lineTo(x4, y4);
	ctx.lineTo(x1, y1);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

function distance(x1,y1,x2,y2) {
	var xd = x2 - x1;
	var yd = y2 - y1;
	return Math.pow((xd*xd + yd*yd),0.5);
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
	var ps1 = pk1_a + np1 + baseB;
	var pv1_a1 = ps1 - 2*baseB;
	var pv1_b1 = dk1 - isgiH;
	var pv1_a2 = ps1 + doorW/2;
	var pv1_b2 = (pv1_b1*pv1_a2)/pv1_a1;
	var pv1 = Math.pow(pv1_a2*pv1_a2 + pv1_b2*pv1_b2, 0.5);
	
	ctx.fillText(np1/proportion + ' см', w/2 - baseW/2 - 3*padd, h - 2*baseB - padd);
	ctx.fillText(dk1/proportion + ' см', w/2 - baseW/2 + np1 + baseB, h - 2*baseB - padd - 2*(dk1/3));
	ctx.fillText(dk2/proportion + ' см', w/2, h + baseB - padd - dk1);	
	ctx.fillText(pk1/proportion + ' см', w/2 - baseW/2 - 5*padd, h - 5*baseB  - isgiH/2 - padd);
	ctx.fillText((ps1/proportion).toFixed(2) + ' см', w/2 - doorW/2 - padd - ps1/2, h - padd - isgiH - padd);
	ctx.fillText((pv1/proportion).toFixed(2) + ' см', w/2 - doorW - padd - ps1/2, h - dk1 - padd);
	ctx.fillStyle = "#EEE";

	// ps1 left
	rect(ctx, w/2 - doorW/2 - ps1, h - 2*baseB - padd - isgiH, ps1, baseB);
	
	// ps1 right
	rect(ctx, w/2 + doorW/2, h - 2*baseB - padd - isgiH, ps1, baseB);

	// pk1 left
	rect2(ctx,
		w/2 - baseW/2, h - 2*baseB - padd,
		w/2 - baseW/2 - pk1_a, h - 2*baseB - padd - isgiH,
		w/2 - baseW/2 - pk1_a + baseB, h - 2*baseB - padd - isgiH,
		w/2 - baseW/2 + baseB, h - 2*baseB - padd);
	
	// alert("" + (distance(w/2 - baseW/2, h - 2*baseB - padd, w/2 - baseW/2 - pk1_a, h - 2*baseB - padd - isgiH)/proportion) + "cm");
	
	// pk1 right
	rect2(ctx,
		w/2 + baseW/2 - baseB, h - 2*baseB - padd,
		w/2 + baseW/2 + pk1_a - baseB, h - 2*baseB - padd - isgiH,
		w/2 + baseW/2 + pk1_a, h - 2*baseB - padd - isgiH,
		w/2 + baseW/2, h - 2*baseB - padd);

	// pv1 left
	rect2(ctx,
		w/2 - doorW/2 - ps1, h - 2*baseB - padd - isgiH,
		w/2 - doorW/2 - ps1 + baseB, h - 2*baseB - padd - isgiH,
		w/2, h - 2*baseB - padd - isgiH - pv1_b2,
		w/2 - baseB, h - 2*baseB - padd - isgiH - pv1_b2);

	// pv1 left
	rect2(ctx,
		w/2 + doorW/2 + ps1, h - 2*baseB - padd - isgiH,
		w/2 + doorW/2 + ps1 - baseB, h - 2*baseB - padd - isgiH,
		w/2, h - 2*baseB - padd - isgiH - pv1_b2,
		w/2 + baseB, h - 2*baseB - padd - isgiH - pv1_b2);

	// alert("" + (distance(w/2 + doorW/2 + ps1 - baseB, h - 2*baseB - padd - isgiH, w/2, h - 2*baseB - padd - isgiH - pv1_b2)/proportion) + "cm");
	
	// np1 left
	rect(ctx, w/2 - baseW/2, h - 3*baseB - padd, np1, baseB);
	
	// np1 right
	rect(ctx, w/2 + baseW/2 - np1, h - 3*baseB - padd, np1, baseB);
	
	// dk1 left
	rect(ctx, w/2 - baseW/2 + np1 - baseB, h - 2*baseB - padd - dk1, baseB, dk1);
	
	// dk1 rigth
	rect(ctx, w/2 + baseW/2 - np1, h - 2*baseB - padd - dk1, baseB, dk1);
	
	// np1 x dk1 left
	crossed(ctx, w/2 - baseW/2 + np1 - baseB, h - 3*baseB - padd, baseB);

	// np1 x dk1 right
	crossed(ctx, w/2 + baseW/2 - np1, h - 3*baseB - padd, baseB);
	
	// dk2
	ctx.strokeRect(w/2 - dk2/2, h - 2*baseB - padd - dk1, dk2, baseB);
	ctx.fillRect  (w/2 - dk2/2, h - 2*baseB - padd - dk1, dk2, baseB);
	
	// dk1 x dk2 left
	crossed(ctx, w/2 - dk2/2 + (dk2/2 - doorW/2) - baseB, h - 2*baseB - padd - dk1, baseB);
	
	// dk1 x dk2 right
	crossed(ctx, w/2 + dk2/2 - (dk2/2 - doorW/2), h - 2*baseB - padd - dk1, baseB);
	
	// dk1 x ps1 left
	crossed(ctx, w/2 - doorW/2 - baseB, h - 2*baseB - padd - isgiH, baseB);
	
	// dk1 x ps1 right
	crossed(ctx, w/2 + doorW/2, h - 2*baseB - padd - isgiH, baseB);

	
	// pk1_a
	
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

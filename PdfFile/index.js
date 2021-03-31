module.exports = (arr) => {
	const today = new Date();

	var subTotal0 = arr[0] === '' ? 0 :parseFloat(parseFloat(parseFloat(arr[0].sellingRate)* parseFloat(arr[0].checkout)).toFixed(2));
	var gstAmt0 = arr[0] === '' ? 0 :parseFloat((parseFloat((arr[0].gst)/100)*subTotal0).toFixed(2));
	var subTotal1 = arr[1] === '' ? 0 :parseFloat(parseFloat(parseFloat(arr[1].sellingRate)* parseFloat(arr[1].checkout)).toFixed(2));
	var gstAmt1 = arr[1] === '' ? 0 :parseFloat((parseFloat((arr[1].gst)/100)*subTotal1).toFixed(2));
	var subTotal2 = arr[2] === '' ? 0 :parseFloat(parseFloat(parseFloat(arr[2].sellingRate)* parseFloat(arr[2].checkout)).toFixed(2));
	var gstAmt2 = arr[2] === '' ? 0 :parseFloat((parseFloat((arr[2].gst)/100)*subTotal2).toFixed(2));
	var subTotal3 =arr[3] === '' ? 0 : parseFloat(parseFloat(parseFloat(arr[3].sellingRate)* parseFloat(arr[3].checkout)).toFixed(2));
	var gstAmt3 = arr[3] === '' ? 0 :parseFloat((parseFloat((arr[3].gst)/100)*subTotal3).toFixed(2));
	var totalGst = parseFloat(gstAmt0 + gstAmt1+ gstAmt2 + gstAmt3).toFixed(2)
	var subTotal = parseFloat(subTotal0+subTotal1+subTotal2+subTotal3).toFixed(2)
	var total = parseFloat(totalGst) + parseFloat(subTotal)
	var grandTotal = parseFloat(total).toFixed(2);
	const demo = () => {
		let hello = '';
		for(let i = 0; i < 3; i++) {
			hello += `<tr>
			<td>1</td>
			<td>${arr[0].itemCode}</td>
			<td style="text-align: left">
				<strong>${arr[0].item}</strong><br>
				<div style="font-size: 8px">
				Batch: ${arr[0].lotNo}<br>
				Expiry: ${arr[0].exp=== null?'':arr[0].exp.split('T')[0].split('-')[2] + '-' + arr[0].exp.split('T')[0].split('-')[1] + '-' + arr[0].exp.split('T')[0].split('-')[0]}
				</div>
			</td>
			<td>${arr[0].hsn}</td>
			<td>${arr[0].checkout}</td>
			<td>${arr[0].uom}</td>
			<td>${parseFloat(arr[0].sellingRate)}</td>
			<td>${subTotal0}</td>
			<td>${arr[0].gst}</td>
			<td>${gstAmt0}</td>
			<td>${(parseFloat(arr[0].gst)/100)*(parseFloat(arr[0].sellingRate)* parseFloat(arr[0].checkout))+ parseFloat(arr[0].sellingRate)* parseFloat(arr[0].checkout)}</td>
		</tr>`
		}
		return hello;
	}
 
 return `
 <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Invoice</title>
		<link rel="stylesheet" href="styles.css">
		<style type="text/css">@import url(https://fonts.googleapis.com/css?family=Open+Sans:400, ) 400i,  600,  600i,  700;
		a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, sup, table, tbody, td, tfoot, th, thead, time, total, tr, tt, u, ul, var, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:after, blockquote:before, q:after, q:before {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	body {
		height: 840px;
		width: 650px;
		margin: auto;
		font-family: 'Open Sans', sans-serif;
		font-size: 12px;
	}
	strong {
		font-weight: 700;
	}
	#container {
		position: relative;
		padding: .5%
	}
	#header {
		height: 140px;
		display: flex;
	}
	#header>#reference {
		text-align: right;
		border: 1px solid black;
		border-left: none;
		width: 50%;
		display: flex;
		flex-direction: column;
	}
	#header>#logo {
		width: 50%;
		border: 1px solid black;
	}
	.details {
		height: 46.68px;
		border: 1px solid black;
		border-left: none;
		border-right: none;
		border-top: none;
		display: flex;
	}
	.sub-details {
		width: 50%;
		border-right: 1px solid black;
	}
	#fromto {
		height: 120px;
	}
	#fromto>#from, #fromto>#to {
		width: 45%;
		min-height: 90px;
		margin-top: 10px;
		font-size: 85%;
		padding: 1.5%;
		line-height: 120%}
	#fromto>#from {
		float: left;
		width: 45%;
		background: #efefef;
		margin-top: 10px;
		font-size: 85%;
		padding: 1.5%}
	#fromto>#to {
		float: right;
		border: solid grey 1px;
	}
	#items {
		margin-top: 10px;
	}
	#items>p {
		font-weight: 700;
		text-align: right;
		margin-bottom: 1%;
		font-size: 65%}
	#items>table {
		width: 100%;
		font-size: 85%;
		border: solid grey 1px;
	}
	#items>table th:first-child {
		text-align: left;
	}
	#items>table th {
		font-weight: 400;
		padding: 1px 4px;
	}
	#items>table td {
		padding: 1px 4px;
	}
	#items>table th:nth-child(3) {
		width: 250px;
	}
	#items>table tr td:not(:first-child) {
		text-align: center;
		padding-right: 1%}
	#items table td {
		border-right: solid grey 1px;
	}
	#items table tr td {
		padding-top: 3px;
		padding-bottom: 3px;
		height: 10px;
	}
	#items table tr:nth-child(1) {
		border: solid grey 1px;
	}
	#items table tr th {
		border-right: solid grey 1px;
		padding: 3px;
	}
	#items table tr:nth-child(2)>td {
		padding-top: 8px;
	}
	#summary {
		height: 170px;
		margin-top: 30px;
	}
	#summary #note {
		float: left;
		width: 350px;
	}
	#summary #note h4 {
		font-size: 10px;
		font-weight: 600;
		font-style: italic;
		margin-bottom: 4px;
	}
	#summary #note p {
		font-size: 10px;
		font-style: italic;
	}
	#summary #total table {
		font-size: 85%;
		width: 260px;
		float: right;
	}
	#summary #total table td {
		padding: 3px 4px;
	}
	#summary #total table tr td:last-child {
		text-align: right;
	}
	#summary #total table tr:nth-child(6) {
		background: #efefef;
		font-weight: 600;
	}
	#footer {
		margin: auto;
		position: absolute;
		left: 4%;
		bottom: 4%;
		right: 4%;
		border-top: solid grey 1px;
	}
	#footer p {
		margin-top: 1%;
		font-size: 65%;
		line-height: 140%;
		text-align: center;
	}</style>
	</head>
	<body>
		<div id="container" style="margin-top: 10px;">
			<h3 style="text-align: center; font-weight: 700; font-size: 18px; margin-bottom: 5px;">GST INVOICE</h3>
			<div style="display: flex; flex-direction: column;">
				<div id="header">
					<div id="logo">
						<strong>SATVIK SOLUTIONS</strong></br><br>
						<div style="font-size: 10px;">
							Godarwaripuram, Lower Nathanpur,<br>
							Dehradun -248001<br>
							UTTARAKHAND<br>
							email: satsolindia@gmail.com, Mbl: +919415006121/ +918787050389<br>
							GSTIN : 058CBPN1106J1Z2 , DL# UA-DEH-106185/106186 WEF:06.03.2019
						</div>
					</div>
					<div id="reference">
						<div class="details">
							<div class="sub-details"></div>
							<div class="sub-details" style="border-right: none;"></div>
						</div>
						<div class="details">
							<div class="sub-details"></div>
							<div class="sub-details" style="border-right: none;"></div>
						</div>
						<div class="details" style="border-bottom: none;">
							<div class="sub-details"></div>
							<div class="sub-details" style="border-right: none;"></div>
						</div>
					</div>
				</div>
				<div id="header">
					<div id="logo" style="border-top: none;">
						<strong>SATVIK SOLUTIONS</strong></br><br>
						<div style="font-size: 10px;">
							Godarwaripuram, Lower Nathanpur,<br>
							Dehradun -248001<br>
							UTTARAKHAND<br>
							email: satsolindia@gmail.com, Mbl: +919415006121/ +918787050389<br>
							GSTIN : 058CBPN1106J1Z2 , DL# UA-DEH-106185/106186 WEF:06.03.2019
						</div>
					</div>
					<div id="reference" style="border-top: none;">
						<div class="details">
							<div class="sub-details"></div>
							<div class="sub-details" style="border-right: none;"></div>
						</div>
						<div class="details">
							<div class="sub-details"></div>
							<div class="sub-details" style="border-right: none;"></div>
						</div>
						<div class="details" style="border-bottom: none;">
							
						</div>
					</div>
				</div>
			</div>
			<div id="items">
				<table>
					<tr>
						<th>SL</th>
						<th>Item Code</th>
						<th>Description of Goods</th>
						<th>HSN</th>
						<th>QTY</th>
						<th>UOM</th>
						<th>RATE INR</th>
						<th>SUB TOTAL</th>
						<th>GST%</th>
						<th>GST VALUE</th>
						<th>Amount INR</th>
					</tr>
					<tr>
						<td>1</td>
						<td>${arr[0].itemCode}</td>
						<td style="text-align: left">
							<strong>${item}</strong><br>
							<div style="font-size: 8px">
							Batch:<br>
							Expiry:
							</div>
						</td>
						<td>${7646}</td>
						<td>${82}</td>
						<td>${No.}</td>
						<td>${r65757}</td>
						<td>${6575765}</td>
						<td>${t5r6576}</td>
						<td>${858}</td>
						<td>789</td>
					</tr>
				</table>
			</div>
			<div id="summary">
				<div id="note">
					<br/>
					<h4>Amount Chargeable(in words) :</h4>
					<p>${'INR ' + arr[19]}</p>
				</div>
				<div id="note">
					<br/>
					<h4>Company's Bank Details:</h4>
					<p>Bank Name     :Indian Bank  </p>
					<p>Account Number:6759192854</p>
					<p>Branch        : Indira Nagar,Lucknow -226016  </p>
					<p>IFSC Code     : IDIB0001012  </p>
				</div>
				<div id="total">
					<table>
						<tr>
							<td>Total Amount</td>
							<td>₹${subTotal}</td>
						</tr>
						<tr>
							<td>CGST</td>
							<td>₹${arr[18]?'0':(totalGst)/2}</td>
						</tr>
						<tr>
							<td>SGST</td>
							<td>₹${arr[18]?'0':(totalGst)/2}</td>
						</tr>
						<tr>
							<td>IGST</td>
							<td>₹${arr[18]?totalGst:'0'}</td>
						</tr>
						<tr>
							<td>Total GST Amount</td>
							<td>₹${totalGst}</td>
						</tr>
						<tr>
							<td>Grand Total</td>
							<td>₹${grandTotal}</td>
						</tr>
					</table>
				</div>
				<div style= 'position:absolute;
				bottom:90px;
				right:60px;
				text-align:center'>
				<p>For SATVIK SOLUTIONS</p>
					
					<br/>
					<br/>
					<br/>
				<p>Authorised Signatory</p>
				</div>
				<div id="note">
				<br/>
					<h4>Declaration :</h4>
					<p>We declare that this invoice shows the actual price of the goods described and all particulars are true and correct.</p>
					<p>1. Any claim by the purchaser which is based on a pre dispatcch defects shall be notified within 7 days from the date of the sale.</p>
					<p>2. Interest @24% will be charged in delay payments.</p>
				</div>
			</div>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<div id="footer">
				<p>Subject to Lucknow Jurisdiction</p>
			</div>
		</div>
	</body>
</html>
	`;
 };
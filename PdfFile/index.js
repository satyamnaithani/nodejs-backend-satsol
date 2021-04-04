module.exports = (arr) => {
	// const today = new Date();

	// var subTotal0 = arr[0] === '' ? 0 :parseFloat(parseFloat(parseFloat(arr[0].sellingRate)* parseFloat(arr[0].checkout)).toFixed(2));
	// var gstAmt0 = arr[0] === '' ? 0 :parseFloat((parseFloat((arr[0].gst)/100)*subTotal0).toFixed(2));
	// var subTotal1 = arr[1] === '' ? 0 :parseFloat(parseFloat(parseFloat(arr[1].sellingRate)* parseFloat(arr[1].checkout)).toFixed(2));
	// var gstAmt1 = arr[1] === '' ? 0 :parseFloat((parseFloat((arr[1].gst)/100)*subTotal1).toFixed(2));
	// var subTotal2 = arr[2] === '' ? 0 :parseFloat(parseFloat(parseFloat(arr[2].sellingRate)* parseFloat(arr[2].checkout)).toFixed(2));
	// var gstAmt2 = arr[2] === '' ? 0 :parseFloat((parseFloat((arr[2].gst)/100)*subTotal2).toFixed(2));
	// var subTotal3 =arr[3] === '' ? 0 : parseFloat(parseFloat(parseFloat(arr[3].sellingRate)* parseFloat(arr[3].checkout)).toFixed(2));
	// var gstAmt3 = arr[3] === '' ? 0 :parseFloat((parseFloat((arr[3].gst)/100)*subTotal3).toFixed(2));
	// var totalGst = parseFloat(gstAmt0 + gstAmt1+ gstAmt2 + gstAmt3).toFixed(2)
	// var subTotal = parseFloat(subTotal0+subTotal1+subTotal2+subTotal3).toFixed(2)
	// var total = parseFloat(totalGst) + parseFloat(subTotal)
	// var grandTotal = parseFloat(total).toFixed(2);
	// const demo = () => {
	// 	let hello = '';
	// 	for(let i = 0; i < 3; i++) {
	// 		hello += `<tr>
	// 		<td>1</td>
	// 		<td>${arr[0].itemCode}</td>
	// 		<td style="text-align: left">
	// 			<strong>${arr[0].item}</strong><br>
	// 			<div style="font-size: 8px">
	// 			Batch: ${arr[0].lotNo}<br>
	// 			Expiry: ${arr[0].exp=== null?'':arr[0].exp.split('T')[0].split('-')[2] + '-' + arr[0].exp.split('T')[0].split('-')[1] + '-' + arr[0].exp.split('T')[0].split('-')[0]}
	// 			</div>
	// 		</td>
	// 		<td>${arr[0].hsn}</td>
	// 		<td>${arr[0].checkout}</td>
	// 		<td>${arr[0].uom}</td>
	// 		<td>${parseFloat(arr[0].sellingRate)}</td>
	// 		<td>${subTotal0}</td>
	// 		<td>${arr[0].gst}</td>
	// 		<td>${gstAmt0}</td>
	// 		<td>${(parseFloat(arr[0].gst)/100)*(parseFloat(arr[0].sellingRate)* parseFloat(arr[0].checkout))+ parseFloat(arr[0].sellingRate)* parseFloat(arr[0].checkout)}</td>
	// 	</tr>`
	// 	}
	// 	return hello;
	// }
 
 return `
 <!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Invoice</title>
		<style type="text/css">@import url(https://fonts.googleapis.com/css?family=Open+Sans:400, ) 400i,  600,  600i,  700;
		a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
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
		height: 940px;
		width: 750px;
		margin: auto;
		font-family: 'Open Sans', sans-serif;
		font-size: 13px;
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
	}
	#header>#reference {
		text-align: right;
		border: solid grey 1px;
		border-left: none;
		width: 49.5%;
		height: 140px;
		float: right;
	}
	#header>#logo {
		width: 50%;
		height: 140px;
		border: solid grey 1px;
		float: left;
	}
	.brand-box {
		padding: 10px;
	}
	.details {
		height: 46.68px;
		border: solid grey 1px;
		border-left: none;
		border-right: none;
		border-top: none;
	}
	.details-bottom {
		height: 35px;
		border-bottom: solid grey 1px;
	}
	.sub-details {
		float: left;
		width: 50%;
		height:46.5px;
		border-right: solid grey 1px;
	}
	.sub-details-reference {
		float: left;
		width: 50%;
		height:35px;
		border-right: solid grey 1px;
	}
	.sub-details-two {
		float: right;
		width: 49.7%;
	}
	.float-left {
		float: left;
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
		width: 150px;
	}
	
	#items>table tr td:not(:first-child) {
		text-align: center;
		padding-right: 1%}
	#items table td {
		border-right: solid grey 1px;
	}
	#items table tr td {
		padding-top: 3px;
		padding-bottom: 8px;
		height: 10px;
	}
	#items table tr:nth-child(1) {
		border: solid grey 1px;
	}
	#items table tr th {
		border-right: solid grey 1px;
		padding: 10px;
	}
	#items table tr:nth-child(2)>td {
		padding-top: 8px;
	}
	.sub-total-row {
		border: none !important;
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
			<div>
				<div id="header">
					<div id="logo">
						<div class="brand-box">
							<strong style="font-size: 20px;">SATVIK SOLUTIONS</strong></br><br/>
							<div>
								Godarwaripuram, Lower Nathanpur,<br>
								Dehradun -248001<br>
								UTTARAKHAND<br>
								email: satsolindia@gmail.com, Mbl: +919415006121/ +918787050389<br>
								GSTIN : 058CBPN1106J1Z2 , DL# UA-DEH-106185/106186 WEF:06.03.2019
							</div>
						</div>
					</div>
					<div id="reference">
						<div class="details">
							<div class="sub-details">
								<div class="float-left">Invoice No.</div><br/>
								<div class="float-left">SS/21-22/003</div>
							</div>
							<div class="sub-details-two" style="border-right: none;">
								<div class="float-left">Date:</div><br/>
								<div class="float-left">02-04-21</div>
							</div>
						</div>
						<div class="details">
							<div class="sub-details"><div class="float-left">Challan No.:</div></div>
							<div class="sub-details-two" style="border-right: none;"><div class="float-left">Challan Date:</div></div>
						</div>
						<div class="details" style="border-bottom: none;">
							<div class="sub-details"><div class="float-left">Book No.</div><br/><div class="float-left">2</div></div>
							<div class="sub-details-two" style="border-right: none;"><div class="float-left">Mode/Terms of Payment</div><br/><div class="float-left">15 Days</div></div>
						</div>
					</div>
				</div>
				<div id="header">
					<div id="logo" style="border-top: none; border-bottom: none;">
						<div class="brand-box" style="padding-top: 5px;">
							<p style="font-style: italic; margin-bottom: 10px;">Consignee:</p>
							<div style="font-weight: 600;">
								M/s LUCKNOW KIDNEY CARE PVT. LTD.<br>
								40/414, VIVEKANANDPURAM,<br>
								RING ROAD, KALYANPUR(WEST),<br>
								LUCKNOW- 226 022<br>
								GSTIN : 058CBPN1106J1Z2
							</div>
						</div>
					</div>
					<div id="reference" style="border-top: none; border-bottom: none">
						<div class="details-bottom">
							<div class="sub-details-reference"><div class="float-left">Order No.:</div></div>
							<div class="sub-details-two" style="border-right: none;"><div class="float-left">Date:</div></div>
						</div>
						<div class="details-bottom">
							<div class="sub-details-reference"><div class="float-left">Dispatch Doc. No.:</div></div>
							<div class="sub-details-two" style="border-right: none;"><div class="float-left">Date:</div></div>
						</div>
						<div class="details-bottom">
							<div class="sub-details-reference"><div class="float-left">Dispatch Through:</div></div>
							<div class="sub-details-two" style="border-right: none;"><div class="float-left">Destination:</div></div>
						</div>
						<div class="details-bottom" style="border-bottom: none;"><div class="float-left">Terms of Delivery:</div></div>
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
						<td>CM003</td>
						<td style="text-align: left">
							<strong>PEROXY PLUS RP</strong><br>
							<div style="font-size: 8px">
							Batch: B5873<br>
							Expiry: 24-Feb-2020
							</div>
						</td>
						<td>3042</td>
						<td>4</td>
						<td>No.</td>
						<td>3500.00</td>
						<td>14000.00</td>
						<td>18%</td>
						<td>2500</td>
						<td>16520.00</td>
					</tr>
					<tr>
						<td>1</td>
						<td>CM003</td>
						<td style="text-align: left">
							<strong>PEROXY PLUS RP</strong><br>
							<div style="font-size: 8px">
							Batch: B5873<br>
							Expiry: 24-Feb-2020
							</div>
						</td>
						<td>3042</td>
						<td>4</td>
						<td>No.</td>
						<td>3500.00</td>
						<td>14000.00</td>
						<td>18%</td>
						<td>2500</td>
						<td>16520.00</td>
					</tr>
					<tr>
						<td>1</td>
						<td>CM003</td>
						<td style="text-align: left">
							<strong>PEROXY PLUS RP</strong><br>
							<div style="font-size: 8px">
							Batch: B5873<br>
							Expiry: 24-Feb-2020
							</div>
						</td>
						<td>3042</td>
						<td>4</td>
						<td>No.</td>
						<td>3500.00</td>
						<td>14000.00</td>
						<td>18%</td>
						<td>2500</td>
						<td>16520.00</td>
					</tr>
					<tr>
						<td>1</td>
						<td>CM003</td>
						<td style="text-align: left">
							<strong>PEROXY PLUS RP</strong><br>
							<div style="font-size: 8px">
							Batch: B5873<br>
							Expiry: 24-Feb-2020
							</div>
						</td>
						<td>3042</td>
						<td>4</td>
						<td>No.</td>
						<td>3500.00</td>
						<td>140700.00</td>
						<td>18%</td>
						<td>2500</td>
						<td>16520.00</td>
					</tr>
					<tr style="border-top: 1px solid grey; font-weight: 600;">
						<td class="sub-total-row"></td>
						<td class="sub-total-row"></td>
						<td class="sub-total-row"></td>
						<td class="sub-total-row"></td>
						<td class="sub-total-row"></td>
						<td class="sub-total-row"></td>
						<td style="text-align: right; padding: 5px 2px;">TOTAL</td>
						<td>345000.00</td>
						<td></td>
						<td>234500</td>
						<td>16520.00</td>
					</tr>
				</table>
			</div>
			<div style="border: 1px solid grey; border-top: none; padding: 5px 0 5px 5px; height: 400px; line-height: 1.5;">
				<div style="margin-bottom: 20px;">
					<div>E. & O.E</div>
					<div>Amount Chargeable(in words)</div>
					<strong>INR Fourteen Thousand Four Hundred Ninety Only</strong><br/><br/>
					<div>Remarks:</div>
				</div>
				<div>
					<div style="float: left; width: 50%;">
						<div id="items">
							<div style="text-align: center; font-weight: 700;">GST TAX SUMMARY</div>
							<table style="text-align: center;">
								<tr>
								  <th>GST%</th>
								  <th>TAXABLE</th>
								  <th>IGST</th>
								  <th>CGST</th>
								  <th>SGST</th>
								</tr>
								<tr>
								  <td>0%</td>
								  <td></td>
								  <td></td>
								  <td></td>
								  <td></td>
								</tr>
								<tr>
									<td>5%</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								  </tr>
								<tr>
								  <td>12%</td>
								  <td>560.00</td>
								  <td></td>
								  <td>270.00</td>
								  <td>270.00</td>
								</tr>
								<tr>
									<td>18%</td>
									<td>70.00</td>
									<td></td>
									<td>35.00</td>
									<td>35.00</td>
								  </tr>
								  <tr>
									<td>28%</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								  </tr>

							</table>
						</div>
						<div style="font-size: 9px;">
							<u>Declaration</u>
							<p>We declare that this invoice shows the actual price of the goods described and all particulars are true and correct.</p>
							<div>
								<ol>
									<li>1. Any claim by the purchaser which is based on a pre dispatcch defects shall be notified within 7 days from the date of the sale.</li>
									<li>2. Interest @24% will be charged in delay payments.</li>
								</ol>
							</div>
						</div>
					</div>
					<div style="float: right; width: 45%; font-size: 11px;">
						<u>Company's Bank Details: </u>
						<div style="margin-bottom: 65px;">
							<div style="float: left;">
								<div>Bank Name:</div>
								<div>Account Number:</div>
								<div>Branch:</div>
								<div>IFSC Code:</div>
							</div>
							<div style="float: right;">
								<div>Punjab National Bank</div>
								<div>1890050002561</div>
								<div>Dharampur, Dehradun - 248 001</div>
								<div>PUNB0189020</div>
							</div>
						</div>
						<div style="border: 1px solid grey; height: 195px; border-bottom: none; border-right: none; padding: 6px;">
							<div style="text-align: center;">for SATVIK SOLUTIONS</div><br/>
							<div style="text-align: center; margin-top: 150px;">Authorised Signatory</div>
						</div>
					</div>
				</div>
			</div>
			<div style="text-align: center; margin-top: 5px;">SUBJECT UNDER DEHRADUN JURISDICTION</div>
			<!-- <div id="summary">
				<div id="note">
					<br/>
					<h4>Amount Chargeable(in words) :</h4>
					<p>INR</p>
				</div>
				<div id="note">
					<br/>
					<h4>Company's Bank Details:</h4>
					<p>Bank Name     :Indian Bank  </p>
					<p>Account Number:6759192854</p>
					<p>Branch        : Indira Nagar,Lucknow -226016  </p>
					<p>IFSC Code     : IDIB0001012  </p>
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
				<p>Subject to Dehradun Jurisdiction</p>
			</div> -->
		</div>
	</body>
</html>
	`;
 };
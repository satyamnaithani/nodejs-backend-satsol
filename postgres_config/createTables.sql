CREATE TABLE items ( 
	_id serial PRIMARY KEY, 
	category VARCHAR( 25 ) NOT NULL, 
	code VARCHAR( 5 ) NOT NULL, 
	name VARCHAR( 50 ) NOT NULL, 
	hsn INT NOT NULL, 
	gst INT NOT NULL, 
	uom VARCHAR( 15 ) NOT NULL, 
	mfg_name VARCHAR( 25 ), 
	added_by VARCHAR( 20 ) NOT NULL, 
	created_on TIMESTAMP NOT NULL 
);
CREATE TABLE vendors(
	_id serial PRIMARY KEY,
	code VARCHAR( 5 ) NOT NULL,
	name VARCHAR( 50 ) NOT NULL,
	address VARCHAR( 50 ) NOT NULL,
	city VARCHAR( 50 ) NOT NULL,
	state VARCHAR( 50 ) NOT NULL,
  	zip VARCHAR( 6 ) NOT NULL,
	gst VARCHAR( 15 ),
	dl VARCHAR( 30 ),
	contact VARCHAR( 10 ),
	person VARCHAR( 25 ),
	added_by VARCHAR( 20 ) NOT NULL
);
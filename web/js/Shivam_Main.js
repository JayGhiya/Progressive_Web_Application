

class Shivam_Associates {

    constructor(Shivam_Store, remote) {
        this.shivam_store = new Shivam_Store('shivam', remote);

        this.init();
      
    }

    init() {
        this.initElements();
      
		this.attachHandlers();


		
    }

    initElements() {
		//edit here and get the element for submit button
		this.addProductButton = document.getElementById('add_product');
		this.ProductDetailsForm = document.getElementById('add_new_product');
		this.card_div = document.getElementById('card_div');
	}
	
	prepare_Cards()
	{
		this.data_rows = this.get_data_from_db();
		this.card_div.innerHTML = '\n';
		//create document fragment first
		this.frag = document.createDocumentFragment();
		
		this.data_rows.array.forEach(product=> {
			this.frag.appendChild(this.createProduct(product))			
		});

		this.card_div.appendChild(this.frag);
	
	}

	createProduct(product)
	{
		this.div_element = document.createElement('div');
		this.div_element.className = 'w3-card-4';
		this.div_element.style = "width:50%;"
		this.div_element.innerHTML =     '<header class="w3-container w3-blue"><h1>'+product._id+'</h1></header><div class="w3-container"><p>'+product.Batch_No+'</p> <p>'+product.comments+'</p>  <p>'+product.Source+'</p> <p>'+prodcut.Quantity+' </p> </div><footer class="w3-container w3-blue"><h5>Footer</h5></footer></div>'
	}


	get_data_from_db()
	{
		this.list_data = this.shivam_store.getAll();
		return this.list_data;

	}

    attachHandlers() {
        this.ProductDetailsForm.addEventListener('submit', event => {
            event.preventDefault();
        });

        this.addProductButton.addEventListener('click', () => { this.addProduct() });

    }

	addProduct() {
        this.get_product_details_from_form();
		var shivam_stock = this.getProductDetails();

        this.shivam_store.save(shivam_stock).then(() => {
            console.log('insertion successful');
        });
        
    }
	getProductDetails()
	{
		return {
			_id: this.get_product_name(),
            Batch_No: this.get_lot_no(),
            Source: this.get_source(),
            Quantity: this.get_quantity(),
			Quantity_Unit : this.get_unit(),
			Color: this.get_color(),
			Comments : this.get_comments()
			
		};
	}
	
	get_product_details_from_form()
	{
		
		this.product_name = String(document.getElementById('product_name').value);
		console.log("product_name",this.product_name);
		this.lot_no       = String(document.getElementById('batch_no').value);
		console.log("batch_no",this.lot_no);
		this.source       = String(document.getElementById('Source').value);
		console.log("source",this.source);
		this.number_drums = String(document.getElementById('No_Drums').value);
		console.log("number_drums",this.number_drums);
		this.quantity     = String(document.getElementById('Quantity').value);
		console.log("Quantity",this.quantity);
		//select drop down list unit
		this.select_unit    = String(document.getElementById('quantity_unit').value);
		
		
		console.log("drop down list",this.select_unit);
		this.color        = String(document.getElementById('Color').value);
		console.log("color",this.color);
		this.comments     = String(document.getElementById('product_comments').value);
		console.log("comments:",this.comments);
	}
	
	get_product_name()
	{
		return this.product_name;
	}

	get_lot_no()
	{
		return this.lot_no;
	}
	
	get_source()
	{
		return this.source;
	}
	
	get_number_of_drums()
	{
		return this.number_drums;
	}
	
	get_quantity()
	{
		return this.quantity;
	}
	
	get_unit()
	{
		return this.select_unit;
	}
	
	get_color()
	{
		return this.color;
	}
	
	get_comments()
	{
		return this.comments;
	}
	
}

window.Shivam_Associates = Shivam_Associates;

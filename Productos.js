class Productos {
	productos = [
		{
			"id": 1,
			"title": "FenderStratocaster",
			"price": 2000,
			"thumbnail": "https://media.guitarcenter.com/is/image/MMGS7/L78115000004000-02-720x720.jpg"
		},
		{
			"id": 2,
			"title": "Ibanez GSRM20",
			"price": 985,
			"thumbnail": "https://media.guitarcenter.com/is/image/MMGS7/516148000002000-00-720x720.jpg"
		},
		{
			"id": 3,
			"title": "Akai Professional MPC",
			"price": 2154,
			"thumbnail": "https://media.guitarcenter.com/is/image/MMGS7/L95366000000000-00-720x720.jpg"
		},
		
	];

	generateId() {
		const lastProduct = this.productos[this.productos.length - 1];
		console.log(lastProduct);
		let id = 1;
		if (lastProduct) {
			id = lastProduct.id + 1;
		};

		return id;
	};

	addProduct(newData) {
		newData.id = this.generateId();

		this.productos.push(newData);

		return this.productos;
	};

	getById(id) {
		return this.productos.find(product => product.id === parseInt(id));
	};

	update(id, data) {
		let updatedProduct;

		const updatedProducts = this.productos.map(product => {
			if (product.id === parseInt(id)) {
				product = Object.assign(product, data);

				updatedProduct = product;
			};
			return product;
		});

		this.productos = updatedProducts;

		return updatedProduct;
	};

	getAll() {
		return this.productos;
	};

	deleteById(id) {
		const newProducts = this.productos.filter(product => product.id !== parseInt(id));

		this.productos = newProducts;

		return this.productos;
	};
};

module.exports = Productos;

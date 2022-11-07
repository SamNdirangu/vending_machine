import productsInventory from "../data/data.products";
import errorResponses from "../errors/erros.custom";

export type ProductSchema = {
    _id: string,
    name: string,
    quantity: number,
    price: number
}

class Products {
    productsInventory: ProductSchema[]
    constructor() {
        this.productsInventory = productsInventory
    }


    /**Returns all products*/
    findAll(): ProductSchema[] | undefined {
        return this.productsInventory
    }

    /**Returns a product based on its ID */
    findByID(id: string): ProductSchema | undefined {
        let result
        for (let i = 0; i < this.productsInventory.length; i++) {
            const product = this.productsInventory[i];
            if (product._id == id) {
                result = product;
                break;
            }
        }
        return result
    }

    /**Creates a new product based on its ID */
    create(name: string, quantity: number, price: number): ProductSchema | undefined {
        const _id: string = name + (this.productsInventory.length + 1).toString()
        const product: ProductSchema = {
            _id, name, quantity, price
        }
        this.productsInventory.push(product)

        return product
    }

    /**Adds a product quantiyt */
    updateQuantity(id: string, quantity: number, deduct: boolean): ProductSchema {
        for (let index = 0; index < this.productsInventory.length; index++) {
            const product = this.productsInventory[index];
            if (product._id == id) {
                if (!deduct) {
                    this.productsInventory[index].quantity += Number(quantity);
                    return this.productsInventory[index];
                }

                if (product.quantity < quantity) {
                    throw new errorResponses.BadRequest(`Quantity to deduct cannot exceed existing quantity`)
                }

                this.productsInventory[index].quantity -= quantity
                return this.productsInventory[index];
            }
        }
        throw new errorResponses.NotFound(`No product found with such id: ${id}`);
    }
}

const products = new Products()
export default products
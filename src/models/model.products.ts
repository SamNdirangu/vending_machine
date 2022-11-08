import productsStatus from "../data/data.products";
import errorResponses from "../errors/erros.custom";

export type ProductSchema = {
    _id: string,
    name: string,
    price: number,
    quantity: number
}

type productUpdateParameters = { id: string, quantity: number, price: number };
type productCreateParameters = { name: string, quantity: number, price: number };
type productUpdateQuantityParameters = { id: string, quantity: number, deduct: boolean };

class Products {
    productsStatus: ProductSchema[];
    constructor() {
        this.productsStatus = productsStatus;
    }


    /**Returns all products*/
    findAll(): ProductSchema[] | undefined {
        return this.productsStatus;
    }

    /**Returns a product based on its ID */
    findByID(id: string): ProductSchema | undefined {
        let result;
        for (let i = 0; i < this.productsStatus.length; i++) {
            const product = this.productsStatus[i];
            if (product._id == id) {
                result = product;
                break;
            }
        }
        return result;
    }

    /**Creates a new product based on its ID */
    create({ name, price, quantity }: productCreateParameters): ProductSchema | undefined {
        const _id: string = name + (this.productsStatus.length + 1).toString();
        const product: ProductSchema = {
            _id, name, quantity, price
        };
        this.productsStatus.push(product);

        return product;
    }

    /**Updates a product slot quantity or price */
    updateProductSlot({ id, quantity, price }: productUpdateParameters): ProductSchema {
        for (let index = 0; index < this.productsStatus.length; index++) {
            const product = this.productsStatus[index];
            if (product._id == id) {
                if (price != undefined) {
                    if (price < 0) throw new errorResponses.BadRequest(`Price cannot be a negative number`);
                    this.productsStatus[index].price = price;
                }

                if (quantity != undefined) {
                    if (quantity < 0) throw new errorResponses.BadRequest(`Quantity cannot be a negative number`);
                    this.productsStatus[index].quantity = quantity;
                }
                return this.productsStatus[index];
            }
        }
        throw new errorResponses.NotFound(`No product found with such id: ${id}`);
    }

    /**Adds or subtracts a product slot quantity */
    updateSlotQuantity({ id, quantity, deduct }: productUpdateQuantityParameters): ProductSchema {
        for (let index = 0; index < this.productsStatus.length; index++) {
            const product = this.productsStatus[index];
            if (product._id == id) {
                if (deduct) {
                    if (this.productsStatus[index].quantity - quantity < 0) {
                        throw new errorResponses.BadRequest(`Quantity cannot be a negative number`);
                    }
                    this.productsStatus[index].quantity -= quantity;
                } else {
                    this.productsStatus[index].quantity += Number(quantity);
                }
                return this.productsStatus[index];
            }
        }
        throw new errorResponses.NotFound(`No product found with such id: ${id}`);
    }
}

const productsInventory = new Products();
export default productsInventory;
import changeStatus from "../data/data.change";
import errorResponses from "../errors/erros.custom";

export type ChangeSchema = {
    1000: number,
    500: number,
    200: number,
    100: number,
    50: number,
    40: number,
    20: number,
    10: number,
    5: number,
    1: number
}
export type ChangeResponseSchema = {
    1000?: number,
    500?: number,
    200?: number,
    100?: number,
    50?: number,
    40?: number,
    20?: number,
    10?: number,
    5?: number,
    1?: number
}

class ChangeInventory {
    changeStatus: ChangeSchema
    constructor() {
        this.changeStatus = changeStatus
    }

    /**Returns current change status */
    getChange(): ChangeSchema {
        return this.changeStatus
    }

    /**Returns  change amount of particular denomination status */
    findByDenom(denomination: number): Number | undefined {
        type changeStatusKey = keyof typeof this.changeStatus
        const statusKey = denomination as changeStatusKey

        return this.changeStatus[statusKey]
    }

    /**Returns  change amount of particular denomination status */
    findChange(changeAmount: number): ChangeResponseSchema | undefined {
        let remainingChange: number = changeAmount
        let changeDenominations: ChangeResponseSchema = {}

        type changeStatusKey = keyof typeof this.changeStatus
        const denominations = Object.keys(this.changeStatus).sort((a, b) => parseInt(b) - parseInt(a))

        denominations.forEach(property => {
            //Load our current denomination amount
            const currentDenom = property as unknown as changeStatusKey
            //Load our the number of notes/coins of our current denomination
            const currentDenomQty: number = this.changeStatus[currentDenom]

            if (remainingChange >= currentDenom) {
                //Get the number of notes/coins needed
                let availableDenomQty = Math.floor(remainingChange / currentDenom);

                //Confirm if the needed notes are more than what we have
                if (availableDenomQty > currentDenomQty) {
                    availableDenomQty = currentDenomQty; //set to the max number
                }
                //deduct from remaining change
                remainingChange -= (availableDenomQty * currentDenom)
                //add to change denominations result
                changeDenominations[currentDenom] = availableDenomQty
            }
        });

        // If change still remaining no sufficient change in inventory was available
        if (remainingChange != 0) {
            return undefined
        }
        //Return changeAmount
        return changeDenominations
    }

    /**Adds change to the inventory */
    setChange(change: ChangeSchema): ChangeSchema | undefined {
        type changeStatusKey = keyof typeof this.changeStatus

        for (const key in changeStatus) {
            if (change[key as unknown as changeStatusKey] == undefined) {
                return undefined;
            }
        }
        return this.changeStatus = change
    }



    /**Update change to the inventory, Perfroms both addition and deuctions*/
    updateChange(changeDenominations: ChangeResponseSchema, deduct: boolean): ChangeSchema {
        type changeStatusKey = keyof typeof this.changeStatus

        // update the new change
        for (const property in changeDenominations) {
            const currentDenom = property as unknown as changeStatusKey
            const currentDenomQty = changeDenominations[currentDenom]

            if (this.changeStatus[currentDenom] == undefined) {
                throw new errorResponses.BadRequest(`There is no ${currentDenom} denomination`)
            }
            if (deduct) {
                this.changeStatus[currentDenom] -= currentDenomQty || 0
            } else {
                this.changeStatus[currentDenom] += currentDenomQty || 0
            }
        }
        return this.changeStatus
    }

}

const changeInventory = new ChangeInventory()
export default changeInventory
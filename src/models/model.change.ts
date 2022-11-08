/* eslint-disable prefer-const */
import changeStatus from "../data/data.change";
import errorResponses from "../errors/erros.custom";

export type ChangeSchema = {
    //2000: number //Can be easily modified to match different denominations of different currencies
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
    //2000?: number //Can be easily modified to match different denominations of different currencies
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
type UpdateChangeParameters = { changeDenominations: ChangeResponseSchema, isUpdate: boolean, deduct: boolean };

class ChangeInventory {
    changeStatus: ChangeSchema;
    constructor() {
        this.changeStatus = changeStatus;
    }

    /**Returns current change status */
    getChangeStatus(): ChangeSchema {
        return this.changeStatus;
    }

    /**Returns  change amount of particular denomination status */
    findChange(changeAmount: number): ChangeResponseSchema | undefined {
        let remainingChange: number = changeAmount;
        let changeDenominations: ChangeResponseSchema = {};

        type changeStatusKey = keyof typeof this.changeStatus
        const denominations = Object.keys(this.changeStatus).sort((a, b) => parseInt(b) - parseInt(a));

        denominations.forEach(property => {
            //Load our current denomination amount
            const currentDenom = property as unknown as changeStatusKey;
            //Load our the number of notes/coins of our current denomination
            const currentDenomQty: number = this.changeStatus[currentDenom];

            if (remainingChange >= currentDenom) {
                //Get the number of notes/coins needed
                let availableDenomQty = Math.floor(remainingChange / currentDenom);

                //Confirm if the needed notes are more than what we have
                if (availableDenomQty > currentDenomQty) {
                    availableDenomQty = currentDenomQty; //set to the max number
                }
                //deduct from remaining change
                remainingChange -= (availableDenomQty * currentDenom);
                //add to change denominations result
                changeDenominations[currentDenom] = availableDenomQty;
            }
        });

        // If change still remaining no sufficient change in inventory was available
        if (remainingChange != 0) {
            return undefined;
        }
        //Return changeAmount
        return changeDenominations;
    }

    /**Update change to the inventory, Perfroms both addition and deuctions*/
    updateChange({ changeDenominations, isUpdate, deduct }: UpdateChangeParameters): ChangeSchema {
        type changeStatusKey = keyof typeof this.changeStatus

        let tempStatus = this.changeStatus;
        // update the new change
        for (const property in changeDenominations) {
            const currentDenom = property as unknown as changeStatusKey;
            const currentDenomQty = changeDenominations[currentDenom];

            if (tempStatus[currentDenom] == undefined || currentDenomQty == undefined) {
                throw new errorResponses.BadRequest(`There is no ${currentDenom} denomination`);
            }
            if (isUpdate) {
                if (deduct) {
                    tempStatus[currentDenom] -= Number(currentDenomQty);
                } else {
                    tempStatus[currentDenom] += Number(currentDenomQty);
                }
            } else {
                tempStatus[currentDenom] = currentDenomQty;
            }
            if (tempStatus[currentDenom] < 0) {
                throw new errorResponses.BadRequest(`Cannot complete the ${currentDenom} denomination is below zero`);
            }
        }
        this.changeStatus = tempStatus;
        return this.changeStatus;
    }

    /**Calculates the total amount from ache to the inventory, Perfroms both addition and deuctions*/
    computeAmount(amountDenominations: ChangeResponseSchema): number {
        type changeStatusKey = keyof typeof this.changeStatus

        // update the new change
        let totalAmount = 0;
        for (const property in amountDenominations) {
            const currentDenom = property as unknown as changeStatusKey;
            const currentDenomQty = amountDenominations[currentDenom];



            if (this.changeStatus[currentDenom] == undefined || currentDenomQty == undefined) {
                throw new errorResponses.BadRequest(`There is no support for ${currentDenom} denomination`);
            }
            totalAmount += currentDenomQty * currentDenom;
        }
        return totalAmount;
    }
}

const changeInventory = new ChangeInventory();
export default changeInventory;
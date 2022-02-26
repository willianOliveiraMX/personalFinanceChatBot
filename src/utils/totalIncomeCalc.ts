import { Income } from '../income/income.interface';

export const totalIncomeCalc = (incomeList : Income[]): number => {
    return incomeList.reduce((a, b) => {return {value: a.value + b.value}}, {value: 0}).value;
};

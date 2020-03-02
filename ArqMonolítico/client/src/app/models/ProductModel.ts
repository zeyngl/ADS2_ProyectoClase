import {ProductCategoryModel} from '../models/ProductCategoryModel'

export class ProductModel
{
	id: number;
    name: string;
    unit_price: number;
	categ_id: number;
	categ_naem: string;

	constructor(obj: any = null)
	{
		if(obj != null)
		{
			Object.assign(this, obj);
		}
	}
}
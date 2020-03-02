export class ProductCategoryModel
{
	id: number;
    name: string;

	constructor(obj: any = null)
	{
		if(obj != null)
		{
			Object.assign(this, obj);
		}
	}
}
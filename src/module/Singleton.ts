
class Singleton
{
    constructor(id:number)
    {
        this.SingletonID = id;
    }

    public static SingletonList:Array<any> = [];

    public static SingletonCount:number = 0;
    /**
     * stupid B<
     */
    public static Singleton<T>(c:new (id:number)=> T):T
    {
        for(let key in this.SingletonList)
        {
            if(this.SingletonList[key] instanceof c)
            {
                return this.SingletonList[key];
            }
        }
        return new c(this.SingletonCount);
    }

    public SingletonID:number;
}

class c extends Singleton
{
    
}


function test()
{
    let i =c.Singleton<c>(c);
}


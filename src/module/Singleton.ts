
class Singleton
{
    constructor(id:number)
    {
        this.SingletonID = id;
    }

    public static SingletonList:Array<any> = [];

    public static SingletonCount:number = 0;

    public static Singleton<T>(c:new (id:number)=> T):T
    {
        if(this.SingletonList[c])
        {

        }
        let s = new c(this.SingletonCount);
        return s;
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


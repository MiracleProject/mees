class KeyboardCarrier extends egret.EventDispatcher
{  
    constructor()
    {
        super();
    }

    public start()
    {
        document.addEventListener("keydown", (evt:KeyboardEvent)=>{
            switch (evt.keyCode) {
                case 87:
                case 38:
                
                    return;
                case 83:
                case 40:

                    return;
                case 65:
                case 37:

                    return;
                case 68:
                case 39:

                    return;
                case 8:
                case 32:

                    return;
            }
        });
        document.addEventListener("keypress",()=>{
            
        });
        document.addEventListener("keydown",()=>{

        });
    }
}
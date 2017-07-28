namespace mui
{
    /**
     * 打开页面（会关闭同级页面）
     */
    export function Open(UIType:UIEnum)
    {
        Manager.Instance.Show(UIType);
    }
    /**
     * 关闭页面
     */
    export function Close(UIType:UIEnum)
    {
        Manager.Instance.Close(UIType);
    }
    /**
     * 关闭非参数中的页面
     */
    export function CloseWithout(...UITypes:Array<UIEnum>)
    {
        Manager.Instance.CloseWithout(...UITypes);
    }
    /**
     * 获取UI实例(无类型)
     */
    export function GetUI(UIType:UIEnum):UIBase
    {
        return Manager.Instance.GetUI(UIType);
    }
    /**
     * 获取UI实例
     */
    export function Get<T>(UIType:UIEnum):T
    {
        return Manager.Instance.Get<T>(UIType);
    }

}
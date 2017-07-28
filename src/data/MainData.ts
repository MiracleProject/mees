
class MainData extends BaseData
{
    public Init()
    {
        // let MainUI = mui.Get<mui.MainUI>(mui.UIEnum.MainUI);//<mui.MainUI>mui.GetUI(mui.UIEnum.MainUI);
        DataManager.Instance.ReportInit();
    }

    public Start()
    {
        //console.log("[Data] MainData Start");
    }

    
}
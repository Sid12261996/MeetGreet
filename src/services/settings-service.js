import $ from "jquery";

     class SettingsService {
         constructor() {}
        HideDiv = (Div1,Div2) => {
             $(Div1).css({'display':'none'});
             $(Div2).css({'display':'block','width':'100%','height':'100%'});
        }

        HideDivRevert = (Div1,Div2) => {
            $(Div1).css({'display':'none'});
            $(Div2).css({'display':'grid','place-items':'center'});
        }
     }

export default SettingsService;
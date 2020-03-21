import $ from "jquery";

// const SettingsService = {};
//      SettingsService.DataShift = (Blocks,width,height,bgColor) => {
//         $(Blocks).css({'width':width,'height':height,'background-color':bgColor});
//     };

     class SettingsService {
         constructor() {}
         DataShift = (Blocks,width,height,bgColor) => {
             $(Blocks).css({'width':width,'height':height,'background-color':bgColor});
         };
     }

export default SettingsService;
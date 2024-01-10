import {
    ConfirmBoxInitializer,
    DialogLayoutDisplay,
    DisappearanceAnimation,
    AppearanceAnimation
} from '@costlydeveloper/ngx-awesome-popup';

export function createAlert(message: string) {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('CyberCasino');
    newConfirmBox.setMessage(message);

    // Choose layout color type
    newConfirmBox.setConfig({
    layoutType: DialogLayoutDisplay.CUSTOM_FOUR, // SUCCESS | INFO | NONE | DANGER | WARNING
    animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
    animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
    buttonPosition: 'center', // optional 
    });

    newConfirmBox.setButtonLabels('Ok', '');

    // Simply open the popup and observe button click
    newConfirmBox.openConfirmBox$().subscribe(resp => {
      if(resp.clickedButtonID){
        console.log('Button clicked: ', resp.clickedButtonID);
      }
    });
}
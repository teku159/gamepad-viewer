const leftTrigger = document.getElementsByClassName("leftTrigger")[0];
const rightTrigger = document.getElementsByClassName("rightTrigger")[0];

const leftX = document.getElementsByClassName("leftX")[0];
const leftY = document.getElementsByClassName("leftY")[0];
const rightX = document.getElementsByClassName("rightX")[0];
const rightY = document.getElementsByClassName("rightY")[0];

// const start = document.getElementsByClassName("start")[0];

let gamepadInput = {};

var isChromium = !!navigator.userAgentData && navigator.userAgentData.brands.some(data => data.brand == 'Chromium');

function InitButtons()
{
    //firefox 

    // axes[0] - left X          (left-1;right+1)
    // axes[1] - left Y          (up-1;down+1)
    // axes[2] - right X         (left-1;right+1)
    // axes[3] - left trigger    (release-1;full+1)
    // axes[4] - right trigger   (release-1;full+1)
    // axes[5] - right Y         (up-1;down+1)
    // axes[6] - ?
    // axes[7] - ?
    // axes[8] - ?
    // axes[9] - weird dpad

    // buttons[0] - []
    // buttons[1] - X
    // buttons[2] - O
    // buttons[3] - /\
    // buttons[4] - L1
    // buttons[5] - R1
    // buttons[6] - L2
    // buttons[7] - R2
    // buttons[8] - Create/Share
    // buttons[9] - Option
    // buttons[10] - L3
    // buttons[11] - R3
    // buttons[12] - PS/Home
    // buttons[13] - Touchpad
    // buttons[14] - Mute
    // buttons[15] - ?



    //chromium

    //axes[0] - left X          (left-1;right+1)
    //axes[1] - left Y          (up-1;down+1)
    //axes[2] - right X         (left-1;right+1)
    //axes[3] - right Y         (up-1;down+1)

    // buttons[0] - X
    // buttons[1] - O
    // buttons[2] - []
    // buttons[3] - /\
    // buttons[4] - L1
    // buttons[5] - R1
    // buttons[6] - left trigger (release-0;full+1)
    // buttons[7] - right trigger(release-0;full+1)
    // buttons[8] - Create/Share
    // buttons[9] - Option
    // buttons[10] - L3
    // buttons[11] - R3
    // buttons[12] - Dpad UP
    // buttons[13] - Dpad Down
    // buttons[14] - Dpad Left
    // buttons[15] - Dpad Right
    // buttons[16] - PS/Home
    // buttons[17] - ?

    if(isChromium)
    {
        gamepadInput = [
            "A",
            "B",
            "X",
            "Y",
            "leftBumper",
            "rightBumper",
            null,
            null,
            "select",
            "start",
            "leftStick",
            "rightStick",
            "up",
            "down",
            "left",
            "right",
            "home",
            null
        ]
    }
    else
    {
        gamepadInput = [
            "X",
            "A",
            "B",
            "Y",
            "leftBumper",
            "rightBumper",
            "leftTriggerButton",
            "rightTriggerButton",
            "select",
            "start",
            "leftStick",
            "rightStick",
            "home",
            "touch",
            "mic",
            null
        ]
    }
}

window.addEventListener("gamepadconnected",(e) => {

    if(isChromium)
        document.getElementsByClassName("ps")[0].disabled = true;

    console.log("Gamepad connected");
    console.log(e.gamepad);
    InitButtons();
    checkStatus();
})
function updateButton(buttonId,value)
{   
    if(gamepadInput[buttonId] === null)
        return;

    let element = document.getElementsByClassName(gamepadInput[buttonId])[0];

    if(value > 0)
    {
        element.classList.add("pressed");
    }
    else
    {
        element.classList.remove("pressed");
    }
}
function dpadFix(gamepads)
{
    let value = gamepads[0].axes[9].toFixed(5);

    // default
    if(value == 1.28571)
    {
        document.getElementsByClassName("up")[0].classList.remove("pressed");
        document.getElementsByClassName("down")[0].classList.remove("pressed");
        document.getElementsByClassName("left")[0].classList.remove("pressed");
        document.getElementsByClassName("right")[0].classList.remove("pressed");
    }
    // up  
    if(value == -1)
    {
        document.getElementsByClassName("up")[0].classList.add("pressed");
        document.getElementsByClassName("down")[0].classList.remove("pressed");
        document.getElementsByClassName("left")[0].classList.remove("pressed");
        document.getElementsByClassName("right")[0].classList.remove("pressed");
    }
    // up + left
    if(value == 1)
    {
        document.getElementsByClassName("up")[0].classList.add("pressed");
        document.getElementsByClassName("down")[0].classList.remove("pressed");
        document.getElementsByClassName("left")[0].classList.add("pressed");
        document.getElementsByClassName("right")[0].classList.remove("pressed");
    }
    // left
    if(value == 0.71429)
    {
        document.getElementsByClassName("up")[0].classList.remove("pressed");
        document.getElementsByClassName("down")[0].classList.remove("pressed");
        document.getElementsByClassName("left")[0].classList.add("pressed");
        document.getElementsByClassName("right")[0].classList.remove("pressed");
    }
    // left + down
    if(value == 0.42857)
    {
        document.getElementsByClassName("up")[0].classList.remove("pressed");
        document.getElementsByClassName("down")[0].classList.add("pressed");
        document.getElementsByClassName("left")[0].classList.remove("pressed");
        document.getElementsByClassName("right")[0].classList.add("pressed");
    }
    // down
    if(value == 0.14286)
    {
        document.getElementsByClassName("up")[0].classList.remove("pressed");
        document.getElementsByClassName("down")[0].classList.add("pressed");
        document.getElementsByClassName("left")[0].classList.remove("pressed");
        document.getElementsByClassName("right")[0].classList.remove("pressed");
    }
    // down + right
    if(value == -0.14286)
    {
        document.getElementsByClassName("up")[0].classList.remove("pressed");
        document.getElementsByClassName("down")[0].classList.add("pressed");
        document.getElementsByClassName("left")[0].classList.remove("pressed");
        document.getElementsByClassName("right")[0].classList.add("pressed");
    }
    // right
    if(value == -0.42857)
    {
        document.getElementsByClassName("up")[0].classList.remove("pressed");
        document.getElementsByClassName("down")[0].classList.remove("pressed");
        document.getElementsByClassName("left")[0].classList.remove("pressed");
        document.getElementsByClassName("right")[0].classList.add("pressed");
    }
    // up + right
    if(value == -0.71429)
    {
        document.getElementsByClassName("up")[0].classList.add("pressed");
        document.getElementsByClassName("down")[0].classList.remove("pressed");
        document.getElementsByClassName("left")[0].classList.add("pressed");
        document.getElementsByClassName("right")[0].classList.remove("pressed");
    }
}
function checkStatus() 
{
    const gamepads = navigator.getGamepads();

    if(isChromium)
    {

        leftTrigger.innerHTML = gamepads[0].buttons[6].value.toFixed(5);
        rightTrigger.innerHTML = gamepads[0].buttons[7].value.toFixed(5);

        leftX.innerHTML = gamepads[0].axes[0].toFixed(5);
        leftY.innerHTML = gamepads[0].axes[1].toFixed(5);

        rightX.innerHTML = gamepads[0].axes[2].toFixed(5);
        rightY.innerHTML = gamepads[0].axes[3].toFixed(5);    

    }
    else
    {
        leftTrigger.innerHTML = (gamepads[0].axes[3]*.5+.5).toFixed(5);
        rightTrigger.innerHTML = (gamepads[0].axes[4]*.5+.5).toFixed(5);
    
        leftX.innerHTML = gamepads[0].axes[0].toFixed(5);
        leftY.innerHTML = gamepads[0].axes[1].toFixed(5);
    
        rightX.innerHTML = gamepads[0].axes[2].toFixed(5);
        rightY.innerHTML = gamepads[0].axes[5].toFixed(5);

        dpadFix(gamepads);
    }

    for(let i=0;i<gamepads[0].buttons.length;i++)
    {
        updateButton(i,gamepads[0].buttons[i].value);
    }
    
    // Re-execute the function with each animation frame
    if (gamepads.length > 0) {
      window.requestAnimationFrame(checkStatus);
    }
  }

const leftTrigger = document.getElementsByClassName("leftTrigger")[0];
const rightTrigger = document.getElementsByClassName("rightTrigger")[0];

const leftX = document.getElementsByClassName("leftX")[0];
const leftY = document.getElementsByClassName("leftY")[0];
const rightX = document.getElementsByClassName("rightX")[0];
const rightY = document.getElementsByClassName("rightY")[0];

// const start = document.getElementsByClassName("start")[0];

let gamepadInput = {};
let isRaw = false;

var isChromium = !!navigator.userAgentData && navigator.userAgentData.brands.some(data => data.brand == 'Chromium');

window.addEventListener("gamepadconnected",(e) => {

    // if(e.gamepad.id === "DualSense Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 0ce6)")
    if(e.gamepad.id === "054c-0ce6-DualSense Wireless Controller")
        isRaw = true;

    console.log("Gamepad connected");
    InitButtons();
    CheckStatus();
})

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

    if(isRaw)
    {
        document.getElementsByClassName("ps")[0].style.display = "block";

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
    else
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
}

function UpdateButton(buttonId,value)
{   
    if(gamepadInput[buttonId] === null)
        return;

    const element = document.getElementsByClassName(gamepadInput[buttonId])[0];

    if(value > 0)
    {
        element.classList.add("pressed");
    }
    else
    {
        element.classList.remove("pressed");
    }
}
function DpadFix(gamepad)
{
    let value = gamepad.axes[9].toFixed(5);

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
function CheckStatus() 
{
    const gamepad = navigator.getGamepads()[0];
    let ltValue = 0;
    let rtValue = 0;

    if(isRaw)
    {
        
        // leftTrigger.innerHTML = (gamepad.axes[3]*.5+.5).toFixed(5);
        // rightTrigger.innerHTML = (gamepad.axes[4]*.5+.5).toFixed(5);
        ltValue = gamepad.axes[3]*0.5+0.5;
        rtValue = gamepad.axes[4]*0.5+0.5;
        // 0 top 100 height 0



        // leftY.innerHTML = gamepad.axes[1].toFixed(5);
    
        // rightX.innerHTML = gamepad.axes[2].toFixed(5);
        // rightY.innerHTML = gamepad.axes[5].toFixed(5);

        DpadFix(gamepad);
    }
    else
    {
        ltValue = gamepad.buttons[6].value;
        rtValue = gamepad.buttons[7].value;

        // leftTrigger.innerHTML = gamepad.buttons[6].value.toFixed(5);
        // rightTrigger.innerHTML = gamepad.buttons[7].value.toFixed(5);

        // leftX.innerHTML = gamepad.axes[0].toFixed(5);
        // leftY.innerHTML = gamepad.axes[1].toFixed(5);

        // rightX.innerHTML = gamepad.axes[2].toFixed(5);
        // rightY.innerHTML = gamepad.axes[3].toFixed(5);    
    }

    if(gamepad.axes[0] > 0.1 || gamepad.axes[0] < -0.1)
    {
        const value = (gamepad.axes[0]+1)/2;
        leftX.style.left =  ((value*100)-(6*value))+"%";
    }     
    else
        leftX.style.left = "47%";

    leftTrigger.style.height=(ltValue)*100+"%";
    leftTrigger.style.top=(1-ltValue)*100+"%";

    rightTrigger.style.height=(rtValue)*100+"%";
    rightTrigger.style.top=(1-rtValue)*100+"%";


    for(let i=0;i<gamepad.buttons.length;i++)
    {
        UpdateButton(i,gamepad.buttons[i].value);
    }
    
    // Re-execute the function with each animation frame
    if (navigator.getGamepads().length > 0) {
      window.requestAnimationFrame(CheckStatus);
    }
  }
  
  
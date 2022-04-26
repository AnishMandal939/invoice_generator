//DOM elements
const DOMstrings = {
    stepsBtnClass: 'multisteps-form__progress-btn',
    stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
    stepsBar: document.querySelector('.multisteps-form__progress'),
    stepsForm: document.querySelector('.multisteps-form__form'),
    stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
    stepFormPanelClass: 'multisteps-form__panel',
    stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
    stepPrevBtnClass: 'js-btn-prev',
    stepNextBtnClass: 'js-btn-next'
};


//remove class from a set of items
const removeClasses = (elemSet, className) => {

    elemSet.forEach(elem => {

        elem.classList.remove(className);

    });

};

//return exect parent node of the element
const findParent = (elem, parentClass) => {

    let currentNode = elem;

    while (!currentNode.classList.contains(parentClass)) {
        currentNode = currentNode.parentNode;
    }

    return currentNode;

};

//get active button step number
const getActiveStep = elem => {
    return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};

//set all steps before clicked (and clicked too) to active
const setActiveStep = activeStepNum => {

    //remove active state from all the state
    removeClasses(DOMstrings.stepsBtns, 'js-active');

    //set picked items to active
    DOMstrings.stepsBtns.forEach((elem, index) => {

        if (index <= activeStepNum) {
            elem.classList.add('js-active');
        }

    });
};

//get active panel
const getActivePanel = () => {

    let activePanel;

    DOMstrings.stepFormPanels.forEach(elem => {

        if (elem.classList.contains('js-active')) {

            activePanel = elem;

        }

    });

    return activePanel;

};

//open active panel (and close unactive panels)
const setActivePanel = activePanelNum => {

    //remove active class from all the panels
    removeClasses(DOMstrings.stepFormPanels, 'js-active');

    //show active panel
    DOMstrings.stepFormPanels.forEach((elem, index) => {
        if (index === activePanelNum) {

            elem.classList.add('js-active');

            setFormHeight(elem);

        }
    });

};

//set form height equal to current panel height
const formHeight = activePanel => {

    const activePanelHeight = activePanel.offsetHeight;

    DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;

};

const setFormHeight = () => {
    const activePanel = getActivePanel();

    formHeight(activePanel);
};

//STEPS BAR CLICK FUNCTION
DOMstrings.stepsBar.addEventListener('click', e => {

    //check if click target is a step button
    const eventTarget = e.target;

    if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
        return;
    }

    //get active button step number
    const activeStep = getActiveStep(eventTarget);

    //set all steps before clicked (and clicked too) to active
    setActiveStep(activeStep);

    //open active panel
    setActivePanel(activeStep);
});

//PREV/NEXT BTNS CLICK
DOMstrings.stepsForm.addEventListener('click', e => {

    const eventTarget = e.target;

    //check if we clicked on `PREV` or NEXT` buttons
    if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`))) {
        return;
    }

    //find active panel
    const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

    let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

    //set active step and active panel onclick
    if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
        activePanelNum--;

    } else {

        activePanelNum++;

    }

    setActiveStep(activePanelNum);
    setActivePanel(activePanelNum);

});

//SETTING PROPER FORM HEIGHT ONLOAD
window.addEventListener('load', setFormHeight, false);

//SETTING PROPER FORM HEIGHT ONRESIZE
window.addEventListener('resize', setFormHeight, false);

//changing animation via animation select !!!YOU DON'T NEED THIS CODE (if you want to change animation type, just change form panels data-attr)

const setAnimationType = newType => {
    DOMstrings.stepFormPanels.forEach(elem => {
        elem.dataset.animation = newType;
    });
};

//selector onchange - changing animation
const animationSelect = document.querySelector('.pick-animation__select');

animationSelect.addEventListener('change', () => {
    const newAnimationType = animationSelect.value;

    setAnimationType(newAnimationType);
});




// create innerhtml file to append dynamic input field
function create_innerhtml() {
    console.log('created');
    var created = document.createElement('div');
    created.setAttribute('id', 'input-grp-double-5');
    created.setAttribute('class', 'form-group multisteps-form__input-group');
    created.innerHTML = '<input type="text" name="add_more_items[]" class="form-control multisteps-form__input" placeholder="Add another item">';
    document.getElementById('input-grp-double-4').appendChild(created);
}

// js for canvas to signature

// const sign = document.getElementById("signature-pad");
// const canvas = document.getElementById("signature-pad");
// const ctx = canvas.getContext("2d");
// const clearButton = document.getElementById("clear");
// const savePNGButton = document.getElementById("save-png");

// (function() {
//     window.requestAnimFrame = (function(callback) {
//         return window.requestAnimationFrame ||
//             window.webkitRequestAnimationFrame ||
//             window.mozRequestAnimationFrame ||
//             window.requestAnimationFrame ||
//             window.requestAnimationFrame ||
//             function(callback) {
//                 window.setTimeout(callback, 1000 / 60);
//             };
//     })();

//     var canvas = document.getElementById("sig-canvas");
//     var ctx = canvas.getContext("2d");
//     ctx.strokeStyle = "#222222";
//     ctx.lineWidth = 4;

//     var drawing = false;
//     var mousePos = {
//         x: 0,
//         y: 0
//     };
//     var lastPos = mousePos;

//     canvas.addEventListener("mousedown", function(e) {
//         drawing = true;
//         lastPos = getMousePos(canvas, e);
//     }, false);

//     canvas.addEventListener("mouseup", function(e) {
//         drawing = false;
//     }, false);

//     canvas.addEventListener("mousemove", function(e) {
//         mousePos = getMousePos(canvas, e);
//     }, false);

//     // Add touch event support for mobile
//     canvas.addEventListener("touchstart", function(e) {

//     }, false);

//     canvas.addEventListener("touchmove", function(e) {
//         var touch = e.touches[0];
//         var me = new MouseEvent("mousemove", {
//             clientX: touch.clientX,
//             clientY: touch.clientY
//         });
//         canvas.dispatchEvent(me);
//     }, false);

//     canvas.addEventListener("touchstart", function(e) {
//         mousePos = getTouchPos(canvas, e);
//         var touch = e.touches[0];
//         var me = new MouseEvent("mousedown", {
//             clientX: touch.clientX,
//             clientY: touch.clientY
//         });
//         canvas.dispatchEvent(me);
//     }, false);

//     canvas.addEventListener("touchend", function(e) {
//         var me = new MouseEvent("mouseup", {});
//         canvas.dispatchEvent(me);
//     }, false);

//     function getMousePos(canvasDom, mouseEvent) {
//         var rect = canvasDom.getBoundingClientRect();
//         return {
//             x: mouseEvent.clientX - rect.left,
//             y: mouseEvent.clientY - rect.top
//         }
//     }

//     function getTouchPos(canvasDom, touchEvent) {
//         var rect = canvasDom.getBoundingClientRect();
//         return {
//             x: touchEvent.touches[0].clientX - rect.left,
//             y: touchEvent.touches[0].clientY - rect.top
//         }
//     }

//     function renderCanvas() {
//         if (drawing) {
//             ctx.moveTo(lastPos.x, lastPos.y);
//             ctx.lineTo(mousePos.x, mousePos.y);
//             ctx.stroke();
//             lastPos = mousePos;
//         }
//     }

//     // Prevent scrolling when touching the canvas
//     document.body.addEventListener("touchstart", function(e) {
//         if (e.target == canvas) {
//             e.preventDefault();
//         }
//     }, false);
//     document.body.addEventListener("touchend", function(e) {
//         if (e.target == canvas) {
//             e.preventDefault();
//         }
//     }, false);
//     document.body.addEventListener("touchmove", function(e) {
//         if (e.target == canvas) {
//             e.preventDefault();
//         }
//     }, false);

//     (function drawLoop() {
//         requestAnimFrame(drawLoop);
//         renderCanvas();
//     })();

//     function clearCanvas() {
//         canvas.width = canvas.width;
//     }

//     // Set up the UI
//     var sigText = document.getElementById("sig-dataUrl");
//     var sigImage = document.getElementById("sig-image");
//     var clearBtn = document.getElementById("sig-clearBtn");
//     var submitBtn = document.getElementById("sig-submitBtn");
//     clearBtn.addEventListener("click", function(e) {
//         clearCanvas();
//         sigText.innerHTML = "Data URL for your signature will go here!";
//         sigImage.setAttribute("src", "");
//     }, false);
//     submitBtn.addEventListener("click", function(e) {
//         var dataUrl = canvas.toDataURL();
//         sigText.innerHTML = dataUrl;
//         sigImage.setAttribute("src", dataUrl);
//     }, false);

// })();
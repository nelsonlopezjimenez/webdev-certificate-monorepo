// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.




function unselected_boxes(qn_boxes){
    const unselected_box = [];

    for(const box of qn_boxes){
        box.addEventListener('click', click_answer);
        unselected_box.push(box);
    }
    return unselected_box;
}

function disable_click_qns(qn_boxes){
    for(const box of qn_boxes){
        box.removeEventListener('click', click_answer);
    }
}



function mode(dict)
{
    let array = Object.keys(dict).map(function(key){
        return dict[key];
    })
    console.log(array);
    if(array.length == 0)
        return null;
    let modeMap = {};
    let maxEl = array[0], maxCount = 1;
    for(let i = 0; i < array.length; i++)
    {
        let el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}

function winner(){

    let choice = mode(id_to_qn_click).dataset.choiceId;
    console.log(choice);
    let article_content = document.querySelector('article');
    let result_section = document.createElement('section');
    let header = document.createElement('h1');
    let ans_header = document.createTextNode("You got: " + RESULTS_MAP[choice]["title"]); 
    let ans_description = document.createTextNode(RESULTS_MAP[choice]["contents"]);
    let ans_paragraph = document.createElement('p');

    
    ans_paragraph.appendChild(ans_description);
    header.appendChild(ans_header);
    result_section.appendChild(header);
    result_section.append(ans_paragraph);
    result_section.appendChild(createRestartButton());

    article_content.appendChild(result_section);
    
}

function removeElem(array, elem){
    const index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

function changeOpaque(array, opacity='0.6'){
    for (const elem of array){
        elem.style.opacity = opacity;
    }
}

function isQuizOver(){

    let over = false;
    let count = 0;
    for (const key in id_to_qn_click) {
        if (id_to_qn_click[key] !== null && id_to_qn_click[key] != undefined)
            count++;
    }
    if(count == 3)
        over = true;
    return over;
}

function createRestartButton(){
    // creating button element  
    let button = document.createElement('BUTTON');  
    button.addEventListener('click', restart)
    // creating text to be 
    //displayed on button 
    let text = document.createTextNode("Restart"); 

    button.style.width = '100%';
    button.style.height = "50px";
    button.style.background = '#cecece';
    button.appendChild(text); 

    return button;
}

function globalStyleReset(){
    // ans_1, ans_2, ans_3
    
    for(const box of ans_1){
        box.style.backgroundColor = '#f4f4f4';

    }
    for(const box of ans_2){
        box.style.backgroundColor = '#f4f4f4';

    }
    for(const box of ans_3){
        box.style.backgroundColor = '#f4f4f4';

    }
    changeOpaque(ans_1, '1.0');
    changeOpaque(ans_2, '1.0');
    changeOpaque(ans_3, '1.0');

}


function reinitGlobalVar(){

    q1_unselected_box = unselected_boxes(ans_1);
    q2_unselected_box = unselected_boxes(ans_2);
    q3_unselected_box = unselected_boxes(ans_3);

    q1_selected_box = undefined;
    q2_selected_box = undefined;
    q3_selected_box = undefined;

    id_to_qn_unselected_boxes = {
        'one': q1_unselected_box,
        'two': q2_unselected_box,
        'three': q3_unselected_box
    }
    id_to_qn_click = {
        'one': q1_selected_box,
        'two': q2_selected_box,
        'three': q3_selected_box
    }
      
}

function restart(event){
    const answer_div = event.currentTarget.parentElement;
    answer_div.remove();
    globalStyleReset();
    reinitGlobalVar();
}


function click_answer(event){
    const img_div = event.currentTarget;
    const qn_id = img_div.dataset.questionId;

    let clicked_box = id_to_qn_click[qn_id];
    let unclicked_boxes = id_to_qn_unselected_boxes[qn_id];

    // change background and opacity of a qn
    if(clicked_box !== undefined){
        // reset previous answer style
        clicked_box.style.backgroundColor = '#f4f4f4';

        unclicked_boxes.push(clicked_box);
        clicked_box = undefined; 
        changeOpaque(unclicked_boxes, '1.0');
    }
    id_to_qn_click[qn_id] = img_div;
    img_div.style.backgroundColor = '#cfe3ff';
    removeElem(unclicked_boxes, img_div);
    changeOpaque(unclicked_boxes);
    //winner(q1_selected_box.dataset.choiceId);
    if (isQuizOver()){
        disable_click_qns(ans_1);
        disable_click_qns(ans_2);
        disable_click_qns(ans_3);
        winner();

    }

}





const ans_1 = document.querySelectorAll('[data-question-id="one"]');
let q1_unselected_box = unselected_boxes(ans_1);

const ans_2 = document.querySelectorAll('[data-question-id="two"]');
let q2_unselected_box = unselected_boxes(ans_2);

const ans_3 = document.querySelectorAll('[data-question-id="three"]');
let q3_unselected_box = unselected_boxes(ans_3);

let q1_selected_box;
let q2_selected_box;
let q3_selected_box;

let id_to_qn_unselected_boxes = {
    'one': q1_unselected_box,
    'two': q2_unselected_box,
    'three': q3_unselected_box
}

let id_to_qn_click = {
    'one': q1_selected_box,
    'two': q2_selected_box,
    'three': q3_selected_box
}

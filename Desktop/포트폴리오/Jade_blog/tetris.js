
// DOM
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score")
const restartButton = document.querySelector(".game-text > button")


// Setting 
const GAME_ROWS = 20;
const GAME_COLS = 10; 

// variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

// 블럭
const BLOCKS = {
    tree : [
        [[2,1],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[1,0],[1,1]],
        [[1,2],[0,1],[2,1],[1,1]],
        [[2,1],[1,2],[1,0],[1,1]],
    ],
    square : [
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
        [[0,0],[0,1],[1,0],[1,1]],
    ],
    bar : [
        [[1,0],[2,0],[3,0],[4,0]],
        [[2,-1],[2,0],[2,1],[2,2]],
        [[1,0],[2,0],[3,0],[4,0]],
        [[2,-1],[2,0],[2,1],[2,2]],
    ], 
    zee : [
        [[0,0],[1,0],[1,1],[2,1]],
        [[0,1],[1,0],[1,1],[0,2]],
        [[0,1],[1,1],[1,2],[2,2]],
        [[2,0],[2,1],[1,1],[1,2]],
    ], 
    elLeft : [
        [[0,0],[0,1],[1,1],[2,1]],
        [[1,0],[1,1],[1,2],[0,2]],
        [[0,1],[1,1],[2,1],[2,2]],
        [[1,0],[2,0],[1,1],[1,2]],
    ],
    elRight : [
        [[1,0],[2,0],[1,1],[1,2]],
        [[0,0],[0,1],[1,1],[2,1]],
        [[0,2],[1,0],[1,1],[1,2]],
        [[0,1],[1,1],[2,1],[2,2]],
    ]
};

const movingItem = {
    type: "tree" ,
    direction: 0,
    top: 0,
    left: 3
};


// functions 

init()

function init(){
    tempMovingItem = {...movingItem};
    // tempMovingItem 은 잠시 넣어두기 위한 변수이다. 이때 mobingItem 이란 값이 연동되는 것을 반지하기 위해서 스프레이트 오퍼레이터 기법을 통해서 movingItem 의 값만 뽑아내서 tempMovingItem 으로 빼오기 위함이다. 

    for (let i =0; i < GAME_ROWS; i++){ 
        // 세로 20칸을 만들기 위한 반복문 시작.
        prependNewLine();
    }
    renderBlocks();
}

function prependNewLine(){
    const li = document.createElement('li'); // li 라는 변수에  li 태그를 만듬.
    const ul = document.createElement('ul'); // ul 이라는 변수에 ul 태그를 만듬.
    for(let j=0; j < GAME_COLS; j++){ // 세로 li 안에 가로 10칸을 만들기 위한 반복문 시작. 
        const matrx = document.createElement('li'); // j 는 총 10 번 반복함 matrx 라는 변수에 li 태그를 만듬.
        ul.prepend(matrx) // ul 변수 앞에 matrx 변수를 넣음.
        // prepend() 메소드 : 선택한 요소의 첫번째에 새로운 요소나 컨텐츠를 추가한다. 
    }
    li.prepend(ul) // 변수명 li(세로 20칸) > ul > matrx(li 가로 10칸)
    playground.prepend(li)
}

function renderBlocks(moveType =""){
    const { type, direction, top, left } = tempMovingItem; 
    const movingBlocks = document.querySelectorAll(".moving");
    
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, 'moving');
    })
    
    // 현재 BLOCKS 의 type 은 잘 찍히나, direction 이 안찍힘 => 이 말은 새로운 블록이 생성되지 않음. 
    //  현재 이 전 코드는 some() 이 아닌 forEach 문으로 했을 때 정상적으로 새 블록이 나온것을 확인 할 수 있음. 
    //      따라서 일단은 BLOCKS 의 some 을 일단 1. forEach 문으로 변경 2. some() 함수를 사용할 때 왜 direction 이 undefind 가 나오는지 알아볼것. 
    BLOCKS [type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;

        // 아래 식 = 삼항 연산자 : 조건 ? 참일경우 : 거짓일 경우  
        // 변수 xxx = 조건? 참일경우 : 거짓일 경우 => 이게 가능함.
        // console.log(playground.childNodes[y])
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null ;
        //playground.childNodes[y] 가 있으면 뒤에 식이 나오고, 
        //playground.childNodes[y] 가 없으면 null 이 나온다. 
        
        //아래 변수가 checkEmpty 를 위한 함수이다. 
        const isAvailable = checkEmpty(target);
        if(isAvailable){
            target.classList.add(type, 'moving')
        } else {
            tempMovingItem = { ...movingItem }
            if(moveType === 'retry'){
                clearInterval(downInterval);
                showGameoverText()
            }
            setTimeout(() => {
                renderBlocks('retry');
                if(moveType === 'top') {
                    seizeBlock();
                }
            }, 0)
            return true;
        }
    });
    
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;


    // seizeBlock 함수는 블럭이 화면의 최하단에 도착했을 때, moving 을 빼주고, 새로운 블럭이 생성 되게 해주는 함수이다. 
    // https://youtu.be/1lNy2mhvLFk?t=2805
    function seizeBlock(){
        const movingBlocks = document.querySelectorAll(".moving");
        movingBlocks.forEach(moving => {
            moving.classList.remove('moving');
            moving.classList.add('seized');
        })
        checkMatch()
    };

    function checkMatch(){
        const childNodes = playground.childNodes; 
        childNodes.forEach(child =>{
            let matched = true;
            child.children[0].childNodes.forEach(li=>{
                if(!li.classList.contains('seized')){
                    matched = false ;
                }
            })
            if(matched){
                child.remove();
                prependNewLine()
                score++;
                scoreDisplay.innerText = score ;
            }
        })
        generateNewBlock()
    }



    function generateNewBlock() {    
        clearInterval(downInterval); 
        downInterval = setInterval(() => {
            moveBlock('top',1)
        }, duration);
    // clearInterval => 
        const blockArray = Object.entries(BLOCKS);
        const randomIndex = Math.floor(Math.random() * blockArray.length);
    // 버그 원인 발견. movingItem.type 지정이 안되는듯. 빈칸으로 두니 새로운게 생성이 안됨.
    // 해결 : movingItem.type 을 빈칸으로 줫었는데 그렇게 되면 BLOCKS 함수에서 direction 이 속성을 못찾는 이슈가 있었음. 
    // 처음 접했을 때 랜덤함수 이상인줄 알고 찾아봤으나 이상없음. movingItem 의 type 을 지정안해주니 다음 블록을 호출을 못한다는것을 찾음.
    // movingItem 의 타입을 blockArray 함수의 배열의 반복문(Object.entries) 값으로 randomIndex 를 주고, 배열의 0 번째인 블록의 타입을 랜덤으로 불러옴.

        movingItem.type = blockArray[randomIndex][0];
        movingItem.top = 0;
        movingItem.left = 3;
        movingItem.direction = 0;
        tempMovingItem = {...movingItem};
        renderBlocks();
    }
    // generateNewBlock 함수에서 랜덤 생성 코드를 빼니 정상 작동된다. 문제는 랜덤 생성코드인듯. 
    // 블록이 남지 않고 사라져 버림. class move 만 빠진게 아니라, seized 도 없는듯. 아마도 move 을 빼면서 블록 자체를 빼버리는것 같다. 

    function checkEmpty(target){
        if(!target || target.classList.contains('seized')){
            // contains 매서드는 클레스를 갖고 있는지(포함하는지) 확인해준다.
            return false;
        }   
        return true;
        // checkEmpty 라는 함수를 만들었다. 
        // 한번더 체크하는 이유는 : 빈 여백을 채크해서 밖으로 벗어나지 않도록 하기 위함. 블럭이 최하단으로 떨어졌을 때 또 다른 블럭이 생성되고  블럭이 그 위에 떨어졌을 때 그 밑에 블럭이 있는지 없는지를 또 체크해야 한다.
    }

}


    function moveBlock(moveType, amount){
        tempMovingItem[moveType] += amount;
        renderBlocks(moveType);
    }

    function changeDireaction(){
        const direction = tempMovingItem.direction;
        direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
        renderBlocks();
    }

    function dropBlock(){
        clearInterval(downInterval);
        downInterval = setInterval(() => {
            moveBlock('top',1)
        },10)
    }

    function showGameoverText(){
            gameText.style.display = 'flex'
    }


    //event handling
    document.addEventListener('keydown', e =>{
        switch(e.keyCode){
            case 39:
                moveBlock('left', 1);
                break;
            case 37:
                moveBlock('left', -1);
                break;
            case 40:
                moveBlock("top", 1);
                break;
            case 38:
                changeDireaction();
                break;
            case 32:
                dropBlock();
                break;
        default:
            break;
        }
    });

restartButton.addEventListener("click",()=>{
    playground.innerHTML = "";
    gameText.style.display = 'none'
    init()
})
     // https://youtu.be/1lNy2mhvLFk?t=1960
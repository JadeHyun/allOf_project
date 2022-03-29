// 테트리스 만들기
// playground 태그 안 ul 태그 안에 20 줄의 li 가 들어갈 것이고,
// 20 개의 li 안에 ul태그에 10 개의 li 가 들어갈 것이다. 
// ( 세로 20 칸 가로 10 칸 의 테이블이 구성 될 예정. )

// DOM
const playground = document.querySelector(".playground > ul");

// Setting 
const GAME_ROWS = 20;
const GAME_COLS = 10; 




// variables
let socre = 0;
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
    type: 'tree',
    direction: 0,
    top: 0,
    left: 3,
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
    renderBlocks()
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
        moving.classList.remove(type,'moving');
    })

    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        // 삼항 연산자 : 조건 ? 참일경우 : 거짓일 경우  
        // 변수 xxx = 조건? 참일경우 : 거짓일 경우 => 이게 가능함.
        console.log(playground.childNodes[y])
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null ;
        //playground.childNodes[y] 가 있으면 뒤에 식이 나오고, 
        //playground.childNodes[y] 가 없으면 null 이 나온다. 
        
        //아래 변수가 checkEmpty 를 위한 함수이다. 
        const isAvailable = checkEmpty(target);
        if(isAvailable){
            target.classList.add(type, 'moving')
        } else {
            tempMovingItem = { ...movingItem }
            setTimeout(() => {
                renderBlocks();
                if(moveType === 'top'){
                    seizeBlock();
                }
            }, 0)
            return true;

        }
    });
    
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;

    function seizeBlock(){
        console.log('seize block')




        const movingBlocks = document.querySelectorAll(".moving");
        movingBlocks.forEach(moving => {
            moving.classList.remove('moving');
            moving.classList.add('seized');
        });
        generateNewBlock()
    }
    // seizeBlock 함수는 블럭이 화면의 최하단에 도착했을 때, moving 을 빼주고, 새로운 블럭이 생성 되게 해주는 함수이다. 
    // https://youtu.be/1lNy2mhvLFk?t=2805

    function checkEmpty(target){
        if(!target || target.classList.contains('.seized')){
            // contains 매서드는 클레스를 갖고 있는지(포함하는지) 확인해준다.
            return false;
        }
            return true;
    }

    // 위 에 값처럼 초기화를 안해주면 블럭이 화면은 넘어 갔을 경우 값이 초기화가 되어 가운데로 오게 된다. 해당 이슈를 막기 위해 위에 값을 넣어 주었다. => 현재는 블럭이 화면을 넘어가도 초기화 되거나 화면 밖으로 넘어가지 않게 되었다. 



    function generateNewBlock() {
        const blockArray = Object.entries(BLOCKS);
        const randomIndex = Math.floor(Math.random() * blockArray.length);

        movingItem.type = '';
        movingItem.top = 0;
        movingItem.left = 3;
        movingItem.direction = 0;
        tempMovingItem = {...movingItem};
        renderBlocks();
    }


}
    // checkEmpty 라는 함수를 만들었다. 
    // 한번더 체크하는 이유는 : 빈 여백을 채크해서 밖으로 벗어나지 않도록 하기 위함. 블럭이 최하단으로 떨어졌을 때 또 다른 블럭이 생성되고  블럭이 그 위에 떨어졌을 때 그 밑에 블럭이 있는지 없는지를 또 체크해야 한다. 그래서 한번 더 체크 해야한다. 


    function moveBlock(moveType, amount){
        tempMovingItem[moveType] += amount;
        renderBlocks(moveType);
    }

    function changeDireaction(){
        const direction = tempMovingItem.direction
        direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
        renderBlocks();
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
        default:
            break;
        }
    });


     // https://youtu.be/1lNy2mhvLFk?t=1960
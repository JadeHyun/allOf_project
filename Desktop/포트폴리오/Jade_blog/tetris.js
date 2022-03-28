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

const BLOCKS = {
    tree : [
        [[1,0],[0,1],[1,1],[2,1]],
        [],
        [],
        [],
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
    tempMovingItem = {...movingItem};// tempMovingItem 은 잠시 넣어두기 위한 변수이다. 이때 mobingItem 이란 값이 연동되는 것을 반지하기 위해서 스프레이트 오퍼레이터 기법을 통해서 movingItem 의 값만 뽑아내서 tempMovingItem 으로 빼오기 위함이다. 

    for (let i =0; i < GAME_ROWS; i++){ // 세로 20칸을 만들기 위한 반복문 시작.
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

function renderBlocks(){
    const { type, direction, top, left } = tempMovingItem; //디스트럭칭 처리
    const movingBlocks = document.querySelectorAll(".moving");
    
    movingBlocks.forEach(moving => {
        moving.classList.remove(type,'moving');
    })

    BLOCKS[type][direction].forEach(block=>{
        const x = block[0] + left;
        const y = block[1] + top;
        // 삼항 연산자 : 조건 ? 참일경우 : 거짓일 경우  
        // 변수 xxx = 조건? 참일경우 : 거짓일 경우 => 이게 가능함.
        const target = playground.childNodes[y].childNodes[0].childNodes[x];
        target.classList.add(type, 'moving');
    });
    }

    function moveBlock(moveType, amount){
        tempMovingItem[moveType] += amount;
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
                moveBlock("top", -1);

        default:
            break;
        }
    });


     // https://youtu.be/1lNy2mhvLFk?t=1960
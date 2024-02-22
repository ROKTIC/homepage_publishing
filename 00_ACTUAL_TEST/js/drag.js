
/* ------------------------------------------------------------------------ */
let touchstartX; // 최초 요소의 X 좌표값
let currentClassList;
let currentImg;
let currentActiveLi; // class-list 에서 data-position 으로 현재 카드 위치 알아냄
let nowActiveLi; // 마우스 드래그 하면서 변경되는 카드의 위치
let mouseStart;


function processTouchMove(event){
    event.preventDefault();

    let currentX = event.clientX || event.touches[0].screenX; // event.clientX는 드래그 중인 현재의 마우스 좌표값
    nowActiveLi = Number(currentActiveLi) + (Number(currentX) - Number(touchstartX));

    currentClassList.style.transition = 'transform 0s linear';
    currentClassList.style.transform = 'translateX(' + String(nowActiveLi) + 'px)';
    
}
function processTouchStart(event){
    mouseStart = true;

    event.preventDefault(); // 디폴트 동작(해당 요소의 고유 동작)을 중지

    touchstartX = event.clientX || event.touches[0].screenX; // 마우스 좌표 || 모바일 터치
    currentImg = event.target;

    // 드래그 처리를 위해, 드래그 중(mousemove), 드래그가 끝났을 때(mouseup) 이벤트를 걸어줌
    currentImg.addEventListener('mousemove', processTouchMove);
    currentImg.addEventListener('mouseup', processTouchEnd);

    currentImg.addEventListener('touchmove', processTouchMove); // 모바일 환경에서의 터치
    currentImg.addEventListener('touchend', processTouchEnd);

    currentClassList = currentImg.parentElement.parentElement;
    currentActiveLi = currentClassList.getAttribute('data-position'); 
}
function processTouchEnd(event){
    event.preventDefault(); // 디폴트 동작(해당 요소의 고유 동작)을 중지

    if(mouseStart === true){
        currentImg.removeEventListener('mousemove', processTouchMove);
        currentImg.removeEventListener('mouseup', processTouchEnd);

        currentImg.removeEventListener('touchmove', processTouchMove);
        currentImg.removeEventListener('touchend', processTouchEnd);

        // 맨 처음 카드가 맨 앞에 배치되도록 초기 상태로 이동
        currentClassList.style.transition = 'transform 1.5s ease';
        currentClassList.style.transform = 'translateX(0px)';
        currentClassList.setAttribute('data-position', 0);

        // 맨 처음 카드가 맨 앞에 배치된 상태로 화살표 버튼도 초기 상태로 변경
        let eachSlidePrev = currentClassList.previousElementSibling.children[1].children[0];
        let eachSlideNext = currentClassList.previousElementSibling.children[1].children[1];
        let eachLilist = currentClassList.getElementsByTagName('li');
        if(currentClassList.clientWidth < (eachLilist.length * 260)){ // 데이터가 ul 길이보다 더 많으면 
            eachSlidePrev.style.color = '#cfd8dc';
            eachSlidePrev.classList.remove('slide-prev-hover');
            eachSlidePrev.removeEventListener('click', transformPrev);

            eachSlideNext.style.color = '#2f3059';
            eachSlideNext.classList.add('slide-next-hover');
            eachSlideNext.addEventListener('click', transformNext)


        }
    }
    mouseStart = false;
}

//특정 요소를 드래그하다가, 요소 밖에서 드래그를 끝낼 수 있으므로 window에 이벤트를 걸어줌
window.addEventListener('dragend', processTouchEnd);
window.addEventListener('mouseup', processTouchEnd);

// 인터페이스간의 오동작을 막기 위해 카드 내의 이미지에만 드래그 인터페이스를 제공하기로 함
const classImgLists = document.querySelectorAll('ul li img');

for(let i = 0; i < classImgLists.length; i++){

    classImgLists[i].addEventListener('mousedown', processTouchStart);
    classImgLists[i].addEventListener('touchstart', processTouchStart);
}

/* ------------------------------------------------------------------------ */

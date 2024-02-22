const backToTop = document.getElementById('backtotop');

const checkScroll = () => {
    let yOffset = window.pageYOffset;
    if(yOffset !== 0){
        backToTop.classList.add('show');
    } else{
        backToTop.classList.remove('show');
    }
}

const moveBackToTop = () => {
    let yOffset = window.pageYOffset;
    if(yOffset > 0){
        window.scrollTo({top:0,behavior:'smooth'});
    }
}

window.addEventListener('scroll' ,checkScroll);
backToTop.addEventListener('click', moveBackToTop);

/* ------------------------------------------------------------------------ */
function transformPrev(event) {
    const slidePrev = event.target; // 이벤트가 발생한 요소를 가져온다.
    const slideNext = slidePrev.nextElementSibling;
    
    // ul 태그
    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');

 
    //하나의 카드라도 NEXT 이동했다면, PREV 할 수 있음
    if(Number(activeLi) < 0) {
        activeLi = Number(activeLi) + 260;

        //PREV했으면 다시 NEXT할 수 있으니 NEXT 활성화
        slideNext.style.color = '#2f3059';
        slideNext.classList.add('slide-next-hover');
        slideNext.addEventListener('click',transformNext);
        
        if(Number(activeLi) === 0){ // 다시 첫 번째로 데이터가 왔으므로 더 못넘기게 이벤트 삭제하기
            slidePrev.style.color = '#cfd8dc';
            slidePrev.classList.remove('slide-prev-hover');
            slidePrev.removeEventListener('click',transformPrev);
        }

    }
    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
}

function transformNext(event){
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;

    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');


    if(classList.clientWidth < liList.length * 260 + Number(activeLi)){
        activeLi = Number(activeLi) - 260;

        slidePrev.style.color = '#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click',transformPrev);

        if(classList.clientWidth > liList.length * 260 + Number(activeLi)){
        
            slideNext.style.color = '#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click',transformNext); // 전체 ul이 더 크므로 더 넘길 수가 없으므로 이벤트를 삭제해서 더 못누르게
        }
    }

   
    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
}
 

const slideNextList = document.getElementsByClassName('slide-next');

for(let i = 0; i < slideNextList.length; i++){
    let classList = slideNextList[i].parentElement.parentElement.nextElementSibling;
    let liList = classList.getElementsByTagName('li');

    if(classList.clientWidth < (liList.length * 260)){ //classList.clientWidth는 ul전체태그의 길이를 나타내는 값, liList.length * 260은 표현되고 있는 li의 갯수 * 각 li의 길이인 260px를 곱한 값 */
        /* 즉 표현해야하는 데이터 길이가 표현할 수 있는 ul의 길이보다 길면(넘치면) */
        slideNextList[i].classList.add('slide-next-hover');
        slideNextList[i].addEventListener('click', transformNext);

    }else { //ul태그 안의 데이터들이 넘치지 않는다면
        const arrowContainer = slideNextList[i].parentElement;
        arrowContainer.removeChild(slideNextList[i].previousElementSibling); /* */
        arrowContainer.removeChild(slideNextList[i]);
    }


}
const slidePrevList = document.getElementsByClassName('slide-prev');

for(let i = 0; slidePrevList.length; i++){

    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    let liList = classList.getElementsByTagName('li');
    let activeLi = classList.getAttribute('data-position');
    
    if(Number(activeLi) === 0){ // 첫 li 값이 첫 번째 위치에 있을 때 PREV 버튼 비활성화 컬러로 바꾸기
        slidePrevList[i].style.color = '#cfd8dc';
    }

}


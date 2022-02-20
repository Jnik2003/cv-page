window.onload = function() {


    //---slider---
    const slider = document.querySelector('.slider')
    const sliderLine = document.querySelector('.slider-line');
    const sliderNext = document.querySelector('.slider-next');
    const sliderPrev = document.querySelector('.slider-prev');

    let img = document.querySelector('.slider-img')
    let imgs = document.querySelectorAll('.slider-img')




    let offset = 0;
    sliderNext.addEventListener('click', fNext);

    function countCl() {
        countClick = imgs.length - Math.floor(slider.offsetWidth / (img.offsetWidth + 10))
    }
    countCl();
    window.addEventListener('resize', countCl);

    function fNext() {
        countClick--;
        offset += img.offsetWidth + 10;
        if (countClick < 0) {
            offset = 0;
            countClick = imgs.length - Math.floor(slider.offsetWidth / (img.offsetWidth + 10))
        }

        sliderLine.style.left = -offset + 'px';
    }

    // --- modal ---

    sliderLine.addEventListener('click', modal);
    const modalPort = document.querySelector('.modal')
    const closeModal = document.querySelector('.close-modal');

    closeModal.addEventListener('click', () => {

        modalPort.classList.remove('show-modal-port');

    })

    function modal(e) {
        selectedImgInd = e.target.dataset.count;
        return new Promise((resolve) => {
                let imgsColl = document.querySelectorAll(`.${e.target.parentNode.className} > img`);
                resolve(imgsColl);

            })
            .then((imgsColl) => {
                modalPort.classList.add('show-modal-port');
                closeModal.style.display = 'none';
                return imgsColl;
            })
            .then((imgsColl) => {
                modalSliderLine = document.querySelector('.modal__slider-line');
                [...imgsColl].forEach(item => {

                    let figure = document.createElement('figure');
                    figure.classList.add('modal__figure');
                    modalSliderLine.append(figure);
                    let modalImg = document.createElement('img');
                    modalImg.src = item.src;
                    modalImg.classList.add('modal__image')
                    figure.append(modalImg)
                    let modalFig = document.createElement('figcaption')
                    modalFig.classList.add('modal__figcaption')
                    modalFig.innerHTML = item.alt;
                    let modalFig1 = document.createElement('figcaption')
                    modalFig1.classList.add('modal__figcaption1', 'light')
                    modalFig1.innerHTML = item.dataset.descr;
                    let modalFig2 = document.createElement('figcaption')
                    modalFig2.classList.add('modal__figcaption2')
                    modalFig2.innerHTML = item.dataset.sum;
                    figure.append(modalFig);
                    figure.append(modalFig1);
                    figure.append(modalFig2);

                })

            })
            .then(() => {
                const figures = document.querySelectorAll('.modal__figure');
                const images = document.querySelectorAll('.modal__image');
                let count = selectedImgInd;
                let width;

                function init() {

                    modalSlider = document.querySelector('.modal__slider');
                    width = modalSlider.offsetWidth;
                    modalSliderLine.style.width = width * images.length;
                    figures.forEach(item => {
                        item.style.width = width + 'px';
                    })
                    images.forEach(item => {
                        item.style.width = width + 'px';
                    })

                    coordClose()
                    rollSlider()
                }
                window.addEventListener('resize', init);
                init();


                const modalBtnNext = document.querySelector('.modal__next');
                const modalBtnPrev = document.querySelector('.modal__prev');


                modalBtnNext.addEventListener('click', modalNext)

                function modalNext() {
                    count++;
                    count >= images.length ? count = 0 : false;
                    rollSlider()

                }
                modalBtnPrev.addEventListener('click', modalPrev)

                function modalPrev() {
                    count--;
                    count < 0 ? count = images.length - 1 : false;
                    rollSlider()
                }

                function rollSlider() {
                    document.querySelector('.modal__slider-line').style.transform = `translateX(-${count * width}px`;
                }

                // --- добавим свайп ---------
                function startSwipe() {
                    modalSlider.addEventListener('touchstart', handleTouchStart, false);
                    console.log(slider)
                    modalSlider.addEventListener('touchmove', handleTouchMove, false);
                }
                startSwipe();

                function stopSwipe() {
                    modalSlider.removeEventListener('touchstart', handleTouchStart, false);
                    console.log(slider)
                    modalSlider.removeEventListener('touchmove', handleTouchMove, false);
                }


                function handleTouchStart(event) {
                    // координалы тычка пальцем                     
                    x1 = event.touches[0].clientX;
                    y1 = event.touches[0].clientY;

                }

                function handleTouchMove(event) {
                    if (!x1 || !y1) {
                        return;
                    }
                    x2 = event.touches[0].clientX;
                    y2 = event.touches[0].clientY;
                    // clearInterval(timer);
                    if (x2 < x1 && Math.abs(y1 - y2) < 7) {
                        modalNext();
                        stopSwipe();
                        setTimeout(startSwipe, 300)
                    }
                    if (x2 > x1 && Math.abs(y1 - y2) < 7) {
                        modalPrev();
                         stopSwipe();
                        setTimeout(startSwipe, 300)
                    }
                }
            })
            .then(() => {
                setTimeout(coordClose, 1500)

            })


    }

    function coordClose() {
        return new Promise((resolve) => {
                closeX = modalSlider.getBoundingClientRect().right;
                closeY = modalSlider.getBoundingClientRect().top + document.body.scrollTop

                let closeModal = document.querySelector('.close-modal');
                // closeModal.style.display = 'block';
                if (document.documentElement.clientWidth > 1024) {
                    closeModal.style.top = closeY + 'px';
                    closeModal.style.left = closeX + 'px';
                } else if (document.documentElement.clientWidth <= 1024) {
                    closeModal.style.left = closeX - 40 + 'px';
                    closeModal.style.top = closeY + 15 + 'px';
                }
                resolve();
            })
            .then(() => {
                setTimeout(() => {
                    closeModal.style.display = 'block';
                }, 1500)

            })



    }
    // ---send offer---

    const offerCheck = document.querySelector('.offer__check');
    const offerBtn = document.querySelector('.offer__btn');
    // const offerBtn2 = document.querySelector('.offer__btn2');
    const offerMenu = document.querySelector('.offer__menu');
    offerCheck.addEventListener('click', toLike);

    function toLike() {
        offerCheck.classList.toggle('offer__checked')
    }

    offerBtn.addEventListener('click', menu);
    // offerBtn2.addEventListener('click', menu);

    function menu() {

        let offerLists = document.querySelectorAll('.offer__list')
        let offerImgs = document.querySelectorAll('.offer__img')
        let offerTexts = document.querySelectorAll('.offer__text')
        offerLists.forEach(item => {
            item.classList.toggle('hidden');
        })
        offerImgs.forEach(item => {
            item.classList.toggle('hidden');
        })
        offerTexts.forEach(item => {
            item.classList.toggle('hidden');
        })
    }


    const offerLists = document.querySelectorAll('.offer__list');
    const offerLast = document.querySelector('.offer__last');

    offerLists.forEach(item => {
        item.addEventListener('click', sendOffer);
    })

    function sendOffer() {
        return new Promise((resolve) => {
            offerLast.innerHTML = '';
            offerLast.append(this.cloneNode(true));
            resolve();
        }).then(() => {
            menu.call(offerBtn);
        }).then(() => {
            addToLastOffer();
            offerBtn.innerHTML = 'Приглашение отправлено &#10004;';
        })
    }


    function addToLastOffer() {
        offerLast.firstChild.className = 'offer__list added';
        offerLast.firstChild.querySelectorAll('div').forEach(item => {
            item.classList.remove('hidden');
        })
        const indMenu = document.querySelector('.offer__last>.offer__list').dataset.offer;
        const nowImg = document.querySelector('.offer__last > .offer__list > .offer__img');
        const nowText = document.querySelector('.offer__last > .offer__list > .offer__text');
        nowText.style.fontSize = '16px';
        nowText.classList.add('offer__text--last');
        nowImg.style.backgroundImage = `${objMenu[indMenu]['pic']}`;
        nowImg.style.width = '46px';
        nowImg.style.height = '46px';
        nowImg.style.backgroundSize = 'contain';
        const newContent = `<div class="offer__description">${objMenu[indMenu]['descr']}</div>`;
        nowText.innerHTML += newContent;
        offerLast.style.border = '1px solid #E7EEF6';


    }
    // --- offer history---
    const offerImgs = document.querySelectorAll('.history-body__figure > img');
    offerImgs.forEach(item => {
        item.src.includes('h-video') ? item.parentNode.style.borderRight = '3px solid #5FB6E7' :
            item.src.includes('h-offer') ? item.parentNode.style.borderRight = '3px solid #FFA438' :
            item.src.includes('h-call') ? item.parentNode.style.borderRight = '3px solid #C6F8C2' :
            false;

    })

    const arrow = document.querySelector('.offer-history__arrow');
    const historyBody = document.querySelector('.history-body');
    const offerHistory = document.querySelector('.offer-history');

    offerHistory.addEventListener('click', history);



    function history() {
        return new Promise((resolve) => {
                const historyItems = document.querySelectorAll('.history-body__item');
                historyItems.forEach(item => {
                    item.classList.toggle('hide-history')
                })
                arrow.classList.toggle('tr-arrow');
                resolve();
            })
            .then(() => {
                historyBody.classList.toggle('border')
            })
    }

    // --- note ---
    const note = document.querySelector('.note');
    const btns = document.querySelectorAll('button');
    const cancel = document.querySelector('.cancel')
    const iconFile = document.querySelector('.person__icon--file');
    const save = document.querySelector('.save');
    const noteBody = document.querySelector('.note__body');

    Array.from(btns).forEach(item => {
        item.addEventListener('click', prevent);
    })

    function prevent(e) {
        e.preventDefault();
    }

    cancel.addEventListener('click', closeNote);

    function closeNote() {
        note.classList.add('close-note');
    }

    iconFile.addEventListener('click', openNote);

    function openNote() {
        note.classList.remove('close-note');
        if (localStorage.getItem('note')) {
            noteBody.value = localStorage.getItem('note')
        }
    }

    save.addEventListener('click', saveNote);

    function saveNote() {
        localStorage.setItem('note', noteBody.value)
        closeNote()
    }


    function adaptive() {
        const personTitle = document.querySelector('.person__title');
        const offerBox = document.querySelector('.offer__box')
        const portfolio = document.querySelector('.portfolio')
        const offerHistory = document.querySelector('.offer-history')
        const salarySumm = document.querySelector('.salary__summ')
        const pos = document.querySelector('.person__basic-info > .h3')
        const aside = document.querySelector('aside');
        const offer = document.querySelector('.offer');
        const salary = document.querySelector('.salary');
        const personIcons = document.querySelector('.person__icons');
        const headerInfo = document.querySelector('.header-info');
        const personUserName = document.querySelector('.person__user-name');


        if (window.innerWidth <= 800) {
            personTitle.insertAdjacentElement('afterEnd', offerBox);
            portfolio.insertAdjacentElement('afterEnd', offerHistory);
            pos.insertAdjacentElement('afterEnd', salarySumm);
            salarySumm.style.fontSize = '16px';
            salarySumm.style.fontWeight = '600';
            headerInfo.insertAdjacentElement('afterEnd', personIcons);
        } else {

            // setTimeout(() => {
            offer.insertAdjacentElement('afterBegin', offerBox);
            salary.insertAdjacentElement('afterBegin', salarySumm);
            salarySumm.style.fontSize = '28px';
            salarySumm.style.fontWeight = '500';
            offerBox.insertAdjacentElement('afterEnd', offerHistory);
            personUserName.insertAdjacentElement('afterEnd', personIcons);

            // }, 100)

        }
    }
    adaptive()
    window.addEventListener('resize', adaptive)






}
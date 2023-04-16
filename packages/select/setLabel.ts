




export default {
    mounted(el) {
        console.log(el)
        const inputDom = el.querySelector('.z-input_inner')

        const selectOptionDom = el.querySelectorAll('.z-options'),
            selectDropdownDom = el.querySelector('.z-select-dropdown')


        // console.log(selectDropdownDom)
        // inputDom.addEventListener('focus', (e) => {
        //     selectDropdownDom.style.display = 'block'
        // }, false)


        // inputDom.addEventListener('blur', (e) => {
        //     selectDropdownDom.style.display = 'none'
        // }, false)
        // if (selectOptionDom) {
        //     let placeholder = ''
        //     // item.getAttribute('data-value')
        //     selectOptionDom.forEach(item => {
        //         placeholder += item.innerText + ','
        //         console.log(item.innerText)
        //     })
        //     inputDom.placeholder = placeholder
        // }

        // console.log(selectOptionDom)

        // selectOptionDom.forEach(item => {
        //     item.addEventListener("click", function (e) {
        //         Array.from(e.target.parentNode.children).forEach((item) => {
        //             (item as HTMLElement).classList.remove("is-select");
        //         });
        //         e.target.classList.add("is-select");
        //         emit('selected', e.target.innerText)
        //         console.log(e.target.innerText)
        //         inputDom.placeholder = e.target.innerText
        //     });
        // })
    },
    // updated(el) {
    //     console.log(el, 'upload')
    //     const inputDom = el.querySelector('.z-input_inner')
    //     const selectOptionDom = el.querySelectorAll('.z-options.is-select')
    //     if (selectOptionDom) {
    //         let placeholder = ''
    //         // item.getAttribute('data-value')
    //         selectOptionDom.forEach(item => {
    //             placeholder += item.innerText + ','
    //             console.log(item.innerText)
    //         })
    //         inputDom.placeholder = placeholder
    //     }
    // }
}
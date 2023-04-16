import { ref, watch } from "vue";



function useOption() {
    let currentLabel = ref({})

    function setOption(option: object) {
        console.log(option)
        currentLabel.value = option
    }

    watch(() => currentLabel, (newVal: any, oldVal: any) => {
        console.log(newVal.value)
        setOption(newVal.value)
        console.log(currentLabel.value)
    }, {
        deep: true
    })

    return {
        currentLabel,
        setOption
    }
}


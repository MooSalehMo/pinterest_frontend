import {create} from 'zustand'

const useEditorStore = create( set => ({
        selectedLayer: "canvas",
        textOptions: {
            text: "",
            fontSize: 48,
            left: 0,
            top: 0,
            color: '#000000'
        },
        canvasOptions: {
            height: 0,
            orientation: "",
            size: "original",
            backgroundColor: "#00000"
        },
        setSelectedLayer: newLayer => set({selectedLayer: newLayer}),
        setTextOptions: newOptions => set({textOptions: newOptions}),
        addText: () => set({textOptions: {
            text: "Add text",
            fontSize: 48,
            left: 0,
            top: 0,
            color: '#000000'
        }}),
        setCanvasOptions: newOption => set({canvasOptions: newOption}),
        resetStore: () => set({
            selectedLayer: "canvas",
            textOptions: {
                text: "",
                fontSize: 48,
                color: "#000000",
                top: 48,
                left: 0,
            },
            canvasOptions: {
                height: 0,
                orientation: "",
                size: "original",
                backgroundColor: "#008080",
            },
        })
    })
)

export default useEditorStore ;
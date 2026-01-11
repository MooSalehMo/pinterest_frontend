import Image from '../Image/Image'
import useSelectedLayer from '../../utils/editorStore'
import './editor.css'

const Layers = () => {
    const {selectedLayer, setSelectedLayer, addText, canvasOptions} = useSelectedLayer()

    const handleSelectedLayer = (layer)=> {

        setSelectedLayer(layer);

        if(layer === 'text')
            addText();
    }
  
    return(
        <div className="editor-layers">
            <h2 className='header'>Layers</h2>
            <p className='slect-layer'>Select a layer to edite </p>

            <div onClick={ ()=> handleSelectedLayer('text') } className={`layer ${selectedLayer === 'text' ? 'selected' : ''}`} >
                <div className="layer-img">
                    <Image path='/pinterest/general/text_img.png' w={80} h={60} alt="layer"/>
                </div>
                <span>Add image text</span>
            </div>

            <div onClick={ ()=> handleSelectedLayer('canvas') } className={`layer ${selectedLayer === 'canvas' ? 'selected' : ''}`}>
                <div className="layer-img" style={{backgroundColor: canvasOptions.backgroundColor}}></div>
                <span>canvas</span>
            </div>

        </div>
    )
}

export default Layers
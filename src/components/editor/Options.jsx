import useEditorStore from '../../utils/editorStore'
import {HexColorPicker} from 'react-colorful'
import SquareIcon from '../icons/SquareIcon'
import H from '../icons/H'
import './editor.css'
import { useState } from 'react'


const portraitSizes = [
  {
    name: "1:2",
    width: 1,
    height: 2,
  },
  {
    name: "9:16",
    width: 9,
    height: 16,
  },
  {
    name: "2:3",
    width: 2,
    height: 3,
  },
  {
    name: "3:4",
    width: 3,
    height: 4,
  },
  {
    name: "4:5",
    width: 4,
    height: 5,
  },
  {
    name: "1:1",
    width: 1,
    height: 1,
  },
];

const landscapeSizes = [
  {
    name: "2:1",
    width: 2,
    height: 1,
  },
  {
    name: "16:9",
    width: 16,
    height: 9,
  },
  {
    name: "3:2",
    width: 3,
    height: 2,
  },
  {
    name: "4:3",
    width: 4,
    height: 3,
  },
  {
    name: "5:4",
    width: 5,
    height: 4,
  },
  {
    name: "1:1",
    width: 1,
    height: 1,
  },
];


const Options = ({previewImg}) => {
    const {selectedLayer, textOptions, setTextOptions, canvasOptions,setCanvasOptions} = useEditorStore()
    const [isColorPicker, setIsColorPicker] = useState(false)

    const originalOrientation = previewImg.width < previewImg.height ? "portrait" : "landscape";

    const handleOrientationClick = orientation => {
    let newHeight;
    if (
      // FIXED: SHORTEN
      // (originalOrientation === "portrait" && orientation === "portrait") ||
      // (originalOrientation === "landscape" && orientation === "landscape")
      originalOrientation === orientation
    ) {
      newHeight = (375 * previewImg.height) / previewImg.width;
    } else {
      newHeight = (375 * previewImg.width) / previewImg.height;
    }

    setCanvasOptions({
      ...canvasOptions,
      orientation,
      size: "original",
      height: newHeight,
    });
  };

    const handleSizeClick = size => {
        let newHeight;

        if(size === "original") {
            if(canvasOptions.orientation === 'portrait') {
                newHeight = (375 * previewImg.height) / previewImg.width ;
            } else {
                newHeight = (375 * previewImg.width) / previewImg.height ;
            }
        }else {
            newHeight = (375 * size.height) / size.width ;
        }


        setCanvasOptions({
            ...canvasOptions,
            size: size === "original" ? "original" : size.name,
            height: newHeight
        })
    }


    return(
        <div className="editor-options">

            { selectedLayer === "text" ? 
                <>
                    <div className="editing-option font-size">
                        <span className="font-size">Font Size: </span>
                        <input
                        className='number'
                            type="number"
                            value={textOptions.fontSize}
                            onChange= { e =>
                                setTextOptions({ ...textOptions, fontSize: e.target.value })
                            } 
                        />
                    </div>
                    <div className="editing-option">
                        <span className="color">Color: </span>
                        
                        <div className="text-color">
                            <div className="color-preview" 
                                style={{color: textOptions.color}}
                                onClick={()=> setIsColorPicker(prev => !prev)}
                            />

                            { isColorPicker && 
                                <div className='color-piker'>
                                    <HexColorPicker 
                                        color={ textOptions.color } 
                                        onChange={ color => setTextOptions({...textOptions, color:color }) }
                                    />
                                </div>
                            }
                        </div>

                    </div>
                </> 
                :
                <>
                    <div className='editing-option editing-option-orientations'>
                        <span>Orientations: </span>
                        <div className="orientations">
                            <div className={`orientation ${ canvasOptions.orientation === "portrait" ? "selected" : "" }`} 
                                    onClick={ ()=> handleOrientationClick("portrait") }
                            >
                                <SquareIcon />
                            </div>
                            <div className={`orientation ${ canvasOptions.orientation === "landscape" ? "selected" : "" }`} 
                                onClick={ ()=> handleOrientationClick("landscape") }                            
                            >
                                <H />
                            </div>
                        </div>
                    </div>

                    <div className='editing-option sizes'>
                        <span>Sizes: </span>
                        <div className="sizes">
                            <div className="size">
                                <div className={`size-name ${canvasOptions.size === "original" ? "selected" : ""}`}
                                    onClick={ ()=> handleSizeClick("original") }
                                >
                                    Original:
                                </div>
                                { canvasOptions.orientation === "" ? 
                                    <>
                                        { portraitSizes.map( size => (
                                            <div className={`size-name ${canvasOptions.size === size.name ? "selected" : ""}`} 
                                                key={size.name}
                                                onClick={ ()=> handleSizeClick(size) }
                                            >
                                                { size.name }
                                            </div>
                                        ))
                                        }
                                    </>
                                    :
                                    <>
                                        { landscapeSizes.map( size => (
                                            <div className={`size-name ${canvasOptions.size === size.name ? "selected" : "" }`} 
                                                key={size.name}
                                                onClick={ ()=> handleSizeClick(size) }
                                            >
                                                { size.name }
                                            </div>
                                        ))
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="editing-option">
                        <span className="">Background color</span>
                        <div className="background-color">
                            <div className="color-preview" 
                                style={{backgroundColor: canvasOptions.backgroundColor}}
                                onClick={()=> setIsColorPicker(prev => !prev)}
                            />

                            { isColorPicker && 
                                <div className='color-piker'>
                                    <HexColorPicker 
                                        color={ canvasOptions.backgroundColor } 
                                        onChange={ color => setCanvasOptions({...canvasOptions, backgroundColor:color }) }
                                    />
                                </div>
                            }
                        </div>
                    </div>

                </>
            }
        </div>
    )
}

export default Options